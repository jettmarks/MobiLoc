# Responsibilities

* Provide location-specific markers to place on the Leaflet map.
* Bring in the resources to create those markers.

# Approach

* The JavaScript files which support Leaflet are intended to be 
used across a broad range of browser-based applications.
* Since ionic builds device apps using Type Script, there are a 
few steps required to get the resources in place:
  * image files
  * CSS (actually, SCSS)
  * JavaScript
* There are Stack Overflow posts for bringing in Font Awesome 
  (https://stackoverflow.com/questions/39122669/using-font-awesome-in-ionic-2),
  but that only gets you part way there.
  * SCSS and images for Font Awesome itself is covered.
  * The Leaflet CSS that is supplied with `leaflet.awesome-markers` has
    additional CSS.
* Additional steps:
    * Copy leaflet.awesome-marker's CSS to a SCSS file.
    * Include a line in the `config/sass.config.js` to grab that SCSS.
    * manually copy the images into the build directory.

## Debugging

Looking at the markup and styles that get brought in and placed 
on the map is perhaps the easiest way to tell if the needed 
resources have been applied to the DOM elements.

## Resources
* Font Awesome icon cheatsheet: http://fontawesome.io/cheatsheet/
* Plugin: https://github.com/lvoogdt/Leaflet.awesome-markers
* Approach: https://stackoverflow.com/questions/39122669/using-font-awesome-in-ionic-2
* Not followed, but maybe worthwhile: https://luiscabrera.site/tech/2017/01/09/fontawesome-in-ionic2.html
    
  
