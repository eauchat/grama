# Developing / Tweaking magrav

Grav themes have a simple enough structure, that it's fairly easy to customize any theme.
This theme uses it's own logic, for better editability, fragmenting logics and avoiding duplicating code as much as possible.

Basically grav uses a simple templating language called [Twig](https://twig.symfony.com/doc/2.x/) for its themes.

⚠️ If you get magrav from it's repository, scripts and styles are not built in assets. To test/use magrav, you'll need to build them (see the "Scripts and styles" section below for instructions on how to do it).


## Theme structure

### Templates

The most important files are in the templates folder, this is where all the theme's logic resides. It defines pages and elements templates.


### Partials and modular

The `partials` directory contains code pieces reused in different page templates.
The `modular` directory contains templates for subpages of modular pages.


### Scripts and styles

All `.js` files in the `scripts/lib`, `scripts/modular` and `scripts/partials` directories, and all `.less` files in the `styles/general`, `styles/modular` and `styles/partials` directories are aggregated to be imported in every page.
Also each page imports the `scripts/{{pageTemplateName}}.js` script and `styles/{{pageTemplateName}}.less` stylesheet.

You may modify any file, or add any new one, but if you do so, you'll need to run `bin/buildDists.sh` to reaggregate the styles and scripts.
Note that to run, the `buildDists` script (that you can edit in ./bin/buildDists.sh) depends on the `lessc` command. So you'll have to install it if you want to be able to modify styles.

The easiest thing to do to customize magrav is probably to customize it's colors and display. You can do so by just tweaking a few variables in the `styles/general/theme.less` file.


### Assets

The assets folder contains
 - the built scripts, styles and locales imported in the pages,
 - the fonts used in the pages (imported by the theme)


### Blueprints

If you modify some templates, it may be necessary to modify their corresponding blueprint, so that the admin interface stays coherent with your modifications. See [grav blueprints docs](https://learn.getgrav.org/forms/blueprints) for more details.


## CSS classes structure

Magrav uses a quite structured class toponomy.
General magrav classes are in the form: `magrav-...`
Pages templates classes are in the form: `mat-{{pageTemplateName}}` and `mat-{{pageTemplateName}}--...-...` for subelements.
Partials templates classes are in the form: `mtp-{{partialTemplateName}}` and `mtp-{{partialTemplateName}}--...-...` for subelements.
Templates classes are in the form: `mtm-{{modularTemplateName}}` and `mtm-{{modularTemplateName}}--...` for subelements.
