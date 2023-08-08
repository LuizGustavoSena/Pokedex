describe('Just visit e2e test', () => {
    beforeEach(() => { cy.visit('/'); });

    it('should header component', () => {
        cy.findByTestId('headerComponent').should('exist');
    });

    it('should pokemonItem component', () => {
        cy.findAllByTestId('pokemonItemComponent').should('exist');
    });
})