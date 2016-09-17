(function(window) {

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
		console.log('Reply @ https://twitter.com/jonashart');
	};

	$(function () {
		var elem = $('.mdl-layout');
		elem[0].addEventListener('mdl-componentupgraded', function (e) {
			// printMessage();
			$('html').removeClass('loading');
		});

		var height = 1000;
		var width = 1024;
		var techRadar = new window.Radar(height, width);
		var data = window.radarData;
		techRadar.render(data.prepare(height, width));
	});
})(window);
