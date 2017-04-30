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
V.1.2.5 - MIT license. Allowed for commercial
and personal use =D
*/

//reset the scroll to 0 (top of page)
$(window).on('beforeunload', function() {
  $(window).scrollTop(0);
});

function parallaxImgScroll(settings) {

  //if the user is setting the configuration
  var default_settings = {
    initialOpacity : 0, //from 0 to 1, e.g. 0.34 is a valid value. 0 = transparent, 1 = Opaque
    opacitySpeed : 0.02, //values from 0.01 to 1 -> 0.01: slowly appears on screen; 1: appears as soon as the user scrolls 1px
    pageLoader: false // boolean type
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

    if (parallaxSettings.pageLoader) {
      var loadingMaringTop = $(window).height() / 2
      $("body").wrapInner( "<div class='parallaxImg-page'></div>");
      $("body").css({
        height: '100%',
        width: '100%'
      })
      $("body").prepend("<div class='parallaxImg-loading-page'></div>")
      $(".parallaxImg-loading-page").css({
        position: 'absolute',
        top: '0px',
        left: '0px',
        width: '100%',
        height: '100%',
        background: '#333',
      })
      $(".parallaxImg-loading-page").prepend("<div class='parallaxImg-loading-text'>Loading Page</div>")
      $(".parallaxImg-loading-text").css({
        width: '300px',
        'margin-left': 'auto',
        'margin-right': 'auto',
        'text-align': 'center',
        'padding-top': loadingMaringTop + 'px'
      })

      $(".parallaxImg-page").hide()
    }

  })

  $(window).load(function() {
    $(".parallax-move").css({
      'opacity' : parallaxSettings.initialOpacity
    });

    if (parallaxSettings.pageLoader) {
      $(".parallaxImg-loading-page").fadeOut('600', function() {
        $(".parallaxImg-page").fadeIn()
        $(this).remove()
        parallaxImgInit();
      })
    }
    else {
      parallaxImgInit();
    }

    /* Scroll event to trigger the function */
    $(window).bind('scroll',function(e){
      parallaxImgScroll();
    });

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

          // if the element has a Speed declared
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

          //if the element has a vertical position declared
          if ($(setOfElements[i]).hasData('ps-vertical-position')) {
            TopPosition = $(setOfElements[i]).data('ps-vertical-position');
          }
          else {
            var TopPosition = Math.floor(Math.random() * (heightOfContainer - (heightOfContainer/4)) + 1);
          }

          //if the element has an horizontal position declared
          if ($(setOfElements[i]).hasData('ps-horizontal-position')) {
            var leftPosition = $(setOfElements[i]).data('ps-horizontal-position');
            var rightPosition = undefined;
          }
          else if ($(setOfElements[i]).hasData('ps-horizontal-position-right')) {
            var rightPosition = $(setOfElements[i]).data('ps-horizontal-position-right');
            var leftPosition = undefined;
          } else {
            var leftPosition = Math.floor(Math.random() * (widthOfContainer - 100) + 50);
            var rightPosition = undefined;
          }

          //if the element has a z-index declared
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
            "horizontalPagePositionRight" : rightPosition,
            "verticalPagePosition" : TopPosition,
            "opacity" : parallaxSettings.initialOpacity,
            "privateScrolled" : 0
          });

          /* Apply initial position */
          console.log(leftPosition, rightPosition)
          if (leftPosition) {
            $(setOfElements[i]).css({
              "bottom": TopPosition,
              "left": leftPosition,
              "z-index": zPosition
            })
          } else {
            $(setOfElements[i]).css({
              "bottom": TopPosition,
              "right": rightPosition,
              "z-index": zPosition
            })
          }
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

    scrolled = $(window).scrollTop();

    for (i = 0; i < parallaxElementsArray.length; i++) {

      alpha = parallaxElementsArray[i].opacity;

      /* Calculate the distance between the element and the top of the document */
      var distanceFromTop = $(parallaxElementsArray[i].element).offset().top;
      var elementHeight = $(parallaxElementsArray[i].element).height();

      if (isVisible(distanceFromTop, elementHeight)) {

        /* if scrolling down */
        if (lastestScrolled < scrolled) {
          /* unless parallaxSettings.opacitySpeed = 1, make the element appear progressively */
          if (parallaxSettings.initialOpacity != 1) {
            alpha = alpha + parallaxSettings.opacitySpeed;
            if (alpha > 1) {
              alpha = 1;
            }
          } else {
            alpha = parallaxSettings.initialOpacity;
          }
          //save the scrolling for this element
          parallaxElementsArray[i].privateScrolled = parallaxElementsArray[i].privateScrolled + (scrolled - lastestScrolled);
        }
        else if (scrolled == 0) {
          alpha = parallaxSettings.initialOpacity;
          parallaxElementsArray[i].privateScrolled = 0;
        /* else.. if scrolling up */
        }
        else {
          /* unless parallaxSettings.opacitySpeed = 1, make the element appear progressively */
          if (parallaxSettings.initialOpacity != 1) {
            alpha = alpha - parallaxSettings.opacitySpeed;
            if (alpha < parallaxSettings.initialOpacity) {
              alpha = parallaxSettings.initialOpacity;
            }
          } else {
            alpha = parallaxSettings.initialOpacity;
          }
          //save the scrolling for this element
          parallaxElementsArray[i].privateScrolled = parallaxElementsArray[i].privateScrolled - (lastestScrolled - scrolled);
        }

        $(parallaxElementsArray[i].element).css({
          "opacity" : alpha,
          'bottom': (parallaxElementsArray[i].verticalPagePosition + (parallaxElementsArray[i].privateScrolled * parallaxElementsArray[i].scrollSpeed)) + 'px'
          });

        /* save the opacity in the elements object */
        parallaxElementsArray[i].opacity = alpha;
      }
    }
    lastestScrolled = scrolled;

    /* check if the element is visible on screen */
    function isVisible(distance, height) {
      //if it went up and off the screen
      if ([distance + height] < scrolled) {
        return false;
      }
      //if if didnt appear from belog yet
      else if ([scrolled + $(window).height()] < distance) {
        return false;
      }
      //if it is being displayed on screen
      else {
        return true;
      }
    }
  }

}

/* check if a data attribute exists */
$.fn.hasData = function(attrName) {
  return (typeof $(this).data(attrName) != 'undefined');
};
