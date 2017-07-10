# REST API
_The services in this directory are modeled after the Angular 1.x ngResource for REST APIs within Angular._

Because Angular 2/4 doesn't supply an ngResource, a 3rd-party library is used:
https://github.com/troyanskiy/ngx-resource

# Approach
The first cut at sorting out retrieving asynchronous data from the back-end intends to answer the following questions:

- What libraries support this?
- Where do the resources fall in the source tree?
- How is AUTH handled?
- Define an initial set of interfaces and objects to serve as a pattern
- Test-Driven Development (TDD)

Ticket LE-24 covers the work.

## Library Support
- This Stack Overflow post appears to be on point: https://stackoverflow.com/questions/36840590/angular2-module-similar-to-ngresource-resource
- As mentioned in the post, this library appears to fill the need:
https://github.com/troyanskiy/ngx-resource

### Including the library in the app
To use the module in the app, the following command was executed:

`npm install ngx-resource --save`

Then, adding the module to the `app.module.ts`:

under the `imports`:

` ResourceModule.forRoot()`

## Resource Location
- Providers appear to be the location for any application-wide services.
- The sub-directory/package for REST API resources is being called resources as implied by the examples given in the README.md for ngx-resource.

## Handling Authorization

## Initial set of interfaces and objects
_Modeled after  examples in README.md for the `ngx-resource` module._

- Could use a namespace to avoid name collisions (Location popped out as a collision).

