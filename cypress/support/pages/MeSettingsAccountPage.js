import { AbstractPage } from "./AbstractPage";

export class MeSettingsAccountPage extends AbstractPage {
  /**
   * Singleton class representing the account page of the SUT
   * @singleton
   */
  constructor() {
    super();
    if (!MeSettingsAccountPage.instance) {
      MeSettingsAccountPage.instance = this;
      this.url = `${Cypress.config("baseUrl")}/me/settings/account`;
    }
    return MeSettingsAccountPage.instance;
  }

  getAvatarInput() {
    return cy.get("input[name=avatar]");
  }

  getAccountEditSubmitButton() {
    return cy.getByTestLocator("account-edit-button-submit");
  }
  getAvatarImg() {
    return cy.getByTestLocator("account-edit-field-avatar").find("img");
  }
}
