var tmonth=new Array("January","February","March","April","May","June","July","August","September","October","November","December");
//var onClick = false;
var lastYear = -1, lastMonth = -1, lastDay = -1, lastHour = -1, lastMinute = -1;

function GetClock(){
	var d=new Date();
	var nmonth=d.getMonth(),ndate=d.getDate(),nyear=d.getYear();
	if(nyear<1000) nyear+=1900;
	var nhour=d.getHours(),nmin=d.getMinutes();
	if(nmin<=9) nmin="0"+nmin;
/*
	if (nyear != lastYear){

	}
	if (nmonth != lastMonth){

	}
	if (nday != lastDay){

	}
	if (nhour != lastHour){

	}
	if (nmin != lastMinute){

	}*/
	/*document.getElementById('clock_date').innerHTML= tmonth[nmonth]+" "+ndate+", "+nyear; 
	document.getElementById("clock_time").innerHTML= +nhour+":"+nmin+"";
	lastYear = nyear;
	lastMonth = nmonth;
	lastDay = nday;
	lastHour = nhour;
	lastMinute = nmin;*/
}

window.onload=function(){
	GetClock();
	setInterval(GetClock,1000);
	//if (onCLick == true){
	if (jQuery("body").is("#home_page")){ //make it so from clicking tab is fade, from other source is instant
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
	//onClick = false;
//}
}


jQuery(document).ready(function() {
	jQuery('.main_tabs .tabs a').on('click', function(e)  {
		var currentAttrValue = jQuery(this).attr('href');
		jQuery('.main_tabs ' + currentAttrValue).fadeIn(400).siblings().hide();
		jQuery(this).parent("li").addClass('active').siblings().removeClass('active');
	//	onClick = true;
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