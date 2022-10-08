// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

import "cypress-file-upload";

import { SignInPage } from "./Pages/signInPage";

Cypress.Commands.add(
  "attachFiles",
  {
    prevSubject: "element",
  },
  (dom_element, files_data) => {
    if (!Array.isArray(files_data)) files_data = [files_data];
    const data_transfer = new DataTransfer();
    cy.window().then((win) => {
      for (let i = 0; i < files_data.length; i++) {
        const file = files_data[i];
        const data = new win.File([file["file"]], file["name"], {
          type: file["type"],
        });
        data_transfer["items"].add(data);
      }
      dom_element[0]["files"] = data_transfer["files"];
    });
    return cy.get(dom_element).trigger("drop", {
      force: true,
    });
  }
);

Cypress.Commands.add("getByTestLocator", (testLocatorName) => {
  return cy.get(`[data-testid="${testLocatorName}"]`);
});

Cypress.Commands.add("loginWithFront", (credentials) => {
  if (!credentials.email) throw TypeError(`"email" parameter is missing`);
  if (!credentials.password) throw TypeError(`"password" parameter is missing`);
  const page = new SignInPage();
  page.getEmailInput().clear().type(credentials.email);
  page.getPasswordInput().clear().type(credentials.password, { log: false });
  cy.intercept("post", "**/sessions").as("postSessions");
  page.getConnectionButton().click();
  cy.wait("@postSessions").then((interception) => {
    expect(interception.response.statusCode).to.eql(201);
    expect(interception.response.body.user.email).to.eql(credentials.email);
  });
});
