/// <reference types="cypress" />
import 'cypress';

declare global {
  namespace Cypress {
    interface Chainable {
      login(baseUrl: string, username: string, password: string): Chainable<void>;
      verifyLoginSuccess(): Chainable<void>;
      addProductToCart(productName: string): Chainable<void>;
      completeCheckout(firstName: string, lastName: string, postalCode: string): Chainable<void>;
      verifyOrderCompletion(): Chainable<void>;
    }
  }
}

Cypress.Commands.add('login', (baseUrl: string, username: string, password: string) => {
  cy.visit(baseUrl);
  cy.get('[data-test="username"]').type(username);
  cy.get('[data-test="password"]').type(password);
  cy.get('[data-test="login-button"]').click();
});

Cypress.Commands.add('verifyLoginSuccess', () => {
  cy.url().should('include', '/inventory');
  cy.get('.inventory_list').should('be.visible');
});

Cypress.Commands.add('addProductToCart', (productName: string) => {
  cy.contains('.inventory_item_name', productName).should('be.visible').click();
  cy.get('[data-test="add-to-cart-sauce-labs-backpack"]').click();
  cy.get('.shopping_cart_badge').should('contain', '1');
});

Cypress.Commands.add('completeCheckout', (firstName: string, lastName: string, postalCode: string) => {
  cy.get('.shopping_cart_link').click();
  cy.get('[data-test="checkout"]').click();
  cy.get('[data-test="firstName"]').type(firstName);
  cy.get('[data-test="lastName"]').type(lastName);
  cy.get('[data-test="postalCode"]').type(postalCode);
  cy.get('[data-test="continue"]').click();
  cy.get('[data-test="finish"]').click();
});

Cypress.Commands.add('verifyOrderCompletion', () => {
  cy.contains('h2', 'THANK YOU FOR YOUR ORDER').should('be.visible');
});
