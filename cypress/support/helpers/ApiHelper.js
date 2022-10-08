/**
 * Static class making requests on the API
 */
export class ApiHelper {
  constructor() {
    throw TypeError("ApiHelper is a static class it cannot be instanciated");
  }

  /**
   * Requests the api on /users/me and returns body
   * @param {Object} options cypress options on cy.request
   * @param {Object} [options.returnWholeResponse] returns the reponse and not only the body
   * @returns {Object} response body
   */
  static getMe(options) {
    return cy
      .request(`${Cypress.env("apiUrl")}/users/me`, options)
      .then((response) => {
        if (options?.returnWholeResponse) return response;
        else return response.body;
      });
  }
}
