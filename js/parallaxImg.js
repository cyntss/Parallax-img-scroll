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

/* Initial setup of the elements */
function initialSetup() {
  $(".parallax-img-container").each(function() {
    var sizeOfContainer = $(this).width();
    var setOfElements = $(this).children();
    for (i = 0; i < setOfElements.length ; i++) {
      var classApplied = $(setOfElements[i]).attr('class'); 
      if (classApplied != "parallax-move") {
        $(setOfElements[i]).css({
          "z-index": 100,
          "position": "relative"
        })
      } else {
        $(setOfElements[i]).css({
          bottom: "-100px",
          "opacity" : 0
        })
        var ranNumSpeed = Math.floor((Math.random() * 25)+1);
        if(ranNumSpeed < 10) {
          var scrollSpeed = "0.0"+ranNumSpeed;  
        } else {
          var scrollSpeed = "0."+ranNumSpeed;
        }
        
        var ranNumPosition = Math.floor(Math.random() * (sizeOfContainer - 200) + 50);
        parallaxElementsArray.push({
          "element": $(setOfElements[i]),
          "scrollSpeed": scrollSpeed,
          "pagePosition": ranNumPosition
        })
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

var alpha = 0;
var lastestScrolled = 0;
var scrolled = 0;

/* Move the images while scrolling the page */
function parallaxImgScroll(){
  scrolled = $(window).scrollTop();
  if (lastestScrolled < scrolled) {
    alpha = alpha + 0.02; 
  } else if (scrolled == 0) {
    alpha = 0;
  } else {
    alpha = alpha - 0.02;
  }
  console.log("last: "+lastestScrolled+ " new: "+scrolled + " alpha: "+alpha)
  
  for (i = 0; i < parallaxElementsArray.length; i++ ) {
    $(parallaxElementsArray[i].element).css({
      'bottom': (1+(scrolled*parallaxElementsArray[i].scrollSpeed))+'em',
      'left': parallaxElementsArray[i].pagePosition,
      "opacity" : alpha
      });
  }
  lastestScrolled = scrolled;
}
