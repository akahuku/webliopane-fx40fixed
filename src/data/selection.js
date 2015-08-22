/* MPL 2.0 Author : akahuku */

function emitSelection (e) {
	var text = [];

	var selection = window.getSelection();
	for (var i = 0; i < selection.rangeCount; i++) {
		text.push(selection.getRangeAt(i).toString());
	}

	if ( text.length == 0 ) return;

	text = text.join("\n").replace(/^\s+|\s+$/g, "");

	if ( text == "" ) return;

	self.port.emit("select", text);
}

document.body.addEventListener("mouseup", emitSelection, false);
document.body.addEventListener("keyup", emitSelection, false);
