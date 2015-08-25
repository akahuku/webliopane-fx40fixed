/* MPL 2.0 Author : akahuku */

function isContentEditable (node) {
	while (node && node.nodeType != 1) {
		node = node.parentNode;
	}
	return node && node.isContentEditable;
}

function emitSelection (e) {
	setTimeout(function () {
		var selection = window.getSelection();
		if (!selection) return;

		var text = [];
		var contentEditableCount = 0;
		for (var i = 0; i < selection.rangeCount; i++) {
			var r = selection.getRangeAt(i);
			text.push(r.toString());

			if (isContentEditable(r.startContainer) || isContentEditable(r.endContainer)) {
				contentEditableCount++;
			}
		}

		if ( text.length == 0 ) return;
		if ( contentEditableCount == selection.rangeCount ) return;

		text = text.join("\n").replace(/^\s+|\s+$/g, "");

		if ( text == "" ) return;

		self.port.emit("select", text);
	}, 1);
}

document.body.addEventListener("mouseup", emitSelection, false);
//document.body.addEventListener("keyup", emitSelection, false);
