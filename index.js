var domify = require('domify');
var template = require('./index.html');
var reactive = require('reactive');
var modal = require('modal');
var emitter = require('emitter');


/**
 * Initialize a new `Dialog`.
 *
 * @param {Object} options
 */
function Dialog(options) {
  if(!(this instanceof Dialog)) return new Dialog(options);
  this.el = domify(template);
  this.reactive = reactive(this.el, options || {}, this);
  this.modal = modal(this.el).overlay();
}


/**
 * Mixin
 */
emitter(Dialog.prototype);


/**
 * Make the dialog closable
 *
 * @return {Dialog}
 */
Dialog.prototype.closable =
Dialog.prototype.closeable = function(){
  this.el.classList.add('closable');
  this.modal.closable();
  return this;
};


/**
 * Add an effect when showing and hiding
 *
 * @return {Dialog}
 */
Dialog.prototype.effect = function(name){
  this.modal.effect(name);
  return this;
};


/**
 * Fired when hitting the confirm button
 *
 * @return {void}
 */
Dialog.prototype.handleConfirm = function() {
  this.emit('confirm');
  this.hide();
};


/**
 * Show the dialog. Emits "showing" when it
 * starts transitioning in, and "show" when it
 * is ready.
 *
 * @return {Dialog}
 */
Dialog.prototype.show = function(){
  this.modal.show();
  return this;
};


/**
 * Hide the dialog.
 *
 * @return {Dialog}
 */
Dialog.prototype.hide = function(){
  this.modal.hide();
  return this;
};


/**
 * @type {Function}
 */
module.exports = Dialog;