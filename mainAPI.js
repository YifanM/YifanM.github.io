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

$('#bookForm').submit(function(event){
	event.preventDefault();
	$.getJSON(("https://www.googleapis.com/books/v1/volumes?q="+$('#bookKeywords').val().replace(" ", "+")+"?key=AIzaSyDivKjpnLNRiR9pQnE8ToLAGEb-XhyiQEk"), function(data1){
		document.getElementById("bookResults").innerHTML = "Hits: " + data1.totalItems;
		for (var i=0; i<data1.totalItems; i++){
			if (data1.items[i].accessInfo.embeddable&&data1.items[i].volumeInfo.industryIdentifiers.length>1){
			var newElement = document.createElement('a');
			newElement.setAttribute('href', "#");
			newElement.setAttribute('class', "bookLink");
			$(newElement).data("ISBN", data1.items[i].volumeInfo.industryIdentifiers[0].identifier);
			newElement.appendChild(document.createTextNode(data1.items[i].volumeInfo.title + ", " + data1.items[i].volumeInfo.authors[0]));
		}
		else{
			var newElement = document.createElement('div');
			$(newElement).data("ISBN", data1.items[i].volumeInfo.industryIdentifiers[0].identifier);
			newElement.appendChild(document.createTextNode(data1.items[i].volumeInfo.title + ", " + data1.items[i].volumeInfo.authors[0]));
		}
			document.getElementById("bookResults").appendChild(newElement);
			var smallElement = document.createElement("small");
			smallElement.appendChild(document.createTextNode(data1.items[i].volumeInfo.description));
			document.getElementById("bookResults").appendChild(smallElement);
		}
	});
});

$('#closeBookButton').click(function(event){
	event.preventDefault();
	//document.getElementById("viewerCanvas").style.boxShadow="0px 0px 0px black";
    document.getElementById("viewerCanvas").style.display = 'none';
})

google.books.load();


$(document).on('click', ".bookLink", function(e){
	//window.alert($(this).text($('a')).data('ISBN'));
      document.getElementById("viewerCanvas").style.display="block";
        var viewer = new google.books.DefaultViewer(document.getElementById('viewerCanvas'));
        viewer.load('ISBN:' + $(this).data('ISBN'));
      //window.alert("doesn't work right now, what should happen is that preview you see already loaded, but for your book and in a modal");
       	var height = $('body').height();
    if (height > $('#sidebar').height()){
    $('#sidebar').height(height);
}
      e.preventDefault();
});

$('#inputCurrency').on('input', function(e){
	//window.alert($(this).val());
	e.preventDefault();
	if ($.isNumeric($(this).val())){
		$.getJSON(('http://api.fixer.io/latest?base='+$('#currencyInputType').val()), function(data1){
			var allRates = data1.rates; 
			//document.getElementById('resultCurrency').innerHTML = (Number($(this).val())*Number(allRates.$('#currencyOutputType').val()).toString());
			document.getElementById('resultCurrency').innerHTML = "not rdy yet";
		});
	}
	else {
		document.getElementById('resultCurrency').innerHTML = "Andrew Morton's hair (input was NAN)"
	}
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