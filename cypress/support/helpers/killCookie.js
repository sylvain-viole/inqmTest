export const killCookie = () => {
  cy.get("button#axeptio_btn_dismiss", { setTimeout: 30000 }).click();
};
