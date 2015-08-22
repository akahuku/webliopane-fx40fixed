/* MPL 2.0 Author : HideAway */ 

self.port.on("show" , function(){
	function $ (id) {
		return document.getElementById(id);
	}
	function $class (className) {
		return Array.prototype.slice.call(document.getElementsByClassName(className));
	}
	function css (element, property, value) {
		if (!element) return;
		if (element instanceof Array) {
			for (var i = 0, goal = element.length; i < goal; i++) {
				element[i].style[property] = value;
			}
		}
		else {
			element.style[property] = value;
		}
	}

	css($("baseLg"),"marginLeft","auto");
	css($("baseLg"),"marginRight","auto");
	css($("wBody"),"height","auto");
	css($("tBody"),"height","auto");
	css($("eBody"),"height","auto");
	css($class("BodyTextLg"),"height","auto");
	css($("wBodyLg"),"height","auto");
	css($("tBodyLg"),"height","auto");
	css($("eBodyLg"),"height","auto");

	self.port.emit("panel-resize" , [ document.body.clientWidth +  window.scrollMaxX  ,document.body.clientHeight +  window.scrollMaxY ]);
});
