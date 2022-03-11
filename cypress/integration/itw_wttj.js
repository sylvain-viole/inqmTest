describe(`after visiting ["www.welcometothejungle.com/fr/me/settings/account"] webpage, clicking on ["Se connecter"] button, filling ["Email", "Mot de passe"] inputs, clicking ["Se connecter"] button, filling ["Photo de profil"] input and clicking on ["OK"] button`, () => {
  before(() => {
    cy.visit('fr/me/settings/account')
    // ...
  })
  it("_profile-avatar data are updated", () => {
    // ....
  })
})
