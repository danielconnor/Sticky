/*global util, UI */
UI.Prompt = (function() {
  "use strict";

  function Prompt(openClass, closedClass) {
    UI.Control.call(this, "div", ["prompt"]);
    this.openClass = openClass;
    this.closedClass = closedClass || "prompt";
    this.classList.add(this.closedClass);
    
    var style = window.getComputedStyle(this.element);
    this.animated = style ? !!style.webkitTransition : false;
  }
  util.inherits(Prompt, UI.Control);

  var _proto = Prompt.prototype,
    _super = UI.Control.prototype;


  _proto.open = function(content) {
    this.element.innerHTML = content;
    document.body.appendChild(this.element);
    var self = this;
    setTimeout(function() {
      self.classList.add(self.openClass);
    }, 0);
  };

  _proto.close = function() {
    if(this.animated) {
      this.once("webkitAnimationEnd", this.remove.bind(this), false);
      this.classList.remove(this.openClass);
    }
    else this.remove();
  };

  return Prompt;
})();