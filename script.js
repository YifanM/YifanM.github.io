var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
var d1, d2, curYear, curMonth, curDay, curHour, curMinute;
var weather_high, weather_low, weather_condition;
var weather_high2, weather_low2, weather_condition2;
var stocksFB, stocksGOOG, stocksAPPL, stocksTWTR;

function GetClock(){
	d1=new Date();
	curmonth=d1.getMonth(),curday=d1.getDate(),curyear=d1.getYear();
	if(curyear<1000) curyear+=1900;
	var curhour=d1.getHours(),curminute=d1.getMinutes();
	if(curminute<=9) curminute="0"+curminute;
	if (d2.getMinutes() != curminute ){
		if (document.getElementById("clock_newTime").style.opacity == 0){
		document.getElementById('clock_newTime').innerHTML= curhour+":"+curminute+"";
		document.getElementById("clock_newTime").style.opacity=1;
		document.getElementById("clock_time").style.opacity=0; 
		document.getElementById("clock_newTime").style.webkitAnimationName = "clockUpdateT";
		document.getElementById("clock_newTime").style.top = "18px";
		document.getElementById("clock_time").style.top = "35px";
	}
	else {
		document.getElementById('clock_time').innerHTML= curhour+":"+curminute+"";
		document.getElementById("clock_newTime").style.opacity=0; 
		document.getElementById("clock_time").style.opacity=1;
		document.getElementById("clock_time").style.webkitAnimationName = "clockUpdateT";
		document.getElementById("clock_time").style.top = "18px";
		document.getElementById("clock_newTime").style.top = "35px";
	}
	}
	if (d2.getDate() != curday ){
		if (document.getElementById("clock_newDate").style.opacity == 0){
		document.getElementById('clock_newDate').innerHTML= tmonth[curmonth]+" "+curday+", "+curyear;
		document.getElementById("clock_newDate").style.opacity=1;
		document.getElementById("clock_date").style.opacity=0; 
		document.getElementById("clock_newDate").style.webkitAnimationName = "clockUpdateD";
		document.getElementById("clock_newDate").style.top = "18px";
		document.getElementById("clock_date").style.top = "35px";
	}
		else {
		document.getElementById('clock_date').innerHTML= curhour+":"+curminute+"";
		document.getElementById("clock_newDate").style.opacity=0; 
		document.getElementById("clock_date").style.opacity=1;
		document.getElementById("clock_date").style.webkitAnimationName = "clockUpdateT";
		document.getElementById("clock_date").style.top = "18px";
		document.getElementById("clock_newDate").style.top = "35px";
	}
    }
	d2 = new Date(d1)
}

function getInitialClock(){
d1=new Date();
	curmonth=d1.getMonth(),curday=d1.getDate(),curyear=d1.getYear();
	if(curyear<1000) curyear+=1900;
	var curhour=d1.getHours(),curminute=d1.getMinutes();
	if(curminute<=9) curminute="0"+curminute;
	document.getElementById('clock_date').innerHTML= tmonth[curmonth]+" "+curday+", "+curyear; 
	document.getElementById("clock_time").innerHTML= +curhour+":"+curminute+"";
	document.getElementById("place").innerHTML = "Waterloo, ON "+curhour+":"+curminute;
}

function getActive(){
		if (jQuery("body").is("#home_page")){ 
		jQuery(home_tab).addClass("active");
	}
	else if (jQuery("body").is("#me_page")){
		jQuery(me_tab).addClass("active");
	}
	else if (jQuery("body").is("#documents_page")){
		jQuery(documents_tab).addClass("active");
	}
	else if (jQuery("body").is("#uwaterloo_page")){
		jQuery(uwaterloo_tab).addClass("active");
	}
	else if (jQuery("body").is("#projects_page")){
		jQuery(projects_tab).addClass("active");
	}
}
/*
function setIcon(weather){
  	if (d1.GetHours() < 7 || d1.GetHours() > 21) { 
  }
    else {
    	document.getElementById("weatherIcon").src = "/weathericons/cloudy.svg"
    } 
  }
*/
window.onload=function(){
	d2 = new Date();
	getActive();
	getInitialClock();
	document.getElementById("weather").innerHTML = weather_high + " " + String.fromCharCode(176) + "C" + "<br>" + weather_low; 
	document.getElementById("weatherCondition").innerHTML = weather_condition;
	//document.getElementById("stock_area").innerHTML = "GOOG " + stocksGOOG + " APPL " + stocksAPPL + " FB " + stocksFB + " TWTR " + stocksTWTR;
	//document.getElementById("weatherNext").innerHTML = weather_high2 + " " + String.fromCharCode(176) + "C" + "<br>" + weather_low2; 
	//document.getElementById("weatherConditionNext").innerHTML = weather_condition2;
	//setIcon(weather_condition);
	document.body.style.opacity=1;
	document.getElementById("clock_newDate").style.opacity=0;
	document.getElementById("clock_newTime").style.opacity=0;	
	GetClock();
	setInterval(GetClock,1000);
}

var weatherFunction = function(data) {
    weather_high = data.query.results.channel.item.forecast[0].high;
    weather_low = data.query.results.channel.item.forecast[0].low;
    weather_condition = data.query.results.channel.item.forecast[1].text;
    weather_high2 = data.query.results.channel.item.forecast[1].high;
    weather_low2 = data.query.results.channel.item.forecast[1].low;
    weather_condition2 = data.query.results.channel.item.forecast[1].text;
  };


/* don't forget the JSON object paths need to be updated, if quandl doesn't fix the api problem, ill have to add a button or make it update at a certain time by itself ...
   well, i guess im  trying again tomorrow 
jQuery.get("https://www.quandl.com/api/v3/datasets/WIKI/FB/FB.json?row=1?api_key=rzH6xM9oAF1phUUPKxoo", function(data){
	stocksFB = data.query.results.quote.Open;
});

jQuery.get("https://www.quandl.com/api/v3/datasets/WIKI/FB/GOOG.json?row=1?api_key=rzH6xM9oAF1phUUPKxoo", function(data){
	stocksGOOG = data.query.results.quote.Open;
});

jQuery.get("https://www.quandl.com/api/v3/datasets/WIKI/FB/APPL.json?row=1?api_key=rzH6xM9oAF1phUUPKxoo", function(data){
	stocksAPPL = data.query.results.quote.Open;
});

jQuery.get("https://www.quandl.com/api/v3/datasets/WIKI/FB/TWTR.json?row=1?api_key=rzH6xM9oAF1phUUPKxoo", function(data){
	stocksTWTR = data.query.results.quote.Open;
});
*/

jQuery(document).ready(function() {
	jQuery('.main_tabs .tabs a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		jQuery('.main_tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
		jQuery(this).parent("li").addClass('active').siblings().removeClass('active');
	e.preventDefault();
	switch(this.parentNode.id){
		case "home_tab":
		window.location.href = "index.html";
		break;
		case "me_tab":
		window.location.href = "me.html";
		break;
		case "documents_tab":
		window.location.href = "documents.html";
		break;
		case "uwaterloo_tab":
		window.location.href = "uwaterloo.html";
		break;
		case "projects_tab":
		window.location.href = "projects.html";
		break;
	}
});
});
