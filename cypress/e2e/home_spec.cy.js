const { createYield } = require("typescript")

describe('Home page', () => {
    beforeEach(() => {
        cy.visit('http://localhost:3000/')
        cy.intercept('GET', 'https://api.openbrewerydb.org/breweries', {fixture : 'example.json'})
    })

    it('should show the user home page with the following components', () => {
        cy.contains('Brew Maps')
        cy.get('.breweries').children().should('have.length', 5)
        cy.get('#banjo-brewing-fayetteville').children().should('have.length', 2)
        cy.get('.name').should('contain', 'Banjo Brewing')
        // cy.get('.location').children().eq(0).should('contain', 'Fayetteville, West Virgina')
    })

    it('should have a nav bar that includes a search bar and home button', () => {
      cy.get('.home-btn').contains('Home')
      cy.get('.search-bar').should('have.attr', 'placeholder').should('include', 'ex: Banjo Brewing')
    })

    it('should show the user a live search when searching for brewery name', () => {
        cy.get('.search-bar').type('banjo')
        cy.get('.breweries').children().should('have.length', 1)
        cy.get('#banjo-brewing-fayetteville').children().should('have.length', 2)
        cy.get('.name').should('contain', 'Banjo Brewing')
    })

})