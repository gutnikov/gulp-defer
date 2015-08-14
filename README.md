# gulp-defer 
>Moves render blocking javascript and css into a deferred loading section. 

>It is likely to be helpful if you get "Eliminate render-blocking JavaScript and CSS in above-the-fold content" warning from PageSpeed Insights results

>See https://varvy.com/pagespeed/defer-loading-javascript.html for more information on how to address this warning


## Installation
```shell
npm install gulp-defer
```
## Usage
Example `gulp` task:
```javascript

var gulp  = require("gulp"),
   defer = require("gulp-defer");

gulp.task('html:release', function() {
  return gulp.src(conf.tmp_dir + '/*.html')
   .pipe($.usemin({
      css: [ 
         $.minifyCss(), 
         'concat', 
         $.rev() 
      ],
    	js: [
    	   $.uglify(),
    	   $.rev() 
      ]
   }))
   .pipe(defer())
   .pipe(gulp.dest(conf.dist_dir));
});

```

## Blocks

Blocks are expressed as:

```html
<!--defer-->
<script src="js/app.js"></script>
<script src="js/controllers/thing-controller.js"></script>
<script src="js/models/thing-model.js"></script>
<script src="js/views/thing-view.js"></script>
<!--enddefer-->
```

An example of a page using defer blocks ca be seen below:
```html
<!DOCTYPE HTML>
  <html>
  
  <head>
    <title></title>
    <meta charset="utf-8">
    <!--defer-->
    <link rel="stylesheet" href="css/font.css"/>
    <!--enddefer-->
    <!--defer-->
    <script type="text/javascript" src="js/libs/vendor/jquery.min.js"></script>
    <script type="text/javascript" src="js/libs/vendor/isMobile.min.js"></script>
    <!--enddefer-->
  </head>
  
 <body>
  <div id="content" class="content">
    Loading...
  </div>
</body>
</html>
```

The result after processing with `gulp-defer` will be:

```html
<!DOCTYPE HTML>
  <html>
  
  <head>
  <title></title>
  <meta charset="utf-8">
  

 </head>
 
  <body>
    <div id="content" class="content">
      Loading...
    </div>
    <script type="text/javascript">!function (a, b, c) { "use strict"; var d = function (a) { if ("[object Array]" !== Object.prototype.toString.call(a))return !1; for (var c = 0; c < a.length; c++) {     var d = b.createElement("script"), e = a[c]; d.src = e.src, d.async = e.async, b.body.appendChild(d) } return !0 }; var e = function (a) { if ("[object Array]" !== Object.prototype.toString.call(a))return !1; for (var c = 0; c < a.length; c++) { var d = document.createElement("link"), e = a[c]; d.rel = "stylesheet", d.href = e.href, document.getElementsByTagName("head")[0].appendChild(d); } return !0 }; a.addEventListener ? a.addEventListener("load", function () { d(c.scripts); e(c.styles); }, !1) : a.attachEvent ? a.attachEvent("onload", function () { d(c.scripts); e(c.styles); }) : a.onload     = function () { d(c.scripts); e(c.styles); } }(window, document, {"scripts":[{"src":"js/libs/vendor/jquery.min.js","async":false},{"src":"js/libs/vendor/isMobile.min.js","async":false}],"styles":[{"href":"css/font.css"}]});</script>
  </body>
  </html>
```

## injected script

Contents of injected scrpipt in an above example listed below

```javascript
! function(a, b, c) {
    "use strict";
    var d = function(a) {
        if ("[object Array]" !== Object.prototype.toString.call(a)) return !1;
        for (var c = 0; c < a.length; c++) {
            var d = b.createElement("script"),
                e = a[c];
            d.src = e.src, d.async = e.async, b.body.appendChild(d)
        }
        return !0
    };
    var e = function(a) {
        if ("[object Array]" !== Object.prototype.toString.call(a)) return !1;
        for (var c = 0; c < a.length; c++) {
            var d = document.createElement("link"),
                e = a[c];
            d.rel = "stylesheet", d.href = e.href, document.getElementsByTagName("head")[0].appendChild(d);
        }
        return !0
    };
    a.addEventListener ? a.addEventListener("load", function() {
        d(c.scripts);
        e(c.styles);
    }, !1) : a.attachEvent ? a.attachEvent("onload", function() {
        d(c.scripts);
        e(c.styles);
    }) : a.onload = function() {
        d(c.scripts);
        e(c.styles);
    }
}(window, document, {
    "scripts": [{
        "src": "js/libs/vendor/jquery.min.js",
        "async": false
    }, {
        "src": "js/libs/vendor/isMobile.min.js",
        "async": false
    }],
    "styles": [{
        "href": "css/font.css"
    }]
});
```
