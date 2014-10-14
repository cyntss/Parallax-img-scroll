/* Parallax Images Scroll - by
╱╱╱╱╱╱╱╱╱╱╭╮╭╮╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╭╮
╱╱╱╱╱╱╱╱╱╭╯╰┫┃╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱╱┃┃
╭━━┳╮╱╭┳━╋╮╭┫╰━┳┳━━╮╭━━┳━━┳━╮╭━━┫╰━┳━━┳━━━╮
┃╭━┫┃╱┃┃╭╮┫┃┃╭╮┣┫╭╮┃┃━━┫╭╮┃╭╮┫╭━┫╭╮┃┃━╋━━┃┃
┃╰━┫╰━╯┃┃┃┃╰┫┃┃┃┃╭╮┃┣━━┃╭╮┃┃┃┃╰━┫┃┃┃┃━┫┃━━┫
╰━━┻━╮╭┻╯╰┻━┻╯╰┻┻╯╰╯╰━━┻╯╰┻╯╰┻━━┻╯╰┻━━┻━━━╯
╱╱╱╭━╯┃/////////////////////////////////////
╱╱╱╰━━╯http://cynt.co.nf////////////////////
http://cyntss.github.io/Parallax-img-scroll/
////////////////////////////////////////////
V.1.2.1 - MIT license. Allowed for commercial
and personal use =D
*/

function parallaxImgScroll(settings) {

  //if the user is setting the configuration
  var default_settings = {
    initialOpacity : 0,
    opacitySpeed : 0.02 //values from 0.01 to 1 -> 0.01: slowly appears on screen; 1: appears as soon as the user scrolls 1px
  }
  var parallaxSettings = $.extend({}, default_settings, settings);

  //definition of essential variables [do not modify]
  var parallaxElementsArray = [];
  var lastestScrolled = 0;
  var scrolled = 0;

  $(document).ready(function (){

    $(".parallax-move").css({
      'opacity' : 0,
      position: "absolute"
    });
  })

  $(window).load(function() {
    $(".parallax-move").css({
      'opacity' : parallaxSettings.initialOpacity
    });
    parallaxImgInit();
    /* Scroll event to trigger the function */
    $(window).bind('scroll',function(e){
      parallaxImgScroll(); 
    });
    $(document).scrollTop(0);
  });

  /* Initial setup of the elements */
  function parallaxImgInit() {

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
        }
        // for all the elements that have the class "parallax-move"
        else {

          // if the element doesnt have a Speed declared
          if ($(setOfElements[i]).hasData('ps-speed')) {
            scrollSpeed = $(setOfElements[i]).data('ps-speed');
          }
          else {
            var ranNumSpeed = Math.floor((Math.random() * 100) + 1);
            if(ranNumSpeed < 10) {
              var scrollSpeed = "0.0" + ranNumSpeed;  
            } 
            else {
              var scrollSpeed = "0." + ranNumSpeed;
            }
          }

          //if the element doesnt have a vertical position declared
          if ($(setOfElements[i]).hasData('ps-vertical-position')) {
            TopPosition = $(setOfElements[i]).data('ps-vertical-position');
          } 
          else {
            var TopPosition = Math.floor(Math.random() * (heightOfContainer - (heightOfContainer/4)) + 1);  
          }

          //if the element doesnt have am horizontal position declared
          if ($(setOfElements[i]).hasData('ps-horizontal-position')) {
            var leftPosition = $(setOfElements[i]).data('ps-horizontal-position');
          }
          else {
            var leftPosition = Math.floor(Math.random() * (widthOfContainer - 200) + 50);  
          }

          //if the element doesnt have a z-index declared
          if ($(setOfElements[i]).hasData('ps-z-index')) {
            var zPosition = $(setOfElements[i]).data('ps-z-index');
          }
          else {
            var zPosition = Math.floor(Math.random() * 10 + 1);  
          }
          
          parallaxElementsArray.push({
            "element" : $(setOfElements[i]),
            "scrollSpeed" : scrollSpeed,
            "horizontalPagePosition" : leftPosition,
            "verticalPagePosition" : TopPosition,
            "opacity" : parallaxSettings.initialOpacity
          });

          /* Apply initial position */
          $(setOfElements[i]).css({
            "bottom": TopPosition,
            "left": leftPosition,
            "z-index": zPosition
          })
        }
      }
    });

    $(".parallax-img-container").css({
      position: "relative",
      overflow: "hidden"
    });

  }

  /* Move the images while scrolling the page */
  function parallaxImgScroll() {

    for (i = 0; i < parallaxElementsArray.length; i++) {
      
      scrolled = $(window).scrollTop();
      alpha = parallaxElementsArray[i].opacity;

      /* Calculate the distance between the element and the top of the document */
      var distanceFromTop = $(parallaxElementsArray[i].element).offset().top;

      if (parallaxElementsArray[0]) {
        console.log(scrolled, alpha, distanceFromTop, isVisible(distanceFromTop), scrolled * parallaxElementsArray[i].scrollSpeed)
      }

      if (isVisible(distanceFromTop) || !isVisible(distanceFromTop) ) {
        /* unless parallaxSettings.opacitySpeed = 1, make the element appear progressively */
        if (parallaxSettings.initialOpacity != 1) {
          /* if scrolling down */
          if (lastestScrolled < scrolled) {
            alpha = alpha + parallaxSettings.opacitySpeed;
            if (alpha > 1) {
              alpha = 1;
            }
          } else if (scrolled == 0) {
            alpha = parallaxSettings.initialOpacity;
          /* else.. if scrolling up */
          } else {
            alpha = alpha - parallaxSettings.opacitySpeed;
            if (alpha < parallaxSettings.initialOpacity) {
              alpha = parallaxSettings.initialOpacity;
            }
          }
        } else {
          alpha = parallaxSettings.initialOpacity;
        }
        $(parallaxElementsArray[i].element).css({
          'bottom': (parallaxElementsArray[i].verticalPagePosition + (scrolled * parallaxElementsArray[i].scrollSpeed))+'px',
          "opacity" : alpha
          });

        /* save the opacity in the elements object */
        parallaxElementsArray[i].opacity = alpha;
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

}

/* check if a data attribute exists */
$.fn.hasData = function(attrName) {
  return (typeof $(this).data(attrName) != 'undefined');
};

