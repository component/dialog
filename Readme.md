# Dialog

  Dialog component for alerts.

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
