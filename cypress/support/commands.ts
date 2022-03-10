// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

Cypress.Commands.add('getByDataTestId', (value: string) => cy.get(`*[data-test-id="${value}"`));

declare global {
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace Cypress {
    interface Chainable<Subject> {
      /**
       * Custom command to select DOM element by data-test-id attribute.
       * @example cy.getByDataTestId('private-input')
       */
      getByDataTestId(value: string): Chainable<Subject>;
    }
  }
}
export {};
