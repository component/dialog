0.4.0 / 2015-02-16
==================

 * add: use pure-css positioning of the dialog.
  * This change is minor because no API was changed nor was a regression observed.

0.3.1 / 2015-02-06
==================

 * fix: don't use bind as they are not available in legacy browsers

0.3.0 / 2014-08-25
==================

 * fix CSS for test/demo
 * removed generic style rules which break user styles
 * reduced specificity: Changed #dialog to .dialog
 * component.json: Pin and update deps

0.2.1 / 2014-06-16
==================

 * c8: Update overlay dep

0.2.0 / 2014-04-05
==================

 * add Dialog.fixed function to allow for an alternate centering algorithm
 * fix 'dialog not centered in some cases' issue

0.1.0 / 2014-04-03
==================

 * remove jQuery dependency
 * fix problems with reopening dialog - remove 'hide' class on show
 * support passing options in overlay() to overlay component
 * make escapable() public
 * use component templates to translate HTML

0.0.7 / 2013-05-27 
==================

 * pin deps

0.0.6 / 2013-02-12 
==================

  * remove redundant 'show' event
  * fix gap between x and "close"

0.0.5 / 2012-09-21 
==================

  * add hidden "close" em within .close
  * remove default box-shadow on .modal. Closes #3

0.0.4 / 2012-08-31 
==================

  * add `.addClass()`. Closes #2
  * add template.js

0.0.3 / 2012-08-03 
==================

  * add component.json
  * fix some event race-conditions

0.0.2 / 2012-07-05 
==================

  * fix dialog.effect support
