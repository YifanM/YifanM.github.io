var supportedTranslateLang;
var supportedTranslateDir;

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
		if (data1.items[i].volumeInfo.description){
			//window.alert(1);
			smallElement.appendChild(document.createTextNode(data1.items[i].volumeInfo.description));
		}
		else{
			//window.alert(2);
			smallElement.appendChild(document.createTextNode("Description not available."));
		}
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
		//alert('http://api.fixer.io/latest?base='+$('#currencyInputType').val())
		if ($('#currencyOutputType').val() == $('#currencyInputType').val()){
			document.getElementById('resultCurrency').innerHTML = $('#inputCurrency').val();
		}
		else{
		$.getJSON(('http://api.fixer.io/latest?base='+$('#currencyInputType').val()), function(data1){
			var allRates = data1.rates; 
			var outputRate = $('#currencyOutputType').val();
			document.getElementById('resultCurrency').innerHTML = (Number($('#inputCurrency').val())*Number(allRates[outputRate])).toFixed(2).toString();
		});
	}
	}
	else {
		document.getElementById('resultCurrency').innerHTML = "Andrew Morton's hair (input was NAN)"
	}
});

$('#currencyInputType').change(function(e){
		e.preventDefault();
	if ($.isNumeric($('#inputCurrency').val())){
		//alert('http://api.fixer.io/latest?base='+$('#currencyInputType').val())
		if ($('#currencyOutputType').val() == $('#currencyInputType').val()){
			document.getElementById('resultCurrency').innerHTML = $('#inputCurrency').val();
		}
		else{
		$.getJSON(('http://api.fixer.io/latest?base='+$('#currencyInputType').val()), function(data1){
			var allRates = data1.rates; 
			var outputRate = $('#currencyOutputType').val();
			document.getElementById('resultCurrency').innerHTML = (Number($('#inputCurrency').val())*Number(allRates[outputRate])).toFixed(2).toString();
		});
	}
	}
	else {
		document.getElementById('resultCurrency').innerHTML = "Andrew Morton's hair (input was NAN)"
	}
})

$('#currencyOutputType').change(function(e){
		e.preventDefault();
	if ($.isNumeric($('#inputCurrency').val())){
		//alert('http://api.fixer.io/latest?base='+$('#currencyInputType').val())
		if ($('#currencyOutputType').val() == $('#currencyInputType').val()){
			document.getElementById('resultCurrency').innerHTML = $('#inputCurrency').val();
		}
		else{
		$.getJSON(('http://api.fixer.io/latest?base='+$('#currencyInputType').val()), function(data1){
			var allRates = data1.rates; 
			var outputRate = $('#currencyOutputType').val();
			document.getElementById('resultCurrency').innerHTML = (Number($('#inputCurrency').val())*Number(allRates[outputRate])).toFixed(2).toString();
		});
	}
	}
	else {
		document.getElementById('resultCurrency').innerHTML = "Andrew Morton's hair (input was NaN)"
	}
})

$('#currencyArea').submit(function(){
	return false;
})

$.getJSON('https://translate.yandex.net/api/v1.5/tr.json/getLangs?key=trnsl.1.1.20160721T194149Z.9f33ada0f2796a4d.7b1273bb0e8fa4e32c28e0797d895be73ba3e10a&ui=en', function(data1){
	supportedTranslateLang = data1.langs;
	supportedTranslateDir = data1.dirs;
	var tempKey;
	for (tempKey in data1.langs){ 
		var optionElement = document.createElement('option');
		if(tempKey == 'en'){
			optionElement.setAttribute('selected', 'selected');
		}
		optionElement.setAttribute('value', supportedTranslateLang[tempKey]);
		optionElement.appendChild(document.createTextNode(supportedTranslateLang[tempKey]));
		document.getElementById('languageInputType').appendChild(optionElement);
	}
	for (tempKey in data1.langs){ 
		var optionElement = document.createElement('option');
		if(tempKey == 'fr'){
			optionElement.setAttribute('selected', 'selected');
		}
		optionElement.setAttribute('value', supportedTranslateLang[tempKey]);
		optionElement.appendChild(document.createTextNode(supportedTranslateLang[tempKey]));
		document.getElementById('languageOutputType').appendChild(optionElement);
	}
});


$('#translateButton').click(function(event){
	event.preventDefault();
	var from, to, tempKey;
	for (tempKey in supportedTranslateLang){
		if (supportedTranslateLang[tempKey]==$('#languageInputType').val()){
			from = tempKey;
		}
		if (supportedTranslateLang[tempKey]==$('#languageOutputType').val()){
			to = tempKey;
		}
	}
	//alert(from+ to);
	for (var i = 0; i < supportedTranslateDir.length; i++){
		//alert(tempKey);
		if (supportedTranslateDir[i]==(from+"-"+to)){
			$.getJSON('https://translate.yandex.net/api/v1.5/tr.json/translate?key=trnsl.1.1.20160721T194149Z.9f33ada0f2796a4d.7b1273bb0e8fa4e32c28e0797d895be73ba3e10a&text=' + $('#inputLanguage').val() + "&lang=" + from + "-" + to, function(data1){
				document.getElementById('resultLanguage').innerHTML = data1.text;
			});
			return;
		}
	}
	document.getElementById('resultLanguage').innerHTML = supportedTranslateLang[from] + " to " + supportedTranslateLang[to] + " is not supported :(.";
});

$('#translateArea').keypress(function(event){
	if (event.keyCode == 13){
			event.preventDefault();
		$('#translateButton').trigger('click');
	}
});

$('#defineButton').click(function(event){
	document.getElementById('resultDefinition').innerHTML = "";
	$.ajax({
		url: 'https://wordsapiv1.p.mashape.com/words/'+$('#inputDefinition').val()+'/definitions',
		headers: {"X-Mashape-Key":"ALeEbaVUrImshfRPGSrgi0VsZ9WOp15Vr87jsnOougxYW3TozA", "Accept":"application/json"},
		success : function(result){
			//console.log(result);
			for (var i = 0; i < result.definitions.length; i++){
				//console.log(result.definitions[i]);
				var newElement = document.createElement('p');
				newElement.appendChild(document.createTextNode(result.definitions[i].partOfSpeech + ', ' + result.definitions[i].definition));
				document.getElementById('resultDefinition').appendChild(newElement);
			}
		}
	})
	event.preventDefault();
});

$('#defineArea').keypress(function(event){
	if (event.keyCode == 13){
		event.preventDefault();
		$('#defineButton').trigger('click');
	}
})

$('#thesaurusButton').click(function(event){
	document.getElementById('resultThesaurus').innerHTML = "";
	$.getJSON('https://words.bighugelabs.com/api/2/07cb8c12ca84fb8b9466bc8be0c36096/' + $('#inputThesaurus').val() + '/json', function(data1){
		var temp;
		for (temp in data1){
			var newElement = document.createElement('p');
			newElement.appendChild(document.createTextNode("As a(n) " + temp));
			document.getElementById('resultThesaurus').appendChild(newElement);
			var synElement = document.createElement('p');
			synElement.appendChild(document.createTextNode('Synonyms: '));
			//console.log(data1[temp].syn);
			for (var j = 0; j < data1[temp].syn.length; j++){
			if (j < data1[temp].syn.length-1){
				synElement.appendChild(document.createTextNode(data1[temp].syn[j] + ', '));
			}
			else {
				synElement.appendChild(document.createTextNode(data1[temp].syn[j] + ' '));
			}
			}
			document.getElementById('resultThesaurus').appendChild(synElement);
			var antElement = document.createElement('p');
			antElement.appendChild(document.createTextNode('Antonyms: '));
			if (data1[temp].ant){
			for (var j = 0; j < data1[temp].ant.length; j++){
				if (j < data1[temp].ant.length-1){
				antElement.appendChild(document.createTextNode(data1[temp].ant[j] + ', '));
			}
			else {
				antElement.appendChild(document.createTextNode(data1[temp].ant[j] + ' '));
			}
			}
		}
			document.getElementById('resultThesaurus').appendChild(antElement);
		}
	});
	event.preventDefault();
});

$('#thesaurusArea').keypress(function(event){
	if (event.keyCode==13){
		event.preventDefault();
		$('#thesaurusButton').trigger('click');
	}
})


/*
window.ga=window.ga||function(){(ga.q=ga.q||[]).push(arguments)};ga.l=+new Date;
ga('create', 'UA-XXXXX-Y', 'auto');
ga('send', 'pageview');
*/
});

function myRound(value, decimals){
	return Number(Math.round(value+'e'+decimals)+'e-'+decimals);
}

function colourchange(num1, num2){
	if (num1 > num2) return "#00b300";
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
