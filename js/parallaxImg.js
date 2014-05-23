/* Parallax Images Scroll - by
╱╱╱╱╱╱╱╱╱╱╭╮╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮
╱╱╱╱╱╱╱╱╱╭╯╰┫┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃
╭━━┳╮╱╭┳━╋╮╭┫╰━┳┳━━╮╭━━┳━━┳━╮╭━━┫╰━┳━━┳━━━╮
┃╭━┫┃╱┃┃╭╮┫┃┃╭╮┣┫╭╮┃┃━━┫╭╮┃╭╮┫╭━┫╭╮┃┃━╋━━┃┃
┃╰━┫╰━╯┃┃┃┃╰┫┃┃┃┃╭╮┃┣━━┃╭╮┃┃┃┃╰━┫┃┃┃┃━┫┃━━┫
╰━━┻━╮╭┻╯╰┻━┻╯╰┻┻╯╰╯╰━━┻╯╰┻╯╰┻━━┻╯╰┻━━┻━━━╯
╱╱╱╭━╯┃///////////////////
╱╱╱╰━━╯http://cynt.co.nf/
////////////////////////
*/

$(document).ready(function() {
	initialSetup();
  /* Scroll event to trigger the function */
  $(window).bind('scroll',function(e){
    parallaxImgScroll(); 
  });
});

/* Initial setup of the elements */
function initialSetup() {
	var sizeOfContainer = $(".parallax-img-container").height();
	var setOfElements = $(".parallax-img-container").children();
  var saveElements = [];

	for (i = 0; i < setOfElements.length ; i++) {
		var classApplied = $(setOfElements[i]).attr('class');	
		if (classApplied != "parallax-move") {
			$(setOfElements[i]).css({
				"z-index": 100
			})
			saveElements.push($(setOfElements[i]));
		}
	}
	if (saveElements.length > 0) {
		console.log("tiene mas de 0")
	}
	$(".parallax-img-container").css({
		position: "relative",
		overflow: "hidden"
	});
	$(".parallax-move").css({
		position: "absolute",
		"z-index": 1
	});

	$('#parallax-img-1').css({
		bottom: "0px",
		left: "180px"
	})
}

/* Move the images while scrolling the page */
function parallaxImgScroll(){
  var scrolled = $(window).scrollTop();
  var childrenArray = $(".parallax-move").children();
  for (i=0; i < childrenArray.length; i++) {
    var some = childrenArray[i];
  }
  


  $('#parallax-img-1').css('bottom',(1+(scrolled*0.09))+'rem');
  $('#parallax-img-2').css('bottom',(1+(scrolled*0.15))+'rem');
  $('#parallax-img-3').css('bottom',(1+(scrolled*0.12))+'rem');
  $('#parallax-img-4').css('bottom',(1+(scrolled*0.06))+'rem');

}
