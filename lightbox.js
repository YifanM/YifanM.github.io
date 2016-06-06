var images = new Array ("indesign-pdfs/rsz_munth_book_2.jpg", "indesign-pdfs/poster only-page-001.jpg", "indesign-pdfs/movember 3-page-001.jpg", "indesign-pdfs/plato handout.jpg", "indesign-pdfs/handout phil-page-001.jpg");
var counter = 0;

jQuery(document).ready(function(){
	jQuery(".lightboxEvent").click(function(e){
		e.preventDefault();
		jQuery("#lightbox").children("img")[0].src = jQuery(this).children("img")[0].src;
		jQuery("#lightbox").show();
	});
	jQuery("#chevRight").click(function(e){
		if (counter == 4) counter = -1;
		jQuery(".lightboxEvent").children("img")[0].src = images[++counter]; 
	});
	jQuery("#chevLeft").click(function(e){
		if (counter == 0) counter = 5;
		jQuery(".lightboxEvent").children("img")[0].src = images[--counter];
	});
	jQuery("#lightbox").click(function(e){
		jQuery("#lightbox").hide();
	});
});