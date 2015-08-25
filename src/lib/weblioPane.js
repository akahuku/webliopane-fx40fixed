/* MPL 2.0 Author : HideAway */ 

const data = require("sdk/self").data;
const panels = require("sdk/panel");
const {ActionButton} = require("sdk/ui/button/action");
const sp = require("sdk/simple-prefs");

const ENDPOINT_LARGE = 'http://api.weblio.jp/act/quote/v_1_0/e/?type=elarge&q=';
const ENDPOINT_SMALL = 'http://api.weblio.jp/act/quote/v_1_0/e/?type=esmall&q=';

var getIconUrl = function(){
	return data.url(sp.prefs.EnableWeblioPane ?
					"icon16.png" :
					"icon16_off.png");
};

var getEndPointUrl = function(){
	return sp.prefs.UseDetailedPopup ?
		ENDPOINT_LARGE :
		ENDPOINT_SMALL;
};

var createPanel = function(aUrl){
	return panels.Panel({
		width : sp.prefs.PopupWidthPx,
		height : sp.prefs.PopupMaxHeightPx,
		contentURL : aUrl,
		contentScriptFile : data.url("menuPopup.js"),
		contentStyleFile : data.url("popup.css"),
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
	var newPanel = createPanel(getEndPointUrl() + encodeURIComponent(text));
	
	newPanel.resize(sp.prefs.PopupWidthPx,1);
	newPanel.port.on("panel-resize" , function( [ w , h ]){
		w = sp.prefs.PopupWidthPx;
		h = Math.min(h, sp.prefs.PopupMaxHeightPx);
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

