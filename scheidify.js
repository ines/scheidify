function Scheidify() {

	// Imgur settings
	var clientId = '62808d78b807fb7';
	var albumId = '3sP6V';
	var api = 'https://api.imgur.com/3/album/' + albumId + '/images';

	// new HTTP request
	var xhr = new XMLHttpRequest();
	xhr.open( 'GET', api, true);
	xhr.setRequestHeader('Authorization', 'Client-ID ' + clientId);

	xhr.onload = function(e) {
		if(xhr.readyState === 4) {
			if(xhr.status === 200) {

				var result = JSON.parse(xhr.responseText);
				
				// compile array of new images
				var scheiden = [];

				for(var i = 0; i < result.data.length; i++) {
					var scheide = result.data[i];
					scheide.link = scheide.link.replace('http', 'https');
					scheiden.push(scheide);
				}

				// get all images from page
				var images = document.getElementsByTagName('img');

				// iterate over images
				for(var i = 0; i < images.length; i++) {

					// replace with random new image
					images[i].src = scheiden[Math.floor(Math.random()*scheiden.length)].link;

					// keep images proportional / not fuck up container
					images[i].setAttribute('style', 'height: auto; max-width: 100%');
				}

				// add "scheidified" badge
				var badge = document.createElement('div');
				var badgeImage = chrome.extension.getURL('scheidify_badge.png');
				var badgeUrl = chrome.runtime.getManifest().homepage_url;

				badge.innerHTML = '<a style="display: block; position: fixed; top: 25px; right: 50px; border: 0; text-decoration: none; z-index: 9999 !important;" href="' + badgeUrl + '" target="_blank"><img src="' + badgeImage + '" border="0"  alt="Scheidified by Scheidé Révoltée" /></a>';
				document.body.appendChild(badge);
			}

			else {
				console.error(xhr.statusText);
			}
		}
	}

	xhr.send(null);
}