#!/usr/bin/env node
/**
 * The route table and the Blade views, held against each other in both directions.
 *
 * There is nothing to compile here and no bundler to catch a mistake: `routes/web.php` names a view
 * by string, so a renamed file is a 500 on one page and silence everywhere else. A route with no view
 * and a view with no route are both invisible until someone clicks the row.
 *
 * Node's standard library only, so `npm test` needs no install.
 */
import { existsSync, readFileSync, readdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const VIEWS = join(ROOT, "resources", "views");
const problems = [];

const web = readFileSync(join(ROOT, "routes", "web.php"), "utf8");
const declared = [...web.matchAll(/Route::view\(\s*'([^']+)'\s*,\s*'([^']+)'/g)].map((m) => ({
  route: m[1],
  view: m[2],
}));

if (declared.length < 19) problems.push(`only ${declared.length} route(s) in routes/web.php`);

// Every route names a Blade file that is really there.
for (const { route, view } of declared) {
  const file = join(VIEWS, `${view.replaceAll(".", "/")}.blade.php`);
  if (!existsSync(file)) problems.push(`${route} renders ${view}, which is not a file`);
}

// And every page view is reachable from a route.
const routed = new Set(declared.map((d) => d.view.replace(/^vui-pages\./, "")));
for (const file of readdirSync(join(VIEWS, "vui-pages"))) {
  const name = file.replace(/\.blade\.php$/, "");
  if (!routed.has(name)) problems.push(`resources/views/vui-pages/${file} has no route`);
}

// The layout every page extends, and the component directory it pulls partials from.
for (const path of [
  ["components", "vui-layout.blade.php"],
  ["vui", "card.blade.php"],
]) {
  if (!existsSync(join(VIEWS, ...path))) problems.push(`resources/views/${path.join("/")} is missing`);
}

// The assets the layout links. A missing stylesheet is nineteen pages of unstyled HTML.
for (const asset of ["vui.css", "free-demo.css", "vui.js", "icon.png"]) {
  if (!existsSync(join(ROOT, "public", "vui", asset))) problems.push(`public/vui/${asset} is missing`);
}

if (problems.length) {
  console.error(`free-laravel: ${problems.length} problem(s)\n` + problems.map((p) => `  ${p}`).join("\n"));
  process.exit(1);
}
console.log(`free-laravel: ${declared.length} routes, every view and asset resolves`);
