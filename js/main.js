(function(window) {
	'use strict';

	var printMessage = function printMessage () {
		console.log(
		' _   _      _ _         ______   _ _                ______           '+'\n'+
		'| | | |    | | |        |  ___| | | |               |  _  \\          '+'\n'+
		'| |_| | ___| | | ___    | |_ ___| | | _____      __ | | | |_____   __'+'\n'+
		'|  _  |/ _ \\ | |/ _ \\   |  _/ _ \\ | |/ _ \\ \\ /\\ / / | | | / _ \\ \\ / /'+'\n'+
		'| | | |  __/ | | (_) |  | ||  __/ | | (_) \\ V  V /  | |/ /  __/\\ V / '+'\n'+
		'\\_| |_/\\___|_|_|\\___( ) \\_| \\___|_|_|\\___/ \\_/\\_/   |___/ \\___| \\_/  '+'\n'+
		'                    |/'
		);
		console.log('Say hi @ https://twitter.com/jonashart');
	};

	var initTechRadar = function initTechRadar (height, width) {
		var techRadar = new window.Radar(height, width);
		var data = window.radarData;
		techRadar.render(data.prepare(height, width));
	};

	function finishedAnimation(vivusEl) {
		// console.log('Finished.', vivusEl);
	}
	var initLogo = function initLogo (element, start) {
		return new Vivus(element,
			{
				duration: 200,
				file: 'img/logo.svg',
				start: start || 'inViewport'
			},
			finishedAnimation);
	};

	$(function () {
		var $logos = $('.profile-logo');
		for (var i = 0; i < $logos.length; i++) {
			var logo = initLogo($logos[i]);
		}

		// initTechRadar(1000, 1024);
		printMessage();
	});
})(window);
