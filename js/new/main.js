(function(global, Prism){
'use strict';
var document = global.document;
var store = global.Store;

function sleep(ms) {
	return new Promise(resolve => setTimeout(resolve, ms));
}

// CodeWrite class begin
function CodeWriter(writingSpeed) {
	this.writingSpeed = writingSpeed;
}
CodeWriter.prototype.writeOnElement = async function writeOnElement(elem, codeToWrite) {
	if (codeToWrite instanceof Function) { codeToWrite = codeToWrite.toString().split('\r'); }
	try {
		for (let i = 0; i < codeToWrite.length; i++) {
			await this.writeCharByChar(elem, codeToWrite[i]);
		}
	} catch (ex) {
		console.error('Something went really bad :(', ex);
	}
};
CodeWriter.prototype.writeCharByChar = async function writeCharByChar(elem, line) {
	for (let i = 0; i < line.length; i++) {
		await this.appendToCode(elem, line[i]);
	}
};
CodeWriter.prototype.appendToCode = function appendToCode(elem, str) {
	elem.innerHTML += str;
	if (this.highlight) {
		// Notify prism to highlight it again
		Prism.highlightElement(elem);
	}
	
	return sleep(this.writingSpeed);
};
CodeWriter.prototype.setHighlight = function setHighlight(highlight) {
	this.highlight = highlight;
	return this;
}
// CodeWriter class end

document.addEventListener("DOMContentLoaded", function() {
	'use strict';

	var codeContainers = document.getElementsByClassName('code-container');

	var writeToContainer = async function writeToContainer(container, text) {
		var writeSpeed = container.getAttribute('data-write-speed') || 10;
		var highlight = container.getAttribute('data-highlight') === "false" ? false : true;
		
		var codeWriter = new CodeWriter(writeSpeed).setHighlight(highlight);
		await codeWriter.writeOnElement(container, text);
	}

	var start = async function start() {
		for (let i = 0; i < codeContainers.length; i++) {
			var container = codeContainers[i];
			var codeName = container.getAttribute('data-code');
			if (!codeName) { console.error("Oops, no code available."); return; }
			var writeSpeed = container.getAttribute('data-write-speed') || 10;
			var highlight = container.getAttribute('data-highlight') === "false" ? false : true;
			
			var codeWriter = new CodeWriter(writeSpeed).setHighlight(highlight);
			await codeWriter.writeOnElement(container, store[codeName]);
		}
	}
	var restart = async function restart() {
		for (let i = 0; i < codeContainers.length; i++) {
			var container = codeContainers[i];
			container.innerHTML = '';
		}
		await start();
	}

	var runCommand = async function runCommand(command) {
		var container = codeContainers[0];
		if (!store[command]) {
			await writeToContainer(container, ">>> Oops, what is '" + command + "'? <<<\n");
		} else {
			await writeToContainer(container, ">>> Running command '" + command + "' <<<\n");
		}
	}

	var data = {
		speed: 1,
		store: store,
		restart: restart,
		runCommand: runCommand,
		command: "",
		visible: false,
		toggleVisibility: function() {
			data.visible = data.visible ? false : true;
		}
	};
	var app = new Vue({
		el: '#app',
		data: data
	});
	
	start();
});

})(window, Prism);