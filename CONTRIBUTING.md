
This app is based on a starter template for [Ionic](http://ionicframework.com/docs/) projects, and includes the following libraries and technologies:
* Ionic Cordova
* Angular for Single Page App framework
* TypeScript
* Sassy CSS (SASS) for styling
* REST API to backend
* Leaflet library for maps
* Test Driven Development (TDD) using Jasmine and Karma
* Rapid development using Webpack
* Multiple Native Plugins for accessing device hardware:
  * Geolocation
  * Compass Heading
  * Camera

Version info for each component is maintained within the repo itself.

# Building and Running
## Prerequisites
* npm 3.x+ 
* node.js 4.x+

## Serving the App as a webapp (Development)

```bash
$ git clone <this repo> MobiLoc
$ cd MobiLoc
$ sudo npm install -g ionic cordova
$ ionic cordova platform add android ios
$ ionic serve
```

A new tab within your default browser will open to `localhost:8100`

## Deploying to a Device (Development)

Connect your device in debug mode via USB cable.

```bash
$ ionic cordova run <android|ios> --device
```

Choose either android or ios depending on the device you're deploying to.

## Publishing
Not yet ready for release, but expected to follow Ionic's recommendations.

# Contributing Code
* Using GitHub as git repo.  
  * Clone a local copy for your branches.
  * Pull Requests
* Issue Tracking is [You Track](https://youtrack.clueride.com/) instead of GitHub's issue tracking.


# Conventions
link in 
* semantic versioning (once this is released)
* "Check Style" rules for Code
* Documentation
* Jasmine tests
* File Naming

## Testing Tools
AngularJS provides a TestBed component described here:
* https://www.joshmorony.com/how-to-unit-test-an-ionic-2-application/

# Addressing CORS 
Over the course of development, the application accesses APIs across
different domains.


