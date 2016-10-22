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
				file: 'images/logo1.svg',
				start: start || 'inViewport'
			},
			finishedAnimation);
	};

	$(function () {
		var logo = initLogo($('.profile-logo')[0], 'manual');
		var mobileLogo = initLogo($('.profile-logo')[1], 'manual');

		var replayLogo = function replayLogo () {
			logo.reset().play();
		};

		var elem = $('.mdl-layout');
		elem[0].addEventListener('mdl-componentupgraded', function (e) {
			if ($(e.target).hasClass('mdl-layout')) {
				$('html').removeClass('loading');
				setTimeout(replayLogo, 1);

				var $drawerButton = $('.mdl-layout__drawer-button');
				$drawerButton[0].addEventListener('click', function (e) {
					mobileLogo.reset().play();
				});
			}
		});

		initTechRadar(1000, 1024);
	});
})(window);
