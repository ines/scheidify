// Scheidify enabled state
var scheidifyEnabled = false;

// add click action to toolbar button
chrome.browserAction.onClicked.addListener(function(tab) {

	// if Scheidify is currently disabled, enable
	if(!scheidifyEnabled) {

		// add badge text to icon
		chrome.browserAction.setBadgeText({ 
			text: 'on', 
			tabId: tab.id
		});
		
		// add badge background color to icon
		chrome.browserAction.setBadgeBackgroundColor({ 
			color: '#000', 
			tabId: tab.id 
		});

		// run Scheidify in tab
		chrome.tabs.executeScript({ 
			code: 'Scheidify();'
		});
	}

	// if Scheidify is currently enabled, disable
	else {

		// remove badge text from icon
		chrome.browserAction.setBadgeText({ 
			text: '', 
			tabId: tab.id
		});

		// reload current tab to restore page
		chrome.tabs.executeScript({ 
			code: 'window.location.reload();' 
		});
	}

	// toggle enabled state
	scheidifyEnabled = !scheidifyEnabled;
});