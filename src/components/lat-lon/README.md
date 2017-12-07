# Responsibilities

This knows how to display the lat/lon on a Leaflet map.
- It is given an Observable which it subscribes to for obtaining the
values it should be displaying.
- It chooses the number of digits to display (maybe configurable?)
- It can be turned on/off.

Because this control is coupled to Leaflet, it doesn't follow the
Angular way of doing things, but instead, makes direct manipulation
of the DOM.  

The private `setContent()` function implements this interaction
with the DOM.
