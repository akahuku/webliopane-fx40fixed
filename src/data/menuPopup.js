/* MPL 2.0 Author : HideAway */ 

self.port.on("show" , function(){
	$("#baseLg").css("margin-left","auto");
	$("#baseLg").css("margin-right","auto");
	$("#wBody").css("height","auto");
	$("#tBody").css("height","auto");
	$("#eBody").css("height","auto");
	$(".BodyTextLg").css("height","auto");
	$("#wBodyLg").css("height","auto");
	$("#tBodyLg").css("height","auto");
	$("#eBodyLg").css("height","auto");
	self.port.emit("panel-resize" , [ document.body.clientWidth +  window.scrollMaxX  ,document.body.clientHeight +  window.scrollMaxY ]);
});
