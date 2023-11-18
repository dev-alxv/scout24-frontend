/// <reference types="cypress" />

context('Tour list', () => {
  before(() => {
    // log in only once before any of the tests run.
    // your app will likely set some sort of session cookie.
    // you'll need to know the name of the cookie(s), which you can find
    // in your Resources -> Cookies panel in the Chrome Dev Tools.
    // cy.login();
    // cy.clock();
    // cy.visit('/');
    // cy.tick(8000);
    // cy.get('#username').type('stephan.discher@immoviewer.com');
    // cy.get('#submit').click();
    // cy.get('#password').type('45info123');
    // cy.get('#loginOrRegistration').click();
  });

  beforeEach(() => {
    cy.clock();
    cy.visit('/');

    cy.tick(2000);
  });

  it('Should show spinner when loading tour list', () => {
    cy.get('scout24-container-spinner').should('exist');
  });

  it('Should return none tours in the list if no match is found', () => {
    cy.get('.search-form').find('input').type('----------{enter}');

    cy.tick(2000);

    cy.get('.mat-h1').should('contain.text', '0');
  });

  it('Should return full list of tours after clearing the search that returned no results', () => {
    cy.get('.search-form').find('input').type('----------{enter}');

    cy.tick(4000);

    cy.get('.search-form').find('button[aria-label="Clear"]').click();

    cy.tick(2000);

    cy.get('scout24-tour-list-item').should('exist');
  });

  it('Should open expose modal', () => {
    cy.get('.wrapper-tli-infos').find('button').first().click();

    cy.get('scout24-expose-list-dialog').should('exist');
  });

  it('Should open order product modal', () => {
    cy.get('.wrapper-tli-controls')
      .find('button.option-button-tli')
      .first()
      .click();

    cy.tick(2000);

    cy.get('scout24-payment-options-dialog').should('exist');
  });

  it('Should open branding editor modal', () => {
    cy.get('.wrapper-ci-change').find('button').first().click();

    cy.tick(2000);

    cy.get('scout24-scout-branding-dialog').should('exist');
  });

  it('Should tour page items be change to 20 after selection', () => {
    cy.get('.paginator-settings').click();

    cy.tick(4000);

    cy.get('.cdk-overlay-connected-position-bounding-box')
      .find('mat-option[value="20"]')
      .click();

    cy.tick(4000);

    cy.get('scout24-tour-list-item').should('have.length', 20);
  });

  it('Should tour page items be change to 30 after selection', () => {
    cy.get('.paginator-settings').click();

    cy.tick(4000);

    cy.get('.cdk-overlay-connected-position-bounding-box')
      .find('mat-option[value="30"]')
      .click();

    cy.tick(4000);

    cy.get('scout24-tour-list-item').should('have.length', 30);
  });

  it('Should go to the last page one by one', () => {
    let cycles = 0;

    const visitTextPageIfPossible = () => {
      cy.get('.pagination-next').then(($next) => {
        if ($next.hasClass('disabled') || cycles === 4) {
          // we are done - we are on the last page
          return;
        }

        cy.tick(6000);
        cy.get('.pagination-next').click();
        // cycles++;
        visitTextPageIfPossible();
      });
    };

    visitTextPageIfPossible();

    cy.log('**on the last page**');
    // cy.contains('li', 11).should('be.visible')
    // cy.contains('.pagination-nav', '3 / 3').should('be.visible')
    // if you want to confirm the "next" list is disabled
    cy.tick(5000);
    cy.get('.pagination-next').should('have.class', 'disabled');

    // cy.get('.ngx-pagination > :nth-child(6)').should('contain.text', '4');
  });
});
