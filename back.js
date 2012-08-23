deleteBrowsingData();

function deleteBrowsingData () {
	var settings = localStorage.getItem("settings");
	if(settings == null) {
		var settingsJson = {};
		localStorage.setItem("settings", JSON.stringify(settingsJson));
	}
	else {
		var settingsJson = JSON.parse(settings);
		
		chrome.browsingData.remove({}, {
			"appcache": settingsJson.appcache==true?true:false,
			"cache": settingsJson.cache==true?true:false,
			"cookies": settingsJson.cookies==true?true:false,
			"downloads": settingsJson.downloads==true?true:false,
			"fileSystems": settingsJson.fileSystems==true?true:false,
			"formData": settingsJson.formData==true?true:false,
			"history": settingsJson.history==true?true:false,
			"indexedDB": settingsJson.indexedDB==true?true:false,
			"localStorage": settingsJson.localStorage==true?true:false,
			"pluginData": settingsJson.pluginData==true?true:false,
			"passwords": settingsJson.passwords==true?true:false,
			"webSQL": settingsJson.webSQL==true?true:false
		});
		
	}	
}
