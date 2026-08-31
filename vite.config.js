import laravel from "laravel-vite-plugin";
import { defineConfig } from "vite";

/**
 * The stylesheet is already compiled, so Vite is here for the buyer's own work rather than for ours.
 *
 * `public/vui/vui.css` ships built: the download runs with `php artisan serve` alone and needs no
 * Node at all. Add your own entry here when you start writing CSS or JavaScript of your own.
 */
export default defineConfig({
  plugins: [
    laravel({
      input: ["resources/css/app.css"],
      refresh: true,
    }),
  ],
});
