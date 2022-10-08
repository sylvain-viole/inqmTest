import { AbstractPage } from "./AbstractPage";

export class SignInPage extends AbstractPage {
  /**
   * Singleton class representing the signin page of the SUT
   * @singleton
   */
  constructor() {
    super();
    if (!SignInPage.instance) {
      SignInPage.instance = this;
      this.url = `${Cypress.config("baseUrl")}/signin`;
    }
    return SignInPage.instance;
  }

  getPrompt() {
    return cy.getByTestLocator("session-title");
  }

  getEmailInput() {
    return cy.getByTestLocator("login-field-email");
  }

  getPasswordInput() {
    return cy.getByTestLocator("login-field-password");
  }

  getConnectionButton() {
    return cy.getByTestLocator("login-button-submit");
  }
}
