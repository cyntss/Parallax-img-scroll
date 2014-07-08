Parallax-img-scroll
===================
IMPORTANT: The use of Parallax-img-scroll is free for both personal and commmercial use.

<h2>Installing</h2>
<ul>
<li>
  Download <strong>parallaxImg.js<strong> from <a href="https://github.com/cyntss/Parallax-img-scroll/blob/master/demo/js/parallaxImg.js" target="_blank">here</a></li>
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
</li>
</ul>

<h2>Dependencies:</h2>
Make sure to previously include the JQuery script:
http://jquery.com/download/

To get a better behaviour of your scroll I recommend also adding "jquery.nicescroll.min.js" which will give your page an smooth scrolling like mobiles and ipads/tablets have.
(more info: http://nicescroll.areaaperta.com/).

For more information do not hesitate contacting me on twitter as @cyntss

Licensed under the MIT License, http://www.opensource.org/licenses/mit-license.php
