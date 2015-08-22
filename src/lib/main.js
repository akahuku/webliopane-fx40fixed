/* MPL 2.0 Author : HideAway */ 

const data = require("sdk/self").data;
const wp = require("./weblioPane");
const sp = require("sdk/simple-prefs");
const pageMod = require("sdk/page-mod");

exports.main = function(options, callbacks){
	var wpWidget = wp.createWidget();
	var wpPane = null;
	
	pageMod.PageMod({
		include: "*",
		contentScriptFile: data.url("selection.js"),
		onAttach: function(worker){
			worker.port.on("select", function(selection){
				if ( sp.prefs.EnableWeblioPane ){
					wpPane = wp.refreshPane(wpPane, selection);
					if ( wpPane ) { wpPane.show();}
				}
			});
		}
	});

	sp.on("EnableWeblioPane" , function(prefName){
		if ( prefName == "EnableWeblioPane" ) {
			wpWidget = wp.refreshWidget(wpWidget);
		}
	});
	
	wpWidget.on("click" , function(){
		if ( sp.prefs.EnableWeblioPane ){
			sp.prefs.EnableWeblioPane = false;
		} else {
			sp.prefs.EnableWeblioPane = true;
		}
	});
}
