
# Dialog

  Dialog component with structural styling to give you a clean slate.

  ![js dialog component](http://f.cl.ly/items/0r140j3W323T3c3i2H3a/Screen%20Shot%202012-07-26%20at%203.11.20%20PM.png)

  Live demo is [here](http://component.github.io/dialog/)

## Installation

```
$ npm install dialog-component
```

## Features

  - events for composition
  - structural CSS letting you decide on style
  - overlay support
  - modal overlay support
  - escapable (esc key support)
  - fluent API

## Events

  - `show` the dialog is shown
  - `hide` the dialog is hidden
  - `escape` the dialog was closed via the escape key
  - `close` the dialog was closed via the close button

## API

### dialog(msg)

  Display a dialog with a `msg` only.

### dialog(title, msg)

  Display a dialog with `title` and `msg`.

### Dialog#closable()

  Make the dialog closable, this adds a ×
  that users make click to forcefully close
  the dialog.

### Dialog#effect(name)

  Assign the effect name, driven by CSS transitions.
  Out of the box the following are available:

  - `slide`
  - `fade`
  - `scale`

### Dialog#overlay()

  Add a clickable overlay, which closes the dialog.

### Dialog#modal()

  Add a non-clickable overlay making it modal.

### Dialog#fixed()

  Dialogs are centered by default. If you'd rather use CSS to position the dialog make it `fixed`;
  no per element CSS properties are added to such dialogs.

### Dialog#escapable()

  This is __private__ as it is implied by other options.
  If no overlay is used, or the overlay is non-modal
  then a user may close the dialog by pressing the escape key.

### Dialog#show()

  Show the dialog.

### Dialog#hide([ms])

  Hide the dialog immediately or wait `ms`.

### Dialog#addClass(name)

  Add class `name`, useful for styling dialogs differently.

## License

  MIT

## Developers

Install [component-test](https://github.com/MatthewMueller/component-test)
globally in order to run unit tests:

```bash
sudo npm install -g component-test2
```
