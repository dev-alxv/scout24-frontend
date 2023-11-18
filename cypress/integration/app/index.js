/// <reference types="cypress" />

context('Application', () => {
  before(() => {
    // log in only once before any of the tests run.
    // your app will likely set some sort of session cookie.
    // you'll need to know the name of the cookie(s), which you can find
    // in your Resources -> Cookies panel in the Chrome Dev Tools.
    // cy.login();
  });

  beforeEach(() => {
    cy.clock();
    cy.visit('/');

    cy.tick(2000);
  });

  it('Should be redirected to sso login page', () => {
    cy.tick(8000);

    cy.url().should('include', 'sso.sandbox-immobilienscout24.de');
  });

  it('Should redirect to scout UI if right test credentials are entered', () => {
    cy.tick(8000);

    cy.get('#username').type('stephan.discher@immoviewer.com');
    cy.get('#submit').click();
    cy.get('#password').type('45info123');
    cy.get('#loginOrRegistration').click();

    cy.tick(5000);

    cy.get('scout24-container-spinner').should('exist');
    // cy.url().should('include', '/dashboard');
  });

  it('Should change language to EN', () => {
    cy.get('.wrapper-language-control').find('button').click();

    cy.tick(2000);

    cy.get('.cdk-overlay-connected-position-bounding-box')
      .find('button[tabindex="0"]')
      .click();

    cy.tick(2000);

    cy.get('.mat-h1').should('contain.text', 'virtual tours found');
  });
});
