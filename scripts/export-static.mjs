#!/usr/bin/env node
/**
 * Render the Laravel demo to a folder of static HTML, for GitHub Pages.
 *
 * **Why a PHP application ships as static files.** Every one of the nineteen routes is a
 * `Route::view`: Blade renders a template and nothing else. There is no database, no session that
 * matters, no request-time decision — so the output of a request is the same every time, and the only
 * thing PHP is doing at runtime is handing back a constant. Pages serves files and not processes, and
 * for this app that costs nothing.
 *
 * It also keeps the demo honest in the direction that matters: the HTML published here is Blade's own
 * output, rendered by the same views a buyer downloads and runs on their own PHP. It is not a second
 * copy of the markup maintained by hand.
 *
 * ## The one rewrite, and why it is needed
 *
 * Blade links with `url('/alerts')`, which renders an **absolute** URL including the host — so a naive
 * copy of the response would publish `href="http://127.0.0.1:8000/alerts"` and every link in the demo
 * would point at the machine that built it. Stripping the origin makes them root-relative, which is
 * correct at a domain root and is what `APP_URL` would otherwise have to be configured to per
 * environment.
 *
 * ## What is not done, deliberately
 *
 * No crawler. The route list is `routes/web.php`, which is generated from the page set and is the
 * contract the views' own links are written against, so reading it is exact where following links
 * would be a guess with a `--max-depth` on it.
 */
import { execFileSync, spawn } from "node:child_process";
import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const OUT = join(ROOT, "dist");
const PORT = Number(process.env.EXPORT_PORT ?? 8931);
const ORIGIN = `http://127.0.0.1:${PORT}`;

const fail = (...lines) => {
  console.error(`export-static: ${lines.join("\n    ")}`);
  process.exit(1);
};

/** The routes, from the file the views' own links are written against. */
function routes() {
  const web = readFileSync(join(ROOT, "routes", "web.php"), "utf8");
  const found = [...web.matchAll(/Route::view\(\s*'([^']+)'/g)].map((m) => m[1]);
  if (found.length < 15) fail(`only ${found.length} route(s) found in routes/web.php`);
  return found;
}

/** `php artisan serve`, and a guard for each thing Laravel refuses to boot without. */
function boot() {
  if (!existsSync(join(ROOT, "vendor", "autoload.php"))) {
    fail("vendor/ is missing, so the framework is not there to boot.", "Run: composer install");
  }
  if (!existsSync(join(ROOT, ".env"))) {
    execFileSync("cp", [join(ROOT, ".env.example"), join(ROOT, ".env")]);
  }
  // An application with no key throws on the first encrypted cookie, which is the first request.
  if (!/^APP_KEY=.+$/m.test(readFileSync(join(ROOT, ".env"), "utf8"))) {
    execFileSync("php", ["artisan", "key:generate", "--quiet"], { cwd: ROOT, stdio: "pipe" });
  }
  // Laravel refuses to boot without these and does not create them.
  for (const dir of [
    ["bootstrap", "cache"],
    ["storage", "framework", "views"],
    ["storage", "framework", "cache"],
    ["storage", "framework", "sessions"],
    ["storage", "logs"],
  ]) {
    mkdirSync(join(ROOT, ...dir), { recursive: true });
  }
  return spawn("php", ["artisan", "serve", `--port=${PORT}`], { cwd: ROOT, stdio: "ignore" });
}

async function waitForBoot() {
  for (let i = 0; i < 60; i += 1) {
    try {
      const res = await fetch(`${ORIGIN}/`);
      if (res.ok) return;
    } catch {
      // not up yet
    }
    await new Promise((r) => setTimeout(r, 500));
  }
  fail(`the dev server did not answer on ${ORIGIN} within 30s`);
}

const server = boot();
try {
  await waitForBoot();

  rmSync(OUT, { recursive: true, force: true });
  mkdirSync(OUT, { recursive: true });

  // Everything Blade points at, which is `public/` minus the front controller and its rewrite rules:
  // both exist to route requests to PHP, and there is no PHP at the other end of this.
  for (const entry of ["vui"]) {
    if (!existsSync(join(ROOT, "public", entry))) fail(`public/${entry} is missing`);
    cpSync(join(ROOT, "public", entry), join(OUT, entry), { recursive: true });
  }

  let written = 0;
  for (const route of routes()) {
    const res = await fetch(`${ORIGIN}${route}`);
    if (!res.ok) fail(`${route} answered ${res.status}, so it cannot be exported`);
    const html = (await res.text()).replaceAll(ORIGIN, "");
    if (html.includes("127.0.0.1")) fail(`${route} still names the build host after the rewrite`);

    const name = route === "/" ? "index" : route.replace(/^\//, "");
    // Both spellings, because static hosts disagree about which one answers `/alerts`, and the pair
    // costs a few kilobytes of identical markup.
    for (const file of [join(OUT, `${name}.html`), join(OUT, name, "index.html")]) {
      if (name === "index" && file.endsWith(join("index", "index.html"))) continue;
      mkdirSync(dirname(file), { recursive: true });
      writeFileSync(file, html);
    }
    // The name GitHub Pages serves for an address it has no file for.
    if (route === "/error-404") writeFileSync(join(OUT, "404.html"), html);
    written += 1;
  }

  // Pages re-reads the custom domain on every deploy, so it ships inside the build.
  writeFileSync(join(OUT, "CNAME"), "laravel.viliha.com\n");

  console.log(`export-static: ${written} route(s) rendered by Blade into dist/, plus 404.html`);
} finally {
  server.kill();
}
