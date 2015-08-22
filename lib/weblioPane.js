/* MPL 2.0 Author : HideAway */ 

const data = require("self").data;
const panels = require("panel");
const widgets = require("widget");
const selection = require("selection");
const sp = require("simple-prefs");

var PanelOnShow = null;
var PanelOnResize = null;
var eUrl =  'http://api.weblio.jp/act/quote/v_1_0/e/?type=elarge&q=';

var createPanel = function(aUrl){
	return panels.Panel({
		width : 400,
		height : 400,
		contentURL : aUrl,
		contentScriptFile :[data.url("menuPopup.js"), data.url("jquery-1.8.3.min.js")],
		onShow : function(){
			this.port.emit("show");
		},
	});
}
exports.createPanel = createPanel;

var createWidget = function(panel){
	var iconUrl;
	if ( sp.prefs.EnableWeblioPane ){
		iconUrl = data.url("icon16.png");
	} else {
		iconUrl = data.url("icon16_off.png");
	}
	return widgets.Widget({
			id: "weblio-pane",
			label: "weblioPane",
			contentURL: iconUrl,
		});
}
exports.createWidget = createWidget;

var refreshPane = function (aPanel){
	if ( aPanel != undefined ) { aPanel.destroy(); }
	
	var ref = false;
	if ( sp.prefs.EnglishWordOnly ){
		if ( /^[\s\t\r\n]*[\w\.\+\-\s]+[\s\t\r\n]*$/.test(selection.text) ){ ref = true; }
	} else {
		ref = true;
	}
	if ( !ref ) { return panel;}
	var newPanel = createPanel(eUrl + encodeURIComponent(selection.text));
	
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
	if ( sp.prefs.EnableWeblioPane ){
		widget.contentURL = data.url("icon16.png");
	} else {
		widget.contentURL = data.url("icon16_off.png");
	}
	return widget;
}
exports.refreshWidget = refreshWidget;

