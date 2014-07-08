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
V.1.2.0
*/
$(document).ready(function (){
  $(".parallax-move").css({
    'opacity' : 0,
    position: "absolute",
    "z-index": 1
  });
})

$(window).load(function() {
  initialSetup();
  /* Scroll event to trigger the function */
  $(window).bind('scroll',function(e){
    parallaxImgScroll(); 
  });
});

var parallaxElementsArray = [];
var alpha = 0;
var lastestScrolled = 0;
var scrolled = 0;

/* Initial setup of the elements */
function initialSetup() {
  $(".parallax-img-container").each(function() {
    var widthOfContainer = $(this).width();
    var heightOfContainer = $(this).height();
    var setOfElements = $(this).children();
    for (i = 0; i < setOfElements.length ; i++) {
      var classApplied = $(setOfElements[i]).attr('class');
      if (classApplied != "parallax-move") {
        $(setOfElements[i]).css({
          "z-index": 100,
          "position": "relative"
        })
      } else {
        var ranNumSpeed = Math.floor((Math.random() * 100) + 30);
        if(ranNumSpeed < 10) {
          var scrollSpeed = "0.0" + ranNumSpeed;  
        } else {
          var scrollSpeed = "0." + ranNumSpeed;
        }

        if ($(setOfElements[i]).hasData('vertical-position')) {
          ranNumTopPosition = $(setOfElements[i]).data('vertical-position');
        } else {
          var ranNumTopPosition = Math.floor(Math.random() * (heightOfContainer - (heightOfContainer/4)) + 1);  
        }
        
        if ($(setOfElements[i]).hasData('horizontal-position')) {
          var ranNumBottomPosition = $(setOfElements[i]).data('horizontal-position');
        } else {
          var ranNumBottomPosition = Math.floor(Math.random() * (widthOfContainer - 200) + 50);  
        }
        
        parallaxElementsArray.push({
          "element" : $(setOfElements[i]),
          "scrollSpeed" : scrollSpeed,
          "horizontalPagePosition" : ranNumBottomPosition,
          "verticalPagePosition" : ranNumTopPosition,
          "opacity" : alpha
        });

        /* Apply initial position */
        $(setOfElements[i]).css({
          "bottom": ranNumTopPosition,
          "left": ranNumBottomPosition
        })
      }
    }
  })

  $(".parallax-img-container").css({
    position: "relative",
    overflow: "hidden"
  });

}

/* Move the images while scrolling the page */
function parallaxImgScroll(){

  for (i = 0; i < parallaxElementsArray.length; i++) {
    
    scrolled = $(window).scrollTop();
    alpha = parallaxElementsArray[i].opacity;
    /* Calculate the distance between the element and the top of the document */
    var distanceFromTop = $(parallaxElementsArray[i].element).offset().top;

    if (isVisible(distanceFromTop)) {
      /* make the element appear progressively */
      /* if scrolling down */
      if (lastestScrolled < scrolled) {
        alpha = alpha + opacitySpeed;
        if (alpha > 1) {
          alpha = 1;
        }
      } else if (scrolled == 0) {
        alpha = 0;
      /* else.. if scrolling up */
      } else {
        alpha = alpha - opacitySpeed;
        if (alpha < 0) {
          alpha = 0;
        }
      }
      $(parallaxElementsArray[i].element).css({
        'bottom': (parallaxElementsArray[i].verticalPagePosition + (scrolled * parallaxElementsArray[i].scrollSpeed))+'px',
        "opacity" : alpha
        });

      /* save the opacity in the elements object */
      parallaxElementsArray[i].opacity = alpha
    }      
  }
  lastestScrolled = scrolled;

  /* check if the element is visible on screen */
  function isVisible(distance) {
    if (distance < scrolled) {
      return false;
    } else if ([scrolled + $(window).height()] < distance) {
      return false;
    } else {
      return true;
    }
  }

}

/* check if a data attribute exists */
$.fn.hasData = function(attrName) {
  return (typeof $(this).data(attrName) != 'undefined');
};


