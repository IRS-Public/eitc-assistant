// 07.20.18

(function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
	(i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
	m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
	})(window,document,'script','//www.google-analytics.com/analytics.js','ga');
	
	ga('create', 'UA-22588183-11', 'auto', {'allowLinker':true});  // Replace with your property ID.
	ga('require', 'linkid', 'linkid.js');
	
	var url = window.location.href;
	var pathname = window.location.pathname;
	var search = window.location.search;
	
	//for meta tag old url
	if (document.getElementsByTagName("meta")['oldUrl'])
		{var dimensionValue = document.getElementsByTagName("meta")['oldUrl'].content;
		ga('set', 'dimension1', dimensionValue);}
		else{
		var dimensionValue = "NULL";
		ga('set', 'dimension1', dimensionValue);}		   
		   
	//end meta tag old url
	//for meta tag new url
	if (document.getElementsByTagName("meta")['newUrl'])
		{var dimensionValue2 = document.getElementsByTagName("meta")['newUrl'].content;
		ga('set', 'dimension2', dimensionValue2);}
		else{
		var dimensionValue2 = "NULL";
		ga('set', 'dimension2', dimensionValue2);}		   
		   
	//end meta tag new url
	//for meta tag OT Unique ID
	if (document.getElementsByTagName("meta")['otID'])
		{var dimensionValue5 = document.getElementsByTagName("meta")['otID'].content;
		ga('set', 'dimension5', dimensionValue5);}
		else{
		var dimensionValue5 = "NULL";
		ga('set', 'dimension5', dimensionValue5);}		   
		   
	//end meta tag OT Unique ID
	//for meta tag Unique ID 
	if (document.getElementsByTagName("meta")['uniqueID'])
		{var dimensionValue6 = document.getElementsByTagName("meta")['uniqueID'].content;
		ga('set', 'dimension6', dimensionValue6);}
		else{
		var dimensionValue6 = "NULL";
		ga('set', 'dimension6', dimensionValue6);}		   
		   
	//end meta tag Unique ID
	
	
	if (url.indexOf("-search?") > -1) {
	  if (document.getElementById("noresults")) {
		var search_url_path = pathname + search + "&result=nosearchresults";
		ga('send', 'pageview', search_url_path);
	  }
	  else if (document.getElementsByClassName("view-content")) {
		var search_url_path = pathname + search + "&result=searchresults";
		ga('send', 'pageview', search_url_path);
	  }
	  //extra layer to validate "no results"
	  else {
		var search_url_path = pathname + search + "&result=nosearchresults";
		ga('send', 'pageview', search_url_path);
	  }
	}
	else if (url.indexOf('free-file-fillable') > -1) {
	  ga('send', 'pageview', pathname + search);
	}
	else {
	  ga('send', 'pageview');
	}