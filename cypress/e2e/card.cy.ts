describe('Card', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173/').then((win) => {
      cy.stub(win.localStorage, 'setItem').as('setVoteLocal')
    })
    cy.fixture('submit-response.json').then((responseBody) => {
      cy.intercept('GET', 'https://api.themoviedb.org/3/search/movie*', {
        body: responseBody
      }).as('getMovies')
    })

    cy.get('[data-cy="form-input"]').click().type('a')
    cy.get('[data-cy="form-submit"]').click()
    cy.get('[data-cy="movie-card"]').trigger('mouseover', {
      waitForAnimations: true
    })
  })
  it('should show details', () => {
    cy.get('[data-cy="card-content"]').should('be.visible')
  })
  it('fill the stars', () => {
    cy.get('[data-cy="voting-box"]').trigger('mouseover', {
      waitForAnimations: true
    })
    //last star
    cy.get('[data-cy="empty-stars"]').last().trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').should('have.length', 0)
    //4th star
    cy.get('[data-cy="filled-stars"]').eq(3).trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').should('have.length', 1)
    //3rd star
    cy.get('[data-cy="filled-stars"]').eq(2).trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').should('have.length', 2)
    //2nd star
    cy.get('[data-cy="filled-stars"]').eq(1).trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').should('have.length', 3)
    //first star
    cy.get('[data-cy="filled-stars"]').first().trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').should('have.length', 4)
  })
  it('should vote the movie', () => {
    cy.get('[data-cy="voting-box"]').trigger('mouseover', {
      waitForAnimations: true
    })
    cy.get('[data-cy="empty-stars"]').last().click()
    cy.get('@setVoteLocal').should('have.been.called')
    cy.get('[data-cy="user-vote"]').contains(5)
  })
})
