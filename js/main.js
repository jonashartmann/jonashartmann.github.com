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

	// printMessage();

	$(function () {
		var height = 1000;
		var width = 1200;
		var techRadar = new window.Radar(height, width);
		var data = window.radarData;
		techRadar.render(data.prepare(height, width));
	});
})(window);
