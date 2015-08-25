/* MPL 2.0 Author : HideAway */ 

const data = require("sdk/self").data;
const panels = require("sdk/panel");
const {ActionButton} = require("sdk/ui/button/action");
const sp = require("sdk/simple-prefs");

var PanelOnShow = null;
var PanelOnResize = null;
var eUrl =  'http://api.weblio.jp/act/quote/v_1_0/e/?type=elarge&q=';

var getIconUrl = function(){
	return data.url(sp.prefs.EnableWeblioPane ?
					"icon16.png" :
					"icon16_off.png");
}

var createPanel = function(aUrl){
	return panels.Panel({
		width : 400,
		height : 400,
		contentURL : aUrl,
		contentScriptFile : data.url("menuPopup.js"),
		onShow : function(){
			this.port.emit("show");
		},
	});
}
exports.createPanel = createPanel;

var createWidget = function(){
	return ActionButton({
		id: "weblio-pane",
		label: "weblopPane (fx40fixed)",
		icon: getIconUrl()
	});
}
exports.createWidget = createWidget;

var refreshPane = function (aPanel, text){
	if ( aPanel != undefined ) { aPanel.destroy(); }
	
	var ref = false;
	if ( sp.prefs.EnglishWordOnly ){
		if ( /^[\s\t\r\n]*[\w\.\+\-\s]+[\s\t\r\n]*$/.test(text) ){ ref = true; }
	} else {
		ref = true;
	}
	if ( !ref ) { return;}
	var newPanel = createPanel(eUrl + encodeURIComponent(text));
	
	newPanel.resize(400,1);
	PanelOnResize = newPanel.port.on("panel-resize" , function( [ w , h ]){
		w = 400;
		h = h < 400 ? h : 400;
		newPanel.resize(w,h);
	});
	return newPanel;
}
exports.refreshPane = refreshPane;

var refreshWidget = function(widget){
	widget.icon = getIconUrl();
	return widget;
}
exports.refreshWidget = refreshWidget;

