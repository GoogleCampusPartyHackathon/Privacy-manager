$(document).ready( function(){
	actionsBinding();
	checkChromeSettings();
});


function actionsBinding() {
	$(".cb-enable").click(function(){
    	switchCheckboxChange(this, true, true);
    });
    $(".cb-disable").click(function(){
    	switchCheckboxChange(this, false, true);
    });
    $("#incognito").click(function(){
    	runIncognito();
    });
}

function runIncognito () {
	chrome.tabs.query({active:true},function(tab){
		var currentUrl = tab[0].url.toString();
		if(currentUrl.indexOf("chrome://") ==-1) {
			chrome.windows.create({url: tab[0].url, incognito: true});
		}
		else {
			alert("Sorry you can't run current active page in incognito mode.");
		}
	});
}

function switchCheckboxChange(obj, onOff, changeSettings) {
	if(onOff) {
		var parent = $(obj).parents('.switch');
		$('.cb-disable',parent).removeClass('selected');
		$(obj).addClass('selected');
		$('.checkbox',parent).attr('checked', true);
		if(changeSettings) {
			updateChromeSettings(parent[0].id, true)
		}
	}
	else {
        var parent = $(obj).parents('.switch');
        $('.cb-enable',parent).removeClass('selected');
        $(obj).addClass('selected');
        $('.checkbox',parent).attr('checked', false);
        if(changeSettings) {
			updateChromeSettings(parent[0].id, false)
		}
	}
}

function checkChromeSettings(){
	
	// Check for thirdPartyCookiesAllowed
	chrome.privacy.websites.thirdPartyCookiesAllowed.get({}, function(details) {
		if (details.value) {
			var myElement = $("#thirdPartyCookiesAllowed .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#thirdPartyCookiesAllowed .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		
	});
	
	// Check for autofillEnabled
	chrome.privacy.services.autofillEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#autofillEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#autofillEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for instantEnabled
	chrome.privacy.services.instantEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#instantEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#instantEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for safeBrowsingEnabled
	chrome.privacy.services.safeBrowsingEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#safeBrowsingEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#safeBrowsingEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for searchSuggestEnabled
	chrome.privacy.services.searchSuggestEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#searchSuggestEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#searchSuggestEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for searchSuggestEnabled
	chrome.privacy.services.spellingServiceEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#spellingServiceEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#spellingServiceEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for translationServiceEnabled
	chrome.privacy.services.translationServiceEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#translationServiceEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#translationServiceEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	
	// Check for hyperlinkAuditingEnabled
	chrome.privacy.websites.hyperlinkAuditingEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#hyperlinkAuditingEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#hyperlinkAuditingEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for referrersEnabled
	chrome.privacy.websites.referrersEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#referrersEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#referrersEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for networkPredictionEnabled
	chrome.privacy.network.networkPredictionEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#networkPredictionEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#networkPredictionEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	// Check for alternateErrorPagesEnabled
	chrome.privacy.services.alternateErrorPagesEnabled.get({}, function(details) {
		if (details.value) {
			var myElement = $("#alternateErrorPagesEnabled .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		else {
			var myElement = $("#alternateErrorPagesEnabled .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
	});
	
	var settings = localStorage.getItem("settings");
	if(settings == null) {
		var settingsJson = {};
		localStorage.setItem("settings", JSON.stringify(settingsJson));
	}
	else {
		var settingsJson = JSON.parse(settings);
		
		/*
		 * Cookies
		 */
		if(settingsJson.cookies == null) {
			settingsJson.cookies = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#cookies .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.cookies == false) {
			var myElement = $("#cookies .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#cookies .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * appcache
		 */
		if(settingsJson.appcache == null) {
			settingsJson.appcache = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#appcache .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.appcache == false) {
			var myElement = $("#appcache .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#appcache .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * cache
		 */
		if(settingsJson.cache == null) {
			settingsJson.cache = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#cache .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.cache == false) {
			var myElement = $("#cache .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#cache .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * downloads
		 */
		if(settingsJson.downloads == null) {
			settingsJson.downloads = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#downloads .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.downloads == false) {
			var myElement = $("#downloads .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#downloads .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * fileSystems
		 */
		if(settingsJson.fileSystems == null) {
			settingsJson.fileSystems = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#fileSystems .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.fileSystems == false) {
			var myElement = $("#fileSystems .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#fileSystems .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * formData
		 */
		if(settingsJson.formData == null) {
			settingsJson.formData = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#formData .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.formData == false) {
			var myElement = $("#formData .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#formData .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * history
		 */
		if(settingsJson.history == null) {
			settingsJson.history = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#history .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.history == false) {
			var myElement = $("#history .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#history .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * indexedDB
		 */
		if(settingsJson.indexedDB == null) {
			settingsJson.indexedDB = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#indexedDB .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.indexedDB == false) {
			var myElement = $("#indexedDB .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#indexedDB .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * localStorage
		 */
		if(settingsJson.localStorage == null) {
			settingsJson.localStorage = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#localStorage .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.localStorage == false) {
			var myElement = $("#localStorage .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#localStorage .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * pluginData
		 */
		if(settingsJson.pluginData == null) {
			settingsJson.pluginData = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#pluginData .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.pluginData == false) {
			var myElement = $("#pluginData .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#pluginData .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * passwords
		 */
		if(settingsJson.passwords == null) {
			settingsJson.passwords = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#passwords .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.passwords == false) {
			var myElement = $("#passwords .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#passwords .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
		
		/*
		 * webSQL
		 */
		if(settingsJson.webSQL == null) {
			settingsJson.webSQL = false;
			localStorage.setItem("settings", JSON.stringify(settingsJson));
			var myElement = $("#webSQL .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else if(settingsJson.webSQL == false) {
			var myElement = $("#webSQL .cb-disable");
			switchCheckboxChange(myElement, false, false);
		}
		else {
			var myElement = $("#webSQL .cb-enable");
			switchCheckboxChange(myElement, true, false);
		}
	}
	
	
}

function updateChromeSettings(settingName, onOff) {
	var settings = localStorage.getItem("settings");
	var settingsJson = JSON.parse(settings);
	
	switch(settingName)
	{
		case "thirdPartyCookiesAllowed":
				if(onOff) {	chrome.privacy.websites.thirdPartyCookiesAllowed.set({value:true});	}
				else { chrome.privacy.websites.thirdPartyCookiesAllowed.set({value:false}); }
		break;
		case "autofillEnabled":
				if(onOff) {	chrome.privacy.services.autofillEnabled.set({value:true});	}
				else { chrome.privacy.services.autofillEnabled.set({value:false}); }
		break;
		case "instantEnabled":
				if(onOff) {	chrome.privacy.services.instantEnabled.set({value:true});	}
				else { chrome.privacy.services.instantEnabled.set({value:false}); }
		break;
		case "safeBrowsingEnabled":
				if(onOff) {	chrome.privacy.services.safeBrowsingEnabled.set({value:true});	}
				else { chrome.privacy.services.safeBrowsingEnabled.set({value:false}); }
		break;
		case "searchSuggestEnabled":
				if(onOff) {	chrome.privacy.services.searchSuggestEnabled.set({value:true});	}
				else { chrome.privacy.services.searchSuggestEnabled.set({value:false}); }
		break;
		case "spellingServiceEnabled":
				if(onOff) {	chrome.privacy.services.spellingServiceEnabled.set({value:true});	}
				else { chrome.privacy.services.spellingServiceEnabled.set({value:false}); }
		break;
		case "translationServiceEnabled":
				if(onOff) {	chrome.privacy.services.translationServiceEnabled.set({value:true});	}
				else { chrome.privacy.services.translationServiceEnabled.set({value:false}); }
		break;
		case "hyperlinkAuditingEnabled":
				if(onOff) {	chrome.privacy.websites.hyperlinkAuditingEnabled.set({value:true});	}
				else { chrome.privacy.websites.hyperlinkAuditingEnabled.set({value:false}); }
		break;
		case "referrersEnabled":
				if(onOff) {	chrome.privacy.websites.referrersEnabled.set({value:true});	}
				else { chrome.privacy.websites.referrersEnabled.set({value:false}); }
		break;
		case "networkPredictionEnabled":
				if(onOff) {	chrome.privacy.network.networkPredictionEnabled.set({value:true});	}
				else { chrome.privacy.network.networkPredictionEnabled.set({value:false}); }
		break;
		case "alternateErrorPagesEnabled":
				if(onOff) {	chrome.privacy.services.alternateErrorPagesEnabled.set({value:true});	}
				else { chrome.privacy.services.alternateErrorPagesEnabled.set({value:false}); }
		break;
		// Chrome browser close part
		case "cookies":
				if(onOff) {	settingsJson.cookies = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.cookies = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "appcache":
				if(onOff) {	settingsJson.appcache = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.appcache = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "cache":
				if(onOff) {	settingsJson.cache = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.cache = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "downloads":
				if(onOff) {	settingsJson.downloads = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.downloads = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "fileSystems":
				if(onOff) {	settingsJson.fileSystems = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.fileSystems = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "formData":
				if(onOff) {	settingsJson.formData = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.formData = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "history":
				if(onOff) {	settingsJson.history = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.history = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "indexedDB":
				if(onOff) {	settingsJson.indexedDB = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.indexedDB = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "localStorage":
				if(onOff) {	settingsJson.localStorage = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.localStorage = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "pluginData":
				if(onOff) {	settingsJson.pluginData = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.pluginData = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "passwords":
				if(onOff) {	settingsJson.passwords = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.passwords = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
		case "webSQL":
				if(onOff) {	settingsJson.webSQL = true; localStorage.setItem("settings", JSON.stringify(settingsJson));}
				else { settingsJson.webSQL = false; localStorage.setItem("settings", JSON.stringify(settingsJson)); }
		break;
	}
}
