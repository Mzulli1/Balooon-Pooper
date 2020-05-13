
function start(){
  


 var blowing_audio = new Audio("./blow.mp3");
 var popping_audio = new Audio("./pop.mp3");


 $("#startpage").hide();
 $("canvas").show();



 
};

function triggers(data){
  
  
  
   if(data[0].probability > 0.75){
      blowing_audio.play(); //play sound 'oh no!'

  };

};

$(document).ready(function(){
	

	$("canvas2").hide();  	
  	$("canvas").hide();
	$("#start").click(start);
	


  

});