import { ApiHelper } from "../support/helpers/ApiHelper";
import { killCookie } from "../support/helpers/killCookie";
import { MeSettingsAccountPage } from "../support/pages/MeSettingsAccountPage";
import { SignInPage } from "../support/pages/SignInPage";

const settingsPage = new MeSettingsAccountPage();
const signinPage = new SignInPage();

// This part enables A/B switch between 2 pictures in order to make sure the picture is updated
const avatarUrlForInqomPng =
  "czM6Ly93dHRqLXByb2R1Y3Rpb24vdXBsb2Fkcy9hcHBsaWNhbnRzL2JlNGU5NWNjMTIvYXZhdGFycy9pbnFvbS5qcGc";
function setImageToUpload(imageUrl) {
  return imageUrl.includes(avatarUrlForInqomPng)
    ? "img/other.jpeg"
    : "img/inqom.png";
}

describe(`after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button`, () => {
  before(() => {
    cy.session(
      "basic",
      () => {
        signinPage.visit();
        cy.fixture("ids/data.json").then((credentials) => {
          cy.loginWithFront({
            email: credentials.email,
            password: credentials.password,
          });
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
    // We get and store the actual avatar url in order to compare it later
    ApiHelper.getMe().then((me) => {
      Cypress.dataStorage.me = me;
      Cypress.dataStorage.imageToUpload = setImageToUpload(
        Cypress.dataStorage.me.user.avatar.small.url
      );

      settingsPage.assertUrl();
      settingsPage
        .getAvatarInput()
        .attachFile(Cypress.dataStorage.imageToUpload);
      cy.intercept("put", "**/registrations").as("putRegistrations");
      settingsPage.getAccountEditSubmitButton().click();
    });
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
