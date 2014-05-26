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

var parallaxElementsArray = [];
var sizeOfContainers = 0

/* Initial setup of the elements */
function initialSetup() {
	$(".parallax-img-container").each(function() {
		sizeOfContainers = sizeOfContainers + $(".parallax-img-container").width();
	  var setOfElements = $(".parallax-img-container").children();
    for (i = 0; i < setOfElements.length ; i++) {
			var classApplied = $(setOfElements[i]).attr('class');	
			if (classApplied != "parallax-move") {
				$(setOfElements[i]).css({
					"z-index": 100,
					"position": "relative"
				})
			} else {
				$(setOfElements[i]).css({
					bottom: "-100px"
				})
				var ranNumSpeed = Math.floor((Math.random() * 20)+1);
				if(ranNumSpeed < 10) {
				  var scrollSpeed = "0.0"+ranNumSpeed;	
				} else {
					var scrollSpeed = "0."+ranNumSpeed;
				}
	  	  
	  	  var ranNumPosition = Math.floor(Math.random() * (sizeOfContainers - 25 + 1)) + 25;
				parallaxElementsArray.push({
					"element": $(setOfElements[i]),
					"scrollSpeed": scrollSpeed,
					"pagePosition": ranNumPosition
				})
				console.log(sizeOfContainers +" x " +scrollSpeed)
			}
		}
	})

	$(".parallax-img-container").css({
		position: "relative",
		overflow: "hidden"
	});
	$(".parallax-move").css({
		position: "absolute",
		"z-index": 1
	});
}

/* Move the images while scrolling the page */
function parallaxImgScroll(){
  var scrolled = $(window).scrollTop();
  for (i = 0; i < parallaxElementsArray.length; i++ ) {
    $(parallaxElementsArray[i].element).css({
    	'bottom': (1+(scrolled*parallaxElementsArray[i].scrollSpeed))+'em',
    	'left': parallaxElementsArray[i].pagePosition
    	});
  }
}
