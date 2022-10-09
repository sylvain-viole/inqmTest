import { ApiHelper } from "../support/helpers/ApiHelper";
import { killCookie } from "../support/helpers/killCookie";
import { MeSettingsAccountPage } from "../support/pages/MeSettingsAccountPage";
import { SignInPage } from "../support/pages/SignInPage";

const settingsPage = new MeSettingsAccountPage();
const signinPage = new SignInPage();

const timestamp = Date.now();

describe(`after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button`, () => {
  before(() => {
    // Avatar URL is based on the file name, we need to have this name made unique in order to have a different url after update
    cy.task("addSuffixToImageFileName", timestamp);
    cy.session(
      "basic",
      () => {
        signinPage.visit();
        cy.loginWithFront({
          email: Cypress.env("USER_EMAIL"),
          password: Cypress.env("USER_PASSWORD"),
        });
        killCookie();
      },
      {
        validate() {
          ApiHelper.getMe({ returnWholeResponse: true })
            .its("status")
            .should("eql", 200);
        },
      }
    );
  });

  it("_profile-avatar data are updated", () => {
    settingsPage.visit().assertUrl();
    // We get and store the actual me which contains the avatar img url in order to compare it later
    ApiHelper.getMe().then((me) => {
      Cypress.dataStorage.me = me;
    });
    settingsPage.getAvatarInput().attachFile(`/img/inqom_${timestamp}.png`);
    cy.intercept("put", "**/registrations").as("putRegistrations");
    settingsPage.getAccountEditSubmitButton().click();
    // We make sure with api the image is updated
    cy.wait("@putRegistrations").then((interception) => {
      expect(interception.response.statusCode).to.eql(200);
      expect(interception.response.body.user.avatar.small.url).to.not.eql(
        Cypress.dataStorage.me.user.avatar.small.url
      );
      // we make sure the avatar is visible and its url is updated in the DOM
      settingsPage
        .getAvatarImg()
        .should("be.visible")
        .and(
          "have.attr",
          "src",
          interception.response.body.user.avatar.small.url
        );
    });
  });
});
