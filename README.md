# VuiAdmin Laravel: Free Laravel Admin Dashboard Template

[![docs](https://img.shields.io/badge/docs-docs.viliha.com-266df0)](https://docs.viliha.com/docs/installation/laravel)
[![live demo](https://img.shields.io/badge/demo-laravel.viliha.com-266df0)](https://laravel.viliha.com)
[![Laravel](https://img.shields.io/badge/Laravel-12-FF2D20?logo=laravel&logoColor=white)](https://laravel.viliha.com)
[![license](https://img.shields.io/github/license/myviliha/free-laravel-admin-dashboard?color=266df0)](./LICENSE)
[![deploy](https://github.com/myviliha/free-laravel-admin-dashboard/actions/workflows/deploy.yml/badge.svg)](https://github.com/myviliha/free-laravel-admin-dashboard/actions/workflows/deploy.yml)
[![Sponsor @myviliha](https://img.shields.io/badge/Sponsor-%40myviliha-db61a2?style=for-the-badge&logo=githubsponsors&logoColor=white)](https://github.com/sponsors/myviliha)

## ❤️ Sponsoring is what keeps this free

VuiAdmin is the kind of admin theme that usually gets sold. We keep it MIT, and sponsors are what make
that possible.

Six framework editions of the same nineteen screens is more work than it sounds. A card has to be the
same card in Laravel as it is in the other five. Dark mode has to invert properly rather than
wash out. Every control needs keyboard and screen-reader behaviour, and every edition needs the parity
checks that stop them quietly drifting apart. We do that so you do not have to build it or buy it.

**Even $1 a month helps.** It goes toward bug fixes, new screens, and keeping the demos and docs
current. Honestly, it is what keeps us building in the open.

> Sponsors are listed on the [GitHub Sponsors page](https://github.com/sponsors/myviliha) and get our
> genuine thanks.

### 👉 [Sponsor on GitHub →](https://github.com/sponsors/myviliha) &nbsp;·&nbsp; thank you 🙏

---

**VuiAdmin** is a free, open-source **Laravel admin dashboard template** built on **Tailwind CSS v4**. Nineteen finished screens (dashboard, tables, forms, calendar, charts, authentication), MIT licensed, with no account, no key and no trial.

This is the **Laravel** edition: a real Laravel 12 application, nineteen `Route::view` routes and
Blade views on the design system. No build step for the CSS: the stylesheet ships compiled in
`public/vui`, so `composer install` and `php artisan serve` is the whole setup.

The component library is Blade partials in `resources/views/vui`, so you can `@include('vui.card')`
from your own views and drop the demo pages entirely.

**Laravel 12 · PHP 8.2+ · Blade · Tailwind CSS v4 (precompiled)**

The same dashboard also ships for React, Next.js, Vue, Angular and plain HTML, all from one design
system, so you can change stack without changing product. [See all six editions](#all-six-editions).

---

## Documentation

The full documentation is at **[docs.viliha.com](https://docs.viliha.com)**: installation for every
edition, the folder structure, the app layout and the six shells, every component family, theming
and dark mode, breakpoints, and deployment.

- [Install the Laravel edition](https://docs.viliha.com/docs/installation/laravel)
- [Project structure](https://docs.viliha.com/docs/structure/laravel)
- [Colours and tokens](https://docs.viliha.com/docs/customization/colors)
- [Dark mode](https://docs.viliha.com/docs/customization/dark-mode)
- [Deployment](https://docs.viliha.com/docs/deployment)
- [FAQ](https://docs.viliha.com/docs/faq)

This README is the short version. Anything it leaves out is in the docs.

---

![Laravel admin dashboard template: the ecommerce dashboard with metrics, a monthly sales bar chart, a monthly target gauge and a statistics area chart](./docs/screenshots/dashboard.png)

![Laravel admin dashboard tables: sortable rows with avatars, status badges and row actions](./docs/screenshots/tables.png)

| Form elements | Calendar |
| ------------- | -------- |
| [![Every input type in the Laravel admin template: text, select, multi-select, date, time, radio, checkbox, switch, file upload and password](./docs/screenshots/forms.png)](./docs/screenshots/forms.png) | [![The calendar screen with add, edit and delete events](./docs/screenshots/calendar.png)](./docs/screenshots/calendar.png) |

| Six shell layouts | Sign in |
| ----------------- | ------- |
| [![Six sidebar and shell arrangements you can switch between at runtime](./docs/screenshots/layouts.png)](./docs/screenshots/layouts.png) | [![Split-screen sign in page with the brand panel](./docs/screenshots/signin.png)](./docs/screenshots/signin.png) |

Every edition renders these same screens from the same fixtures, which is the whole point of the
design system underneath them, so one set of shots is the honest set for all six. Dark mode is the
toggle in the header on every screen.

---

## What is free and what is Pro

**Everything in this repository is free and MIT.** That is not a trial and it does not expire: every
version already published is MIT permanently, so nothing listed as free can move behind a paywall
later.

| Area | Free | Pro |
| --- | --- | --- |
| **Screens** | All nineteen: dashboard, calendar, profile, forms, tables, two chart pages, seven UI-element pages, six shell layouts, sign in, sign up, 404 | More dashboards (analytics, CRM, SaaS), and the screens that go with them |
| **Components** | 64 component families, in every one of the six editions | Premium blocks: billing, roles and permissions, audit log, inbox |
| **Design system** | Tokens, dark mode, six shell layouts, the icon and motion treatment, runtime theming | *Nothing extra* |
| **Data** | Fixtures in the file next to the screen, so you can see exactly where yours goes | The server-backed record workflow: list, detail, create, edit and delete against your own API |
| **Editions** | React, Next.js, Vue, Angular, HTML, Laravel | Svelte, and the record workflow in each |
| **Support** | Issues and discussions, in the open | Priority support and a commercial licence |

Pro is optional and additive: net-new work, not a fence around what is here.

## Contents

- [Documentation](#documentation)
- [What is free and what is Pro](#what-is-free-and-what-is-pro)
- [Features](#features)
- [Quick start](#quick-start)
- [What's in it](#whats-in-it)
- [Using the components in your own Laravel app](#using-the-components-in-your-own-laravel-app)
- [Theming](#theming)
- [The nineteen routes](#the-nineteen-routes)
- [Project structure](#project-structure)
- [Deploying](#deploying)
- [All six editions](#all-six-editions)
- [License](#license)

---

## Features

- **One design system, six editions.** Colours, typography, radius, dark mode, the icon treatment and
  the six shell layouts all come from one token file. Change `--brand` and every screen follows, in
  every framework.
- **Nineteen screens that are finished**, not stubs. The dashboard has a real world map and three real
  charts; the tables have search, filter, sorting and row actions; the forms cover every input type
  including multi-select, date and time.
- **Dark mode that inverts properly.** It is a class on `<html>`, so it needs no JavaScript to *stay*
  applied, only to toggle. Charts, the map and the calendar all read the same tokens, so they follow.
- **Six shell layouts**, switchable at runtime and remembered: application, sectioned, three
  documentation variants and an icon rail with flyout submenus.
- **Fixtures next to the screen that uses them.** No mock server, no seed script, no schema to reverse
  engineer. Open a screen and you can see exactly where your data goes.
- **Accessibility that was actually done.** `aria-current` on the row you are on, roving tabindex and
  arrow keys on tab groups, `<dialog>` for modals so focus trapping comes from the platform, and no
  control that announces a popup with nothing behind it.
- **Parity checks in CI.** The sidebar, the shared route list and the screen map are held against each
  other in both directions, so a nav item with no page and a page with no nav item both fail the build
  rather than shipping.

---

## Quick start

Requires **PHP 8.2+** and **Composer**.

```bash
git clone git@github.com:myviliha/free-laravel-admin-dashboard.git
cd free-laravel-admin-dashboard
composer install
cp .env.example .env
php artisan key:generate
php artisan serve
```

Then open [http://localhost:3000](http://localhost:3000).

### Scripts

| Script | What it does |
| --- | --- |
| `npm run dev` | `php artisan serve` on port 3000 |
| `npm run build` | Render every route to static HTML in `dist/` |
| `npm test` | Route table against the Blade views, both directions (no deps) |

---

## What's in it

- **Dashboard**: metrics, monthly sales, a monthly target gauge, a statistics area chart with
  monthly/quarterly/annual views, a customers-by-country world map, and recent orders
- **Calendar**: add, edit and delete events, month/week/day views
- **User profile**: profile, address, security and danger-zone cards, each with an edit dialog
- **Forms**: the full input set: text, select, multi-select, date, time, radio, checkbox, switch,
  file upload, password with a reveal toggle
- **Tables**: recent deals, top products, latest transactions and featured campaigns, with search,
  filter and row actions
- **Charts**: line and bar, themed from the same tokens as everything else
- **UI elements**: alerts, avatars, badges, buttons, images, modals, videos
- **Authentication**: sign in and sign up on a split-screen layout, with social buttons
- **Pages**: a blank page to start from, six shell layouts, and a 404

Plus the things a dashboard is actually judged on: a collapsible sidebar that keeps its state across
navigation, a rail mode with flyout submenus, dark mode, a route progress bar, and `aria-current` on
the row you are really on.

### What is deliberately not here

The searchable and multi-select dropdowns, drag-and-drop upload, the advanced data table and the other
dashboards. Those are Pro, and they are **absent** rather than shown disabled: a control you cannot
use is worse than one you can see is not included.

---

## Using the components in your own Laravel app

The demo pages are there to be deleted. What you probably want is the component library, which is
three directories and no Composer package:

```bash
cp -r resources/views/vui         <your-app>/resources/views/
cp -r resources/views/components  <your-app>/resources/views/
cp -r public/vui                  <your-app>/public/
```

Then include a partial from any Blade view:

```blade
<x-vui-layout title="Invoices">
  @include('vui.card')
  @include('vui.data-table')
</x-vui-layout>
```

See [INSTALL.md](./INSTALL.md) for the full list of partials.

---

## Theming

Every design decision is a CSS custom property, so you override rather than edit:

```css
:root {
  --brand: #266df0;          /* --primary aliases this, so both move together */
  --radius: 0.625rem;        /* buttons, inputs, menu rows */
  --vui-card-radius: 1rem;   /* cards, on their own scale */
  --background: oklch(100% 0 0);
  --foreground: oklch(17.7% 0 0);
}
```

Dark mode is the `dark` class on `<html>`; the token file ships a `.dark` block that redefines the same
names. The chart colours, the world map's landmass and the calendar's event tones are all derived from
these, which is why they follow a theme change without per-component styling.

---

## The nineteen routes

Sixteen behind the shell, two auth screens outside it, and a 404.

| Behind the shell | Outside it |
| --- | --- |
| `/` dashboard, `/calendar`, `/profile`, `/form-elements`, `/basic-tables`, `/blank` | `/signin` |
| `/alerts`, `/avatars`, `/badge`, `/buttons`, `/images`, `/videos`, `/modals` | `/signup` |
| `/line-chart`, `/bar-chart`, `/layouts` | `/error-404` |

`FREE_NAV` in `@viliha/vui-core` is the one list the sidebar and the route set both read, so they
cannot disagree, and the route list is derived from it. Every edition reads the same list, which is
why it lives in the package rather than in each app.

---

## Project structure

```
app/                  the application skeleton
routes/web.php        nineteen Route::view routes, one per page
resources/views/
  components/vui-layout.blade.php   the layout every page extends
  vui/                the component library as Blade partials
  vui-pages/          the nineteen pages
public/vui/           the compiled stylesheet, the scripts, the fonts and images
scripts/
  export-static.mjs   renders every route to dist/ for GitHub Pages
  check.mjs           the route table against the views, both directions
INSTALL.md            copying the partials into an existing Laravel app
composer.json         laravel/framework ^12, php ^8.2
```

---

## Deploying

**A PHP application, deployed as files.** Every route is a `Route::view`: Blade renders a template and nothing else, so the response is the same every time and there is nothing for PHP to decide at request time. `npm run build` boots `php artisan serve`, asks it for each route in `routes/web.php`, strips the build host from the absolute URLs `url()` renders, and writes what Blade returned. The published HTML is Blade's own output from the same views you run locally, not a second copy of the markup.

Running it on a real PHP host instead? Point the document root at `public/` and skip the export
entirely.

This repository publishes itself: [`.github/workflows/deploy.yml`](./.github/workflows/deploy.yml)
runs the checks and the build on every push to `main`, then deploys to GitHub Pages at
[laravel.viliha.com](https://laravel.viliha.com). A pull request runs the same checks and stops
before publishing.

---

## All six editions

| Edition | Repository | Live demo | Docs |
| --- | --- | --- | --- |
| React | [free-reactjs-admin-dashboard](https://github.com/myviliha/free-reactjs-admin-dashboard) | [react.viliha.com](https://react.viliha.com) | [Install](https://docs.viliha.com/docs/installation/react) |
| Next.js | [free-nextjs-admin-dashboard](https://github.com/myviliha/free-nextjs-admin-dashboard) | [nextjs.viliha.com](https://nextjs.viliha.com) | [Install](https://docs.viliha.com/docs/installation/nextjs) |
| Vue | [free-vuejs-admin-dashboard](https://github.com/myviliha/free-vuejs-admin-dashboard) | [vuejs.viliha.com](https://vuejs.viliha.com) | [Install](https://docs.viliha.com/docs/installation/vue) |
| Angular | [free-angularjs-admin-dashboard](https://github.com/myviliha/free-angularjs-admin-dashboard) | [angularjs.viliha.com](https://angularjs.viliha.com) | [Install](https://docs.viliha.com/docs/installation/angular) |
| HTML | [free-html-admin-dashboard](https://github.com/myviliha/free-html-admin-dashboard) | [html.viliha.com](https://html.viliha.com) | [Install](https://docs.viliha.com/docs/installation/html) |
| **Laravel** | *this repository* | [laravel.viliha.com](https://laravel.viliha.com) | [Install](https://docs.viliha.com/docs/installation/laravel) |

Same nineteen screens, same design system, same fixtures. Pick the one that matches your stack.

---

## Contributing

Issues and pull requests are welcome. The parity checks run on every pull request, so if you add a screen you will be told about the sidebar entry you forgot.

## License

[MIT](./LICENSE) © VILIHA PTE. LTD. Free for personal and commercial use.

Every version already published is MIT permanently, so nothing that is free today moves behind a paywall later. Teams who want more than that can read about [Pro](https://viliha.com), which is optional and additive.

---

Made with ♥ from Vietnam by the [Viliha Team](https://viliha.com). If VuiAdmin saved you time, [a sponsorship](https://github.com/sponsors/myviliha) is the best thank-you.
