describe('Search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/')
  })
  it('should validate form input', () => {
    cy.get('[data-cy="form-submit"]').click()
    cy.get('[data-cy="form-submit"]').should('not.be.disabled')
    cy.get('[data-cy="movie-card"]').should('not.exist')
  })

  it('should submit form', () => {
    cy.fixture('submit-response.json').then((responseBody) => {
      cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie*', {
        body: responseBody
      }).as('getMovies')
    })

    cy.get('[data-cy="form-input"]').click().type('a')
    cy.get('[data-cy="form-submit"]').click()
    cy.get('[data-cy="search-progress"]').should('exist')
    cy.get('[data-cy="movie-card"]').should('have.length', 1)
    cy.get('[data-cy="form-submit"]').should('exist')
    cy.get('[data-cy="pagination"]').should('exist').contains(1)
    cy.get('[data-cy="results-count"]').should('exist').contains(1)
  })
})
