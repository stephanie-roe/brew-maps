describe('Brewery Details', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000/')
    cy.intercept('GET', 'https://api.openbrewerydb.org/breweries', {fixture : 'example.json'})
   
  })

  it.only('should display an error message if the api call is unsuccessful', () => {
    cy.visit('http://localhost:3000/badURL')
    cy.get('.error-message').children().should('have.length', 2)
    cy.get('img').should('have.attr', 'src').should('include', "https://media.giphy.com/media/l46Cl6JOKu0fbiR3O/giphy.gif")
    cy.get('h1').contains("Something went wrong, please try again!")
  })

  it('should show changed URL to reflect specific brewery', () => {
    cy.intercept('GET', `https://api.openbrewerydb.org/breweries/banjo-brewing-fayetteville`, {fixture : 'example.json'})
    cy.url().should('eq', 'http://localhost:3000/banjo-brewing-fayetteville')
  })

  it('should be able to view a brewerys details', () => {
    cy.intercept('GET', `https://api.openbrewerydb.org/breweries/banjo-brewing-fayetteville`, {fixture : 'example.json'})
    cy.get('h2').contains('Banjo Brewing')
    cy.get('.phone').contains('3042164231')
    cy.get('.address').contains('Fayetteville, West Virginia 25840')
  })
})
