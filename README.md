# Dumb Smart Switch

<!-- wp:paragraph -->
<p>Project on <a href="https://github.com/jasontsemf/DumbSmartSwitch">GitHub</a></p>
<!-- /wp:paragraph -->

[SmartDumbSwitch demo on YouTube](http://img.youtube.com/vi/yBsMdon-vKU/0.jpg)

[![SmartDumbSwitch demo on YouTube](http://img.youtube.com/vi/yBsMdon-vKU/0.jpg)](http://www.youtube.com/watch?v=yBsMdon-vKU "SmartDumbSwitch")

[Blog link](https://jason1996429.wordpress.com/2021/02/11/ble-interactions-wk2-dumb-smart-switch/)

<!-- wp:jetpack/slideshow {"ids":[2317,2318,2319,2320,2321,2322],"sizeSlug":"large"} -->
<div class="wp-block-jetpack-slideshow aligncenter" data-effect="slide"><div class="wp-block-jetpack-slideshow_container swiper-container"><ul class="wp-block-jetpack-slideshow_swiper-wrapper swiper-wrapper"><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2317" data-id="2317" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_015906.jpg?w=739"/></figure></li><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2318" data-id="2318" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_015855.jpg?w=739"/></figure></li><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2319" data-id="2319" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_020015.jpg?w=739"/></figure></li><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2320" data-id="2320" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_015933.jpg?w=739"/></figure></li><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2321" data-id="2321" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_015943.jpg?w=739"/></figure></li><li class="wp-block-jetpack-slideshow_slide swiper-slide"><figure><img alt="" class="wp-block-jetpack-slideshow_image wp-image-2322" data-id="2322" src="https://jason1996429.files.wordpress.com/2021/02/img_20210212_015957.jpg?w=739"/></figure></li></ul><a class="wp-block-jetpack-slideshow_button-prev swiper-button-prev swiper-button-white" role="button"></a><a class="wp-block-jetpack-slideshow_button-next swiper-button-next swiper-button-white" role="button"></a><a aria-label="Pause Slideshow" class="wp-block-jetpack-slideshow_button-pause" role="button"></a><div class="wp-block-jetpack-slideshow_pagination swiper-pagination swiper-pagination-white"></div></div></div>
<!-- /wp:jetpack/slideshow -->

<!-- wp:preformatted -->
<pre class="wp-block-preformatted">Disclaimer: This week's project is rather basic.</pre>
<!-- /wp:preformatted -->

<!-- wp:heading {"level":1} -->
<h1>Intro</h1>
<!-- /wp:heading -->

<!-- wp:quote -->
<blockquote class="wp-block-quote"><p>Dumb Smart Switch is a BLE powered switch that enables the user to push any existing (dumb) switch/buttons for your home and appliances in a rather "smart" way. It also has schedule functionality to perform routines.</p></blockquote>
<!-- /wp:quote -->

<!-- wp:paragraph -->
<p>My all time inspiration for my projects is always my tiny little problem in my life, or just some minor frustrations that I have. This is my attempt to solve my problem of "not willing to leave my bed to switch off my light".</p>
<!-- /wp:paragraph -->

<!-- wp:paragraph -->
<p>I live in an apartment and I will be moving out very soon (hopefully). I will never invest in an expensive system of smart home devices as it is expensive an unnecessary. What I need is:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>a simple device that pushes a physical light, to switch off my ceiling light, where the switch is mounted on a wall</li><li>a daily repeating routine that switches off my light, just in case if I fall asleep with my lights on</li><li>a device that is not permanent and fits well into my existing home setting that is not changeable</li></ul>
<!-- /wp:list -->

<!-- wp:heading {"level":1} -->
<h1>Solution</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>So the solution is this Dumb Smart Switch. A servo motor mounted on the wall that drives a pinion gear combo that pushes the light switch on the wall with a bluetooth trigger, or a daily repeating routine.</p>
<!-- /wp:paragraph -->

<!-- wp:heading {"level":1} -->
<h1>Tech Spec</h1>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>The project is put together with</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>Arduino Nano IoT 33<ul><li>the brain for driving the entire project</li><li>takes 5V USB power</li><li>has BLE connectivity for accessing it with my smartphone</li></ul></li><li><a href="https://www.amazon.com/ACROBOTIC-Real-Time-AT24C32-Breakout-Raspberry/dp/B07HWXZZFP/ref=asc_df_B07HWXZZFP/?tag=hyprod-20&amp;linkCode=df0&amp;hvadid=241973970700&amp;hvpos=&amp;hvnetw=g&amp;hvrand=11909124479875763692&amp;hvpone=&amp;hvptwo=&amp;hvqmt=&amp;hvdev=c&amp;hvdvcmdl=&amp;hvlocint=&amp;hvlocphy=9067609&amp;hvtargid=pla-574718114805&amp;psc=1">DS3231</a> Rtc (real time clock)module<ul><li>it keeps and tells time</li></ul></li><li><a href="https://www.adafruit.com/product/169?gclid=Cj0KCQiAyJOBBhDCARIsAJG2h5dvq7mFnts-v3AY0nxejoEeZZMW6g2N18gsuS4jWW6F7LTDEu5TvksaAvr0EALw_wcB">A mini servo</a><ul><li>drives pinion to push the light switch</li></ul></li><li>A custom 3D printed servo mount, gear, and pushed</li></ul>
<!-- /wp:list -->

<!-- wp:paragraph -->
<p>Using a generic BLE app on a smartphone, like LightBlue, I am able to perform</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li>trigger the device to push the switch on the wall</li><li>set hour to perform routine</li><li>set minute to perform routine</li><li>set master switch for the routine</li></ul>
<!-- /wp:list -->

<!-- wp:heading -->
<h2>Electronics</h2>
<!-- /wp:heading -->

<!-- wp:image {"id":2288,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="https://jason1996429.files.wordpress.com/2021/02/dumbsmartswitchbread_bb.png"><img src="https://jason1996429.files.wordpress.com/2021/02/dumbsmartswitchbread_bb.png?w=1024" alt="" class="wp-image-2288"/></a></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2290,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="https://jason1996429.files.wordpress.com/2021/02/dumbsmartswitchbread_schem.png"><img src="https://jason1996429.files.wordpress.com/2021/02/dumbsmartswitchbread_schem.png?w=777" alt="" class="wp-image-2290"/></a></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>3D printing</h2>
<!-- /wp:heading -->

<!-- wp:image {"id":2295,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="https://jason1996429.files.wordpress.com/2021/02/screen-shot-2021-02-11-at-4.51.00-pm.png"><img src="https://jason1996429.files.wordpress.com/2021/02/screen-shot-2021-02-11-at-4.51.00-pm.png?w=1024" alt="" class="wp-image-2295"/></a><figcaption>https://mynyu308.autodesk360.com/g/shares/SH919a0QTf3c32634dcf349a13f1866050e3?viewState=NoIgbgDAdAjCA0IDeAdEAXAngBwKZoC40ARXAZwEsBzAOzXjQEMyzd1C0AjAZgCYBWACbdcMALSCIuACxjpowWMaD%2BnMZwCcjTgDMAHDv46NMDWgC%2BIALpA</figcaption></figure>
<!-- /wp:image -->

<!-- wp:image {"id":2301,"sizeSlug":"large","linkDestination":"media"} -->
<figure class="wp-block-image size-large"><a href="https://jason1996429.files.wordpress.com/2021/02/screen-shot-2021-02-11-at-5.12.57-pm.png"><img src="https://jason1996429.files.wordpress.com/2021/02/screen-shot-2021-02-11-at-5.12.57-pm.png?w=1024" alt="" class="wp-image-2301"/></a><figcaption>pusher and gear from https://www.thingiverse.com/thing:3170748</figcaption></figure>
<!-- /wp:image -->

<!-- wp:heading -->
<h2>Code</h2>
<!-- /wp:heading -->

<!-- wp:paragraph -->
<p>Please refer to the inline comments for more explanation. Code also available on <a href="https://github.com/jasontsemf/DumbSmartSwitch">GitHub</a>. The code is mostly a Frankenstein of:</p>
<!-- /wp:paragraph -->

<!-- wp:list -->
<ul><li><a href="https://github.com/arduino-libraries/ArduinoBLE/tree/master/examples/Peripheral/LED">https://github.com/arduino-libraries/ArduinoBLE/tree/master/examples/Peripheral/LED</a></li><li><a href="https://github.com/adafruit/RTClib/tree/master/examples/ds3231">https://github.com/adafruit/RTClib/tree/master/examples/ds3231</a></li><li><a href="https://github.com/arduino-libraries/Servo/tree/master/examples/Sweep">https://github.com/arduino-libraries/Servo/tree/master/examples/Sweep</a></li></ul>
<!-- /wp:list -->

