# Scout24FrontendApp

Angular CLI: 11.2.2\
Node: 14.16.0\
NPM: 7.13.0

Angular: 11.2.3/
... animations, common, compiler, compiler-cli, core, forms\
... language-service, localize, platform-browser\
... platform-browser-dynamic, router\
Ivy Workspace: Yes

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build --base-href /scout-ui/` to build the project. The build artifacts will be stored in the `dist/` directory.
The created artifacts can be hosted using any web server module.

## Running unit tests

Run `npm run test:pipeline` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `npm run e2e:cypress` to execute the end-to-end tests via Cypress.

The tested user scenarios till now are:

- Application\
  Should change language to EN\
  Should be redirected to sso login pagepending\
  Should redirect to scout UI if right test credentials are entered\
- Tour list\
  Should show spinner when loading tour list\
  Should return none tours in the list if no match is found\
  Should return full list of tours after clearing the search that returned no results\
  Should open expose modal\
  Should open order product modal\
  Should open branding editor modal\
  Should tour page items be change to 20 after selection\
  Should tour page items be change to 30 after selection\
  Should go to the last page one by one\

## Travis CI Setup Info

The project is continuously deployed using Travis for specific branches.
During CI the sources are build and tested using automatic testing and e2e testing.
For the e2e tests http-server is used to host the build files.
On successful runs a script will execute to upload the build artifact to our sources s3 bucket and a webhook that will actually restart our containers
using this new artifacts will be triggered.
