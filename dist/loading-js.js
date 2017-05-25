/*!
 * loading-js v1.0.0 (http://emalherbi.github.io/loading-js/)
 * Copyright 2010-2017 emalherbi
 * Licensed under MIT (http://en.wikipedia.org/wiki/MIT_License)
 */
'use strict';
Element.prototype.remove = function() {
  this.parentElement.removeChild(this);
};
NodeList.prototype.remove = HTMLCollection.prototype.remove = function() {
  for (var i = this.length - 1; i >= 0; i--) {
    if (this[i] && this[i].parentElement) {
      this[i].parentElement.removeChild(this[i]);
    }
  }
};
(function(root, factory) {
  if (typeof define === 'function' && define.amd) {
    define(factory);
  } else if (typeof exports === 'object') {
    module.exports = factory();
  } else {
    root.loadingjs = factory();
  }
})(this, function() {
  var loadingjs = {};
  loadingjs.version = '1.0.0';
  loadingjs.template = '<div class="loading-js-out"><div class="loading-js"></div></div>';
  loadingjs.element = null;
  loadingjs.animation = null;
  loadingjs.settings = {
    playbackRate: 1
  };
  //
  loadingjs.configure = function(options) {
    var key, value;
    for (key in options) {
      value = options[key];
      if (value && loadingjs.settings.hasOwnProperty(key)) {
        loadingjs.settings[key] = value;
      }
    }
    return this;
  };
  //
  loadingjs.start = function() {
    if (document.getElementsByClassName('loadingjs').length === 0) {
      loadingjs.element = null;
      loadingjs.animation = null;
      //
      document.body.innerHTML = document.body.innerHTML + loadingjs.template;
      //
      loadingjs.element = document.getElementsByClassName('loadingjs')[0];
      //
      loadingjs.animation = loadingjs.element.animate([{
          transform: 'rotate(0)'
        },
        {
          transform: 'rotate(359deg)'
        }
      ], {
        duration: 1000,
        iterations: Infinity
      });
    }
    loadingjs.animation.playbackRate = loadingjs.settings.playbackRate;
    //
    return true;
  };
  //
  loadingjs.done = function() {
    if (document.getElementsByClassName('loadingjs').length !== 0) {
      loadingjs.animation.cancel();
      //
      document.getElementsByClassName('loadingjs-out').remove();
      //
      loadingjs.element = null;
      loadingjs.animation = null;
    }
    //
    return true;
  };
  //
  return loadingjs;
});
