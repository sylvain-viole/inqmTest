export class AbstractPage {
  /**
   * Abstract class representing a page on the SUT
   * @abstract
   */
  constructor() {
    if (this.constructor === AbstractPage) {
      throw new TypeError(
        'Abstract class "AbstractPage" cannot be instantiated directly'
      );
    }
    this.url;
    this.components = [];
  }

  visit() {
    cy.visit(this.url);
    return this;
  }

  /**
   * @param {Object} options
   * @param {Boolean} [options.exactMatch] if true url should strictly eql passed value
   */
  assertUrl(options) {
    const assertionType = options?.exactMatch ? "eql" : "contains";
    cy.url(options).should(assertionType, this.url);
    return this;
  }
}
