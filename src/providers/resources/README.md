# REST API
_The services in this directory are modeled after the Angular 1.x ngResource for REST APIs within Angular._

Because Angular 2/4 doesn't supply an ngResource, a 3rd-party library is used:
http://ngx-restangular.com/

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
- As mentioned in the post, there is one library appears to fill the need:
https://github.com/troyanskiy/ngx-resource
- However, the features within this library may make it tough to provide the following:
  - Configuration for the handling of JSESSION
  - Interceptors for handling Exception responses from server
- The library ngx-restangular (http://ngx-restangular.com/) appears to meet these needs.

### Including the library in the app
To use the module in the app, the following command was executed:

`npm install ngx-restangular --save`

Then, adding the module to the `app.module.ts`:

under the `imports`:

`RestangularModule.forRoot(<RestangularConfigFactory>)`

where the `RestangularConfigFactory` is an optional factory for the config
information.

## Resource Location
- Providers appear to be the location for any application-wide services.
- The sub-directory/package for REST API resources is being called resources 
as implied by the examples given in the README.md for ngx-resource.

## Handling Authorization
- The back-end is setup to redirect to the login page if the XHR requests 
cannot provide the JSESSION cookie.
- A token-based method may be more robust.  For more details, see 
https://stackoverflow.com/questions/26777083/best-practice-for-rest-token-based-authentication-with-jax-rs-and-jersey
- Further detail under the README.md for login (page).

## Initial set of interfaces and objects

_Modeled after examples in "Starter Guide" for http://ngx-restangular.com/ _

- Created a separate service which is configured inside a 
service.provider file.
- Currently, more than one class is defined in the location.ts file; 
want to break these out.


# Testing
Resources fall under the category of "Services". Along with Pipes, Services are generally
tested in "isolation" instead of part of a TestBed.

I mention Injectors below because I didn't have another place to put these right now.

## Injectors

    const injector = ReflectiveInjector.resolveAndCreate([
      locationTypeServiceProvider
    ]);
    
## Using the Injector

      beforeEach(() => {
        toTest = new LocationTypeService(
          injector.get(LOCATION_TYPE_REST)
        );
      });
