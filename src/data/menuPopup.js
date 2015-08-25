/* MPL 2.0 Author : HideAway */ 

self.port.on("show" , function(){
	var contentHeight = Math.max.apply(Math,
		['baseSml', 'baseLg']
			.map(function (a) {
				var elm = document.getElementById(a);
				return elm ? elm.offsetHeight : 0;
			})
	);
	self.port.emit("panel-resize" , [
		document.body.clientWidth + window.scrollMaxX,
		document.body.clientHeight + contentHeight
	]);
});
