sites_preview_gallery
=====================

Just for fun project for learning Angular.

Node.js and Angular.js - based gallery for sites previewing

### Server (Express.js)

When new request comes, extract the data from it and runs phantom.js native `rasterize.js` script to make target site's screenshot. Saves the picture to the public folder and sends file path back to the client.

### UI (Angular.js)

Maintaint the UI - simple form for putting target's url. Sends request to the server; when received, appends new item to the `$scope.previews` hash. Previews hash is rendered to the page showing the picture and corresponding URL.
