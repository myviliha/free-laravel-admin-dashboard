# Installing the VUI Laravel edition

Four directories, and no Composer package to add.

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

## What you get

**64 partials**, one per component family, in `resources/views/vui/`. Each one is the
markup the React edition renders, produced by `renderToStaticMarkup` rather than typed out, so this
edition cannot drift from that one.

**`vui.css`** is the whole design system: the tokens, the components, light and dark. Switching theme
is a class on `<html>`, which the layout already wires to a `$dark` variable.

**`vui.js`** is roughly three kilobytes and is the only script. It attaches the behaviour the handful
of interactive families need. There is no framework runtime, no build step and no Node in production.

**19 page views** in `resources/views/vui-pages/`, which are whole screens rather than
components: the free demo's dashboard, calendar, profile, forms, tables and the rest, extracted from
its own build. Return one from a route and you have that screen:

```php
Route::get('/', fn () => view('vui-pages.index'));
Route::get('/basic-tables', fn () => view('vui-pages.basic-tables'));
```

Three things in them are live Blade rather than escaped markup, and nothing else is: the two asset
links resolve through `asset()`, and the links between pages resolve through `url()`. Rename your
routes and those are the lines to change. Charts need JavaScript in every edition, so a chart renders
its reserved placeholder here until you wire one up.


## What a partial is, and is not

A partial is **markup to copy and adapt**, not a parameterised component. It carries fixture content,
because the alternative is a Blade component per family with a prop per attribute, which is the
hand-porting this product deliberately does not do (`PD-046`). Take the partial, replace the text
with your own, and keep the classes.

For a table backed by a controller, that is the shape: `@include` the partial once to see the markup,
then loop your rows inside it with the same classes.

## The escaping

The generator escapes `@` as `@@` and `{{` as `@{{`, so a Tailwind container query or an arbitrary
value containing either cannot become a Blade directive. Blade renders both back to the literal
character, so the browser sees exactly what React renders.
