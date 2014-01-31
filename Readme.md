
# Dialog

  Dialog component with structural styling to give you a clean slate.

  ![js dialog component](http://f.cl.ly/items/0r140j3W323T3c3i2H3a/Screen%20Shot%202012-07-26%20at%203.11.20%20PM.png)

## Installation

```
$ component install segmentio/dialog
```

## Events

  - `show` the dialog is shown
  - `hide` the dialog is hidden
  - `hiding` the dialog has begun hiding
  - `showing` the dialog has begun showing

## API

### Dialog#closable()

  Make the dialog closable, this adds a ×
  that users make click to forcefully close
  the dialog.

### Dialog#overlay()

  Add a clickable overlay, which closes the dialog.

### Dialog#show()

  Show the dialog.

### Dialog#hide([ms])

  Hide the dialog immediately or wait `ms`.

### Dialog#addClass(name)

  Add class `name`, useful for styling dialogs differently.

## License

  MIT
