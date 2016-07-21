jQuery(document).ready(function(){

		startMap();

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/FB.json?rows=2&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("fb").innerHTML = "FB | " + data1.dataset.data[0][1] + " | ";
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[2].innerHTML= myRound((data1.dataset.data[0][1]-data1.dataset.data[1][1]), 2).toString();
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[2].style.color = colourchange(data1.dataset.data[0][1], data1.dataset.data[1][1]);
});

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/GOOG.json?rows=2&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("goog").innerHTML = "GOOG | " + data1.dataset.data[0][1] + " | ";
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[0].innerHTML= myRound((data1.dataset.data[0][1]-data1.dataset.data[1][1]), 2).toString();
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[0].style.color = colourchange(data1.dataset.data[0][1], data1.dataset.data[1][1]);
});

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?rows=2&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("aapl").innerHTML = "AAPL | " + data1.dataset.data[0][1] + " | ";
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[1].innerHTML= myRound((data1.dataset.data[0][1]-data1.dataset.data[1][1]), 2).toString();
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[1].style.color = colourchange(data1.dataset.data[0][1], data1.dataset.data[1][1]);
}); 

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/TWTR.json?rows=2&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("twtr").innerHTML = "TWTR | " + data1.dataset.data[0][1] + " | ";
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[3].innerHTML= myRound((data1.dataset.data[0][1]-data1.dataset.data[1][1]), 2).toString();
	document.getElementsByClassName('stock_area')[0].getElementsByTagName('span')[3].style.color = colourchange(data1.dataset.data[0][1], data1.dataset.data[1][1]);
});

$('#bookForm').submit(function(){
	$.getJSON(("https://www.googleapis.com/books/v1/volumes?key=AIzaSyDivKjpnLNRiR9pQnE8ToLAGEb-XhyiQEk?q="+$('#bookKeywords').val().replace(" ", "+")), function(data1){

	});
});

});

function myRound(value, decimals){
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function colourchange(num1, num2){
	if (num1 >= num2) return "#00b300";
	else return "#ff0000";
}

function startMap(){
	var coord = {lat: 43.47, lng: -80.5449};
	var infoWindow = new google.maps.InfoWindow({
		content:"This is the University of Waterloo."
	});
	var mapProp = {
		center:coord,
		zoom:15,
		mapTypeId:google.maps.MapTypeId.ROADMAP,
		panControl:true,
		scaleControl:true,
		rotateControl:true
	};
	var map = new google.maps.Map(document.getElementById("map"), mapProp);
	var marker = new google.maps.Marker({
		position:coord,
		animation:google.maps.Animation.DROP
	});
	marker.setMap(map);
	google.maps.event.addListener(marker, 'click', function(){
		map.setZoom(15);
		map.setCenter(coord);
		infoWindow.open(map, marker);
	});
}