describe('Brewery Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://api.openbrewerydb.org/breweries', {fixture : 'example.json'})
    cy.get('#banjo-brewing-fayetteville').click()
    cy.intercept('GET', `https://api.openbrewerydb.org/breweries/banjo-brewing-fayetteville`, {fixture : 'example.json'})
  })

  it('should show changed URL to reflect specific brewery', () => {
    cy.url().should('eq', 'http://localhost:3000/banjo-brewing-fayetteville')
  })

  it('should be able to view a brewerys details', () => {
    cy.get('h2').contains('Banjo Brewing')
    cy.get('.phone').contains('3042164231')
    cy.get('.address').contains('Fayetteville, West Virginia 25840')
  })
})
