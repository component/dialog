var Emitter = require('emitter');
var overlay = require('overlay');
var domify = require('domify');
var template = require('./index.html');
var reactive = require('reactive');
var onEscape = require('on-escape');
var afterTransition = require('after-transition');

/**
 * Initialize a new `Dialog`.
 *
 * @param {Object} options
 */
function Dialog(options) {
  if(!(this instanceof Dialog)) return new Dialog(options);
  this.hide = this.hide.bind(this);
  this.show = this.show.bind(this);
  this.el = domify(template);
  this.reactive = reactive(this.el, options || {}, this);
};

/**
 * Mixin emitter
 */
Emitter(Dialog.prototype);

/**
 * Make the dialog closable
 *
 * @return {Dialog}
 */
Dialog.prototype.closable = function(){
  onEscape(this.hide);
  this.addClass('closable');
  return this;
};

/**
 * Add a class
 *
 * @param {String} name
 */
Dialog.prototype.addClass = function(name){
  this.el.classList.add(name);
  return this;
};

/**
 * Remove a class
 *
 * @param {String} name
 *
 * @return {Dialog}
 */
Dialog.prototype.removeClass = function(name){
  this.el.classList.remove(name);
  return this;
};

/**
 * Add an overlay
 *
 * @param {Object} opts
 *
 * @return {Dialog}
 */
Dialog.prototype.overlay = function(opts){
  var o = overlay(opts);
  o.on('hide', this.hide);
  this.on('hide', o.hide);
  this.on('showing', o.show);
  return this;
};

/**
 * Show the dialog. Emits "showing" when it
 * starts transitioning in, and "show" when it
 * is ready.
 *
 * @return {Dialog}
 */
Dialog.prototype.show = function(){
  if(this.hiding === false) return;
  this.hiding = false;
  var self = this;
  this.emit('showing');
  afterTransition.once(this.el, function(){
    self.emit('show');
  });
  document.body.appendChild(this.el);
  this.removeClass('hide');
  return this;
};

/**
 * Hide the dialog.
 *
 * @param {Number} ms Optional delay
 *
 * @return {Dialog}
 */
Dialog.prototype.hide = function(ms){
  if(this.hiding === true) return;
  this.hiding = true;
  var self = this;
  onEscape.unbind(this.hide);
  if (ms) {
    setTimeout(this.hide, ms);
    return this;
  }
  this.addClass('hide');
  this.emit('hiding');
  afterTransition.once(function(){
    self.emit('hide');
    self.el.parentNode.removeChild(self.el);
  });
  return this;
};

/**
 * @type {Function}
 */
module.exports = Dialog;