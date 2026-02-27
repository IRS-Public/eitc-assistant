/*
				    .ooooo.          ooo. .oo.     .ooooo.    oooo d8b
				   d88" `88b         `888P"Y88b   d88" `88b   `888""8P
				   888888888  88888   888   888   888   888    888
				   888        88888   888   888   888   888    888       
				   `"88888"          o888o o888o  `Y8bod8P"   d888b      

***********************************************************************************************************
Copyright 2014 by E-Nor Inc.
Automatically tag links for Google Analytics to track file downloads, outbound links, and email clicks. 
Automatically tag links for Google Analytics to simplify tracking across domains.

Author Mohamed Adel
Automatically tag youtube videos for Google Tag Manager to Play / Pause / Watch to End / Progress. 
Version: 5.1 : Enhanced 
AFS - added domains
Recieved: 10.18.17
Updated: 12.03.17
********************************************************************************/

function addLinkerEvents()
{
	var domains_to_track = ["irs.gov", "apps.irs.gov", "search.irs.gov", "forms.irs.gov", "ftp.irs.gov","dev.edit.irs.gov","sit.edit.irs.gov","eite.edit.irs.gov","trainingc.edit.irs.gov","trainingd.edit.irs.gov","pete.edit.irs.gov","prod.edit.irs.gov", "stayexempt.irs.gov", "eitc.irs.gov", "marketingexpress.irs.gov"];
	var extDoc = [".doc", ".docx", ".xls", ".xlsx", ".xlsm", ".ppt", ".pptx", ".exe", ".zip", ".pdf", ".txt", ".rss", ".mobi", ".epub", ".mp3", ".wmv", ".asx", ".smi", ".js"];
	var mainDomain = document.location.hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
	mainDomain = mainDomain.toLowerCase();
	var arr = document.getElementsByTagName("a");

	for(i=0; i < arr.length; i++)
	 {
		var flag = 0;
		var flagExt = 0;
		var tmp = arr[i].getAttribute("onclick");
		var doname =""; 
		var mailPattern = /[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/;
		var urlPattern = /(ftp|http|https):\/\/(\w+:{0,1}\w*@)?(\S+)(:[0-9]+)?(\/|\/([\w#!:.?+=&%@!\-\/]))?/;

		if(mailPattern.test(arr[i].href) || urlPattern.test(arr[i].href))
		{
			try
			 {
				doname = arr[i].hostname.match(/(([^.\/]+\.[^.\/]{2,3}\.[^.\/]{2})|(([^.\/]+\.)[^.\/]{2,4}))(\/.*)?$/)[1];
				doname = arr[i].hostname.toLowerCase().replace("www.","");
				doname = doname.toLowerCase();
			 }
			catch(err)
			 {
				var temp_mail = arr[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
				var temp_dom = temp_mail[0].split("@");
				doname = temp_dom[temp_dom.length-1];
				doname = doname.toLowerCase();
			 }	     
		}

		else
		{   
			continue; 
		}

		if (tmp != null) 
		{
			tmp = String(tmp);
			if (tmp.indexOf('ga') > -1) 
			continue;
		}

		/* Internal Links */
		if(doname == mainDomain)
		{	
			/* Tracking email clicks */
			if (arr[i].href.toLowerCase().indexOf("mailto:") != -1) 
			{
				var gaUri = arr[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
				arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Email Clicks', 'Mail To', '"+gaUri+"');");
			}

			else if(arr[i].href.toLowerCase().indexOf("mailto:") == -1)
			{
				for(var j = 0; j < extDoc.length; j++) 
				{
					var arExt = arr[i].href.split(".");
					var ext = arExt[arExt.length-1].split(/[#?]/);
					if("."+ext[0].toLowerCase() == extDoc[j]) 
					{
						/* Tracking electronic documents - doc, xls, pdf, exe, zip */
						var intGaUri = arr[i].href.split(doname);
						var gaUri = intGaUri[1].split(extDoc[j]);
						arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Downloads', 'File Download', '"+gaUri[0]+extDoc[j]+"');");
						break;
					}
				}
			}
		}

		/* Subdomains Links */
		if(doname != mainDomain && doname.indexOf(mainDomain) != -1)
		{
			for (var k = 0; k < domains_to_track.length; k++) 
			{
				if(doname != domains_to_track[k]) 
				{
					flag++;
					if(flag == domains_to_track.length)
					{
						if(arr[i].href.toLowerCase().indexOf("mailto:") == -1)
						{
							/* Tracking outbound links off site */
							var gaUri = arr[i].href.split("//");
							arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Outbound Links', 'Click', '"+gaUri[1]+"');");
						}
					}
				}

				else if(doname == domains_to_track[k] && arr[i].href.toLowerCase().indexOf("mailto:") == -1)
				{
					if(arr[i].href.toLowerCase().indexOf("dest=") != -1)
					{
						/* Tracking gated external links (i.e. http://apps.irs.gov/app/scripts/exit.jsp?dest=http://www.usa.gov/) */
						var tempUri = arr[i].href.split("dest=");
						var gaUri = tempUri[tempUri.length-1].replace("http://","").replace("https://", "");
						arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Outbound Links', 'Click', '"+gaUri+"');");
					}
					else
					{
						for(var l = 0; l < extDoc.length; l++) 
						{
							var arExt = arr[i].href.split(".");
							var ext = arExt[arExt.length-1].split(/[#?]/);
							if("."+ext[0].toLowerCase() == extDoc[l]) 
							{
								/* Tracking electronic documents - doc, xls, pdf, exe, zip */
								var intGaUri = arr[i].href.split(doname);
								var gaUri = intGaUri[1].split(extDoc[l]);
								arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Downloads', 'File Download', '"+gaUri[0]+extDoc[l]+"');");
								break;
							}
							else if("."+ext[0].toLowerCase() != extDoc[l])
							{
							}
						}
					}
				}
				else if(doname == domains_to_track[k] && arr[i].href.toLowerCase().indexOf("mailto:") != -1)
				{
					var gaUri = arr[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
					arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Email Clicks', 'Mail To', '"+gaUri+"');");
				}
			}
		}

		/* External Link */
		else if(doname != mainDomain && doname.indexOf(mainDomain) == -1)
		{
			for (var m = 0; m < domains_to_track.length; m++) 
			{
				if(doname.indexOf(domains_to_track[m]) == -1) 
				{
					flag++;
					if(flag == domains_to_track.length)
					{
						if(arr[i].href.toLowerCase().indexOf("mailto:") == -1)
						{
							/* Tracking outbound links off site */
							var gaUri = arr[i].href.split("//");
							arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Outbound Links', 'Click', '"+gaUri[1]+"');");
						}
					}
				}
				else if(doname.indexOf(domains_to_track[m]) != -1 && arr[i].href.toLowerCase().indexOf("mailto:") == -1)
				{
					for(var n = 0; n < extDoc.length; n++) 
					{
						var arExt = arr[i].href.split(".");
						var ext = arExt[arExt.length-1].split(/[#?]/);
						if("."+ext[0].toLowerCase() == extDoc[n]) 
						{
							/* Tracking electronic documents - doc, xls, pdf, exe, zip */
							var intGaUri = arr[i].href.split(doname);
							var gaUri = intGaUri[1].split(extDoc[n]);
							arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Downloads', 'File Download', '"+gaUri[0]+extDoc[n]+"');");
							break;
						}
						else if("."+ext[0].toLowerCase() != extDoc[n])
						{
							flagExt++;
							if(flagExt == extDoc.length)
							{
								/* Auto-Linker */
								/* arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('_link', '"+arr[i].href+"'); return false;"); */
							}
						}
					}
				}

				else if(doname.indexOf(domains_to_track[m]) != -1 && arr[i].href.toLowerCase().indexOf("mailto:") != -1)
				{
					var gaUri = arr[i].href.match(/[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}/);
					arr[i].setAttribute("onclick",""+((tmp != null) ? tmp + '; ' : '')+"ga('send', 'event', 'Email Clicks', 'Mail To', '"+gaUri+"');");
				}
			}
		}
	 }
}

/*================================================================================================================
// Tracking YouTube Videos
//================================================================================================================*/


var tag = document.createElement('script');
tag.src = document.location.protocol + "//www.youtube.com/iframe_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);
var videoArray = new Array();
var playerArray = new Array();
var Settings_HitType = "universal" // This setup can handle classic/gtm/universal

function _sendYouTubeProgressEvent(videoTitle, percentage, hittype) {
    if (hittype == 'classic') {
        _gaq.push(['_trackEvent', 'Videos', '' + percentage + '% Progress', videoTitle, percentage]);
    } else if (hittype == 'universal') {
        ga('send', 'event', 'Videos', + percentage + '% Progress ', videoTitle, percentage);
    } else if (hittype == 'gtm') {
        dataLayer.push({
            'event': 'eventTracker',
            'eventCat': 'Videos',
            'eventAct': '' + percentage + '% Progress',
            'eventLbl': videoTitle,
            'eventVal': percentage
        });
    }
}

// (function(jQuery) {
//     function trackYouTube() {
//         var i = 0;
//         jQuery('iframe').each(function() {
//             var video = jQuery(this);
//             var _thisSrc = this.src;
//             if (IsYouTube(_thisSrc)) {
//                 this.src = YTUrlHandler(_thisSrc);
//                 var youtubeid = youtube_parser(_thisSrc);
//                 videoArray[i] = youtubeid;
//                 this.setAttribute('id', youtubeid);
//                 i++;
//             }

//         });
//     }
//     jQuery(document).ready(function() {
//         trackYouTube();
//     });
// })(jQuery);

function onYouTubeIframeAPIReady() {
    for (var i = 0; i < videoArray.length; i++) {
        playerArray[i] = new YT.Player(videoArray[i], {
            events: {
                'onReady': onPlayerReady,
                'onStateChange': onPlayerStateChange
            }
        });
    }
}




function onPlayerReady(event) {}
cCi = 1;
function onPlayerStateChange(event) {

    var videotitle = event.target.getVideoData().title;
	var played_percentage = 0;
	var vidId =  event.target.getVideoData().video_id;
	var videoIndex = 0;
	for (var o=0; o < videoArray.length; o++)
	{
		if (videoArray[o]==vidId){videoIndex=o;}
		}
	played_percentage  = ((parseInt(playerArray[videoIndex].getCurrentTime()) / parseInt(playerArray[videoIndex].getDuration())) * 100).toFixed();
    if (event.data == YT.PlayerState.PLAYING && played_percentage==0){
        eval("(function() {  " +
            "var flag_" + cCi + "_25 = false;" +
            "var flag_" + cCi + "_50 = false;" +
            "var flag_" + cCi + "_75 = false;" +
            "var flag_" + cCi + "_95 = false;" +
            "function xx" + cCi + "(vindx){ " +
            "var percentage = ((parseInt(playerArray[vindx].getCurrentTime()) / parseInt(playerArray[vindx].getDuration())) * 100).toFixed();" +
            "var videotitle = playerArray[vindx].getVideoData().title; " +
            "if (percentage < 100) { " +
            "if (percentage > 25 && percentage <= 50 && flag_" + cCi + "_25 == false) { _sendYouTubeProgressEvent(videotitle,25,Settings_HitType); flag_" + cCi + "_25=true; }" +
            "if (percentage > 50 && percentage <= 75 && flag_" + cCi + "_50 == false) {_sendYouTubeProgressEvent(videotitle,50,Settings_HitType);flag_" + cCi + "_50=true;}" +
            "if (percentage > 75 && percentage <= 95 && flag_" + cCi + "_75 == false) {_sendYouTubeProgressEvent(videotitle,75,Settings_HitType);flag_" + cCi + "_75=true;}" +
            "if (percentage > 95 && flag_" + cCi + "_95 == false) {_sendYouTubeProgressEvent(videotitle,95,Settings_HitType);flag_" + cCi + "_95=true;}" +
            "}" +
            " }" +
            "setInterval(function(){  xx" + cCi + "("+videoIndex+"); }, parseInt("+playerArray[videoIndex].getDuration()+")/10); " +
            "})();");
        cCi++;
    }




    if (event.data == YT.PlayerState.PLAYING) {
        if (Settings_HitType == 'classic') {
            _gaq.push(['_trackEvent', 'Videos', 'Play', videotitle, 0]);
        } else if (Settings_HitType == 'universal') {
            ga('send', 'event', 'Videos', 'Play', videotitle);
        } else if (Settings_HitType == 'gtm') {
            dataLayer.push({
                'event': 'eventTracker',
                'eventCat': 'Videos',
                'eventAct': 'Play',
                'eventLbl': videotitle,
                'eventVal': 0
            });
        }



    }
    if (event.data == YT.PlayerState.ENDED) {
        if (Settings_HitType == 'classic') {
            _gaq.push(['_trackEvent', 'Videos', 'Watch to End', videotitle, 100]);
        } else if (Settings_HitType == 'universal') {
            ga('send', 'event', 'Videos', 'Watch to End', videotitle, 100);
        } else if (Settings_HitType == 'gtm') {
            dataLayer.push({
                'event': 'eventTracker',
                'eventCat': 'Videos',
                'eventAct': 'Watch to End',
                'eventLbl': videotitle,
                'eventVal': 100
            });
        }
    }
    if (event.data == YT.PlayerState.PAUSED) {
        if (Settings_HitType == 'classic') {
            _gaq.push(['_trackEvent', 'Videos', 'Pause', videotitle, 0]);
        } else if (Settings_HitType == 'universal') {
            ga('send', 'event', 'Videos', 'Pause', videotitle, 0);
        } else if (Settings_HitType == 'gtm') {
            dataLayer.push({
                'event': 'eventTracker',
                'eventCat': 'Videos',
                'eventAct': 'Pause',
                'eventLbl': videotitle,
                'eventVal': 0
            });
        }


    }


}

function youtube_parser(url) {
    var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
    var match = url.match(regExp);
    if (match && match[2].length == 11) {
        return match[2];
    } else {
        //error
    }
}



function IsYouTube(url) {
    var YouTubeLink_regEx = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
    var match = url.match(YouTubeLink_regEx);
    if (match != null && match.length > 0) {
        return true;
    } else {
        return false;
    }
}

function YTUrlHandler(url) {
    url = url.replace(/origin\=(https?:\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})\&?/ig, 'origin=' + document.location.protocol + '//' + document.location.host);

    stAdd = '';
    adFlag = false;
    if (url.indexOf('https') == -1) {
        url = url.replace('http', 'https');
    }
    if (url.indexOf('?') == -1) {
        stAdd = '?flag=1';
    }
    if (url.indexOf('enablejsapi') == -1) {
        stAdd += '&enablejsapi=1';
        adFlag = true;
    }
    if (url.indexOf('origin') == -1) {
        stAdd += '&origin=' + document.location.protocol + '//' + document.location.host;
        adFlag = true;
    }


    if (adFlag == true) {
        return url + stAdd;
    } else {
        return url;
    }

}