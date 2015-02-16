
/**
 * Module dependencies.
 */

var Emitter = require('emitter')
  , overlay = require('overlay')
  , domify = require('domify')
  , events = require('event')
  , classes = require('classes')
  , query = require('query');

/**
 * Active dialog.
 */

var active;

/**
 * Expose `dialog()`.
 */

exports = module.exports = dialog;

/**
 * Expose `Dialog`.
 */

exports.Dialog = Dialog;

/**
 * Return a new `Dialog` with the given
 * (optional) `title` and `msg`.
 *
 * @param {String} title or msg
 * @param {String} msg
 * @return {Dialog}
 * @api public
 */

function dialog(title, msg){
  switch (arguments.length) {
    case 2:
      return new Dialog({ title: title, message: msg });
    case 1:
      return new Dialog({ message: title });
  }
};

/**
 * Initialize a new `Dialog`.
 *
 * Options:
 *
 *    - `title` dialog title
 *    - `message` a message to display
 *
 * Emits:
 *
 *    - `show` when visible
 *    - `hide` when hidden
 *
 * @param {Object} options
 * @api public
 */

function Dialog(options) {
  Emitter.call(this);
  options = options || {};
  this.template = require('./template.html');
  this.el = domify(this.template);
  this._classes = classes(this.el);
  this.render(options);
  if (active && !active.hiding) active.hide();
  if (exports.effect) this.effect(exports.effect);

  active = this;
  this.on('escape', function(){
    active.hide();
  });
};

/**
 * Inherit from `Emitter.prototype`.
 */

Dialog.prototype = new Emitter;

/**
 * Render with the given `options`.
 *
 * @param {Object} options
 * @api public
 */

Dialog.prototype.render = function(options){
  var self = this
    , el = self.el
    , title = options.title
    , titleEl = query('.title', el)
    , pEl = query('p', el)
    , msg = options.message;

  events.bind(query('.close', el), 'click', function (ev) {
    ev.preventDefault();
    self.emit('close');
    self.hide();
  });

  if (titleEl) {
    if (!title) {
      titleEl.parentNode.removeChild(titleEl);
    } else {
      titleEl.textContent = title;
    }
  }

  // message
  if ('string' == typeof msg) {
    pEl.textContent = msg;
  } else if (msg) {
    pEl.parentNode.insertBefore(msg.el || msg, pEl);
    pEl.parentNode.removeChild(pEl);
  }
};

/**
 * Enable the dialog close link.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.closable = function(){
  return this.addClass('closable');
};

/**
 * Add class `name`.
 *
 * @param {String} name
 * @return {Dialog}
 * @api public
 */

Dialog.prototype.addClass = function(name){
  this._classes.add(name);
  return this;
};

/**
 * Set the effect to `type`.
 *
 * @param {String} type
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.effect = function(type){
  this._effect = type;
  this.addClass(type);
  return this;
};

/**
 * Make it modal!
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.modal = function(){
  this._overlay = overlay();
  return this;
};

/**
 * Add an overlay.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.overlay = function(opts){
  var self = this;
  opts = opts || { closable: true };
  var o = overlay(opts);
  o.on('hide', function(){
    self._overlay = null;
    self.hide();
  });
  this._overlay = o;
  return this;
};

/**
 * Close the dialog when the escape key is pressed.
 *
 * @api public
 */

Dialog.prototype.escapable = function(){
  var self = this;
  // Save reference to remove listener later
  self._escKeyCallback = self._escKeyCallback || function (e) {
    e.which = e.which || e.keyCode;
    if (27 !== e.which) return;
    self.emit('escape');
  };
  events.bind(document, 'keydown', self._escKeyCallback);
  return this;
};

/**
 * Fixed dialogs position can be manipulated through CSS.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.fixed = function(){
  this._fixed = true;
  return this;
}

/**
 * Show the dialog.
 *
 * Emits "show" event.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.show = function(){
  var overlay = this._overlay;
  var self = this;

  // overlay
  if (overlay) {
    overlay.show();
    this._classes.add('modal');
  }

  // escape
  if (!overlay || overlay.closable) this.escapable();

  // position
  document.body.appendChild(this.el);
  this._classes.remove('hide');
  this.emit('show');
  return this;
};

/**
 * Hide the overlay.
 *
 * @api private
 */

Dialog.prototype.hideOverlay = function(){
  if (!this._overlay) return;
  this._overlay.remove();
  this._overlay = null;
};

/**
 * Hide the dialog with optional delay of `ms`,
 * otherwise the dialog is removed immediately.
 *
 * Emits "hide" event.
 *
 * @return {Number} ms
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.hide = function(ms){
  var self = this;

  if (self._escKeyCallback) {
    events.unbind(document, 'keydown', self._escKeyCallback);
  }

  // prevent thrashing - this isn't used
  self.hiding = true;

  // duration
  if (ms) {
    setTimeout(function(){
      self.hide();
    }, ms);
    return self;
  }

  // hide / remove
  self._classes.add('hide');
  if (self._effect) {
    setTimeout(function(){
      self.remove();
    }, 500);
  } else {
    self.remove();
  }

  // overlay
  self.hideOverlay();

  return self;
};
/**
 * Hide the dialog without potential animation.
 *
 * @return {Dialog} for chaining
 * @api public
 */

Dialog.prototype.remove = function(){
  if (this.el.parentNode) {
    this.emit('hide');
    this.el.parentNode.removeChild(this.el);
  }
  return this;
};
