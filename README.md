Parallax-img-scroll
===================
IMPORTANT: The use of Parallax-img-scroll is free for both personal and commmercial use.

DEMO: <a href="http://cyntss.github.io/Parallax-img-scroll/" target="_blank"> Parallax Image Scroll</a>

Other pages using it:
<a href="http://trivialine.herokuapp.com/" target="_blank">TriviaLine</a>

<h3>Whats new in version 1.2.5</h3>
* Page reload fix. Scroll to top on page load.
* Page Loader added: adds a "Loading Page" which fades out after all images have been loaded. Simply set "pageLoader: true" in your configuration.

<h2>Installing</h2>
<ul>
<li>
  Download <strong>parallaxImg.js</strong> from <a href="https://github.com/cyntss/Parallax-img-scroll/blob/master/demo/js/parallaxImg.js" target="_blank">here</a></li>
<li>
  Add it to your &lt;head&gt; like: <br/>
  <pre>&lt;script src="js/parallaxImg.js" type="text/javascript"&gt;&lt;/script&gt;</pre>
</li>
<li>
  Call Parallax Image Scroll on Document Ready <br/>
  <pre> 
    $(document).on("ready", function() {
      parallaxImgScroll();
    }); 
  </pre>
</li>
<li>
  In your HTML wrap you only need to add the class <strong>parallax-img-container</strong> to the wraper containing the information itself (e.g. it can have a video, images, text, etc. every element that will remain static) and the floating elements you want to give life when scrolling your site.<br/>
  To make the elements in this container move, you only need to add the class <strong>parallax-move</strong> to them. You can make any kind of element move: images, divs, titles, etc. etc.
  <h3>Example</h3>
  <pre>
    &lt;div class="parallax-img-container"&gt;
      &lt;h1&gt;The day Internet was the future&lt;/h1&gt;
      &lt;p&gt;Some static text that will not move&lt;/p&gt;
      
      &lt;!-- here I put the elements that will move.. they dont 
      have to necessarily be at the bottom of the container --&gt;
      
      &lt;img class="parallax-move"src="01.png" /&gt;
      &lt;div class="parallax-move"&gt;something here&lt;/div&gt;
      &lt;p class="parallax-move"&gt;text that will move&lt;/p&gt;
    &lt;/div&gt;
  </pre>
  <h4>Important!</h4>
   <ul>
     <li>The container with class="parallax-img-container" can have multiple classes.</li>
     <li>There must be a parent container with a fixed height in order for you to be able to whether give the fixed position to your floating elements, or for Parallax-img-scroll to give a random position inside the container.</li>
   </ul>
</li>
</ul>
<h2>Options</h2>
<ul>
<li>
<h3>Global Parameters</h3>
When initiating Parallax-img-scroll you can pass an object with two parameters as stated below:
<pre>
  $(document).on("ready", function() {
    var parallaxSettings = { 
      initialOpacity: 1, //from 0 to 1, e.g. 0.34 is a valid value. 0 = transparent, 1 = Opaque
      opacitySpeed: 0.1, //values from 0.01 to 1 -> 0.01: slowly appears on screen; 1: appears as soon as the user scrolls 1px
      pageLoader: true //creates a page loader. It is set "false" by default.
    };

    parallaxImgScroll(parallaxSettings);
  });
</pre>
<h4>initialOpacity</h4>
Is the initial opacity for all the elements with class="parallax-move".
Can have a decimal value from 0 to 1 (e.g.: 0, 0.4, 0.9, etc), where 0 means the elements will start transparent and 1 meaning they will appear opaque on screen.

<h4>opacitySpeed</h4>
Is the speed in which the element will become opaque as the user scrolls down your page.
Can have a decimal value from 0.01 to 1, where 0.01 means it will veryyyy slowly appear on screen, and 1 means it will become opaque as soon as the user touches the scroll of the mouse ;).
ATTENTION: 0 is also a valid value, but it means the elements WONT become visible...ever.

<h4>pageLoader</h4>
This option of type Boolean (true/false) will add a "loading page" div while the page is being loaded. The div will disappear once all the images and elements have been loaded and your page will fade into the screen.
It is set to False by default by I recommend you setting it as True when you initialize ParallaxImgScroll as it will avoid the user from seing any imperfection of the screen being rendered para Parallax.

</li>
<li>
<h3>Individual Parameters</h3>
Calling ParallaxImgScroll will assing random positions to the elements containing the class "parallax-move" as well as random scrolling speed.
This is very useful if you have a design where you need stars, lights, bugs, etc. appearing randomly on the container (with class="parallax-img-container").
However, in most of the cases you may need to set a fixed initial position for your elements. For that, you can play with the role attribute as stated in the following lines:
<ul>
<li>data-ps-z-index: will set the position of the element as a layer. For example, in the <a href="http://cyntss.github.io/Parallax-img-scroll/">demo</a> you can see when you scroll down and see the people appearing, they have been distributed in layers so then one is on top of the other to create this sort of 3D effect that Parallax defines.<br>In order to do so you can give a value of 1 to the element that goes below, then "2" to the element that goes on top of this and "3" to the next element, etc.</li>
<li>data-ps-speed: This attribute will set the scrolling speed. The value here starts from 0.01 as a veryyyyy slow movement on scroll down, and a number 10 is a very fast element passing by when the user scrolls. (give it a try until you find the speed you need for each of your elements)
</li>
<li>data-ps-vertical-position: This is where you can set up the initial Vertical position. Please notice that this vertical position will add the property "bottom: xxx" to your element at the beginning, and then of course update it every time the user scrolls down/up calculating the speed you have declared (or the random one assigned if you didnt declare one). Therefor, if you set a value like <strong>data-ps-vertical-position="100"</strong> it means the element will start 100px from the bottom of the container, that means, it will have a CSS property of <strong>bottom: 100px;</strong>
</li>
<li>
data-ps-horizontal-position: This is where you set up the horizontal position (yes, the name says it). In this case the behaviour is similar to the one stated above but the property added in this case in CSS is <strong>Left</strong>, which means if you declare this attribute for your element as <strong>data-ps-horizontal-position="50"</strong> this will have a distance of 50px between the left side of the window and the actual element.
</li>
<h4>An example:</h4>
<pre>&lt;div src='img/assassins/smoke-01.png' class='parallax-move' data-ps-z-index="1" data-ps-speed="1" data-ps-vertical-position="700" data-ps-horizontal-position="420"&gt;&lt;/div&gt;</pre>
In this case you can see this image is the lowest one in the layer <strong>data-ps-z-index="1"</strong>, it has a scrolling speed of 1 <strong> data-ps-speed="1"</strong>, and it has a vertical position of 700px from the bottom and 420px from the left side of the window <strong>data-ps-vertical-position="700" data-ps-horizontal-position="420"</strong>
</ul>
</li>
<h2>Dependencies:</h2>
Make sure to previously include the JQuery script:
http://jquery.com/download/

To get a better behaviour of your scroll I recommend also adding "jquery.nicescroll.min.js" which will give your page an smooth scrolling like mobiles and ipads/tablets have.
(more info: http://nicescroll.areaaperta.com/).

For more information do not hesitate contacting me on twitter as @cyntss

Licensed under the MIT License, http://www.opensource.org/licenses/mit-license.php
