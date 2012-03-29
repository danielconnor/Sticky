UI.KeyFrameControl = function(parent, property, time, enabled) {
	UI.RangeSliderControl.call(this, parent, enabled);

	if(!arguments[0]) return;

	this.classList.add("keyframe");

	this.position = null;
	this._prop = property || {};
	this.value = time;

	//even tho the keyframes are stored in an array it is helpful to keep a reference
	//to the next and previous keyframes in the list rather than searching for them 
	//each time they need to be accessed
	this.next = null;
	this.prev = null;

	this.addEventListener("change", function() {
		this.emit("timechange");
	});

	this.handle("click");
};

UI.KeyFrameControl.prototype = new UI.RangeSliderControl();
UI.KeyFrameControl.prototype.constructor = UI.KeyFrameControl;


UI.KeyFrameControl.prototype.onclick = function(e) {
	this.emit("select", [e]);
};

Object.defineProperty(UI.KeyFrameControl.prototype, "prop", {
	get: function() {
		return this._prop;
	},
	set: function(property) {

		this._prop = property;

		this.emit("propchange", []);
	}
});


//TODO: get rid of this. Left for compatability reasons 
Object.defineProperty(UI.KeyFrameControl.prototype, "time", {
	get: function() {
		return this._value;
	},
	set: function(time) {

		this.value = time;

	}
});

UI.KeyFrameControl.sort = function(k1, k2) {
	return k1._time - k2._time;
}