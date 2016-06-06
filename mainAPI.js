jQuery(document).ready(function(){

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/FB.json?rows=1&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("fb").innerHTML = "FB " + data1.dataset.data[0][1];
});

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/GOOG.json?rows=1&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("goog").innerHTML = "GOOG " + data1.dataset.data[0][1];
});

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/AAPL.json?rows=1&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("aapl").innerHTML = "AAPL " + data1.dataset.data[0][1];
}); 

jQuery.getJSON("https://www.quandl.com/api/v3/datasets/WIKI/TWTR.json?rows=1&api_key=rzH6xM9oAF1phUUPKxoo", function(data1){
	document.getElementById("twtr").innerHTML = "TWTR " + data1.dataset.data[0][1];
});

});