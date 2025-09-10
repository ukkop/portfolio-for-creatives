$(document).ready(function() {
  $('.experiment-image-1').click(function() {
    $('.experiment-image-2').fadeToggle("slow");
    // Alternative animation for example
    // slideToggle("fast");
    $(document).ready(function(){
	$('#navigation-item-1').hover(function(){
  		$('.overlay1').fadeIn(500);
  	},function(){
  		$('.overlay1').fadeOut(500);
  });
	$('#navigation-item-2').hover(function(){
  		$('.overlay2').fadeIn(500);
  	},function(){
  		$('.overlay2').fadeOut(500);
  });
	$('#navigation-item-3').hover(function(){
  		$('.overlay3').fadeIn(500);
  	},function(){
  		$('.overlay3').fadeOut(500);
  });  
  $('#navigation-item-4').hover(function(){
  		$('.overlay3').fadeIn(500);
  	},function(){
  		$('.overlay3').fadeOut(500);
  });  
  $('#navigation-item-5').hover(function(){
  		$('.overlay3').fadeIn(500);
  	},function(){
  		$('.overlay3').fadeOut(500);
  });
  $('#navigation-item-6').hover(function(){
  		$('.overlay3').fadeIn(500);
  	},function(){
  		$('.overlay3').fadeOut(500);
  });  
});

  });
});