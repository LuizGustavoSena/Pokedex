describe('Just visit e2e test', () => {
    beforeEach(() => { cy.visit('/'); });

    it('should header component', () => {
        cy.findByTestId('headerComponent').should('exist');
    });

    it('should pokemonItem component', () => {
        cy.findAllByTestId('pokemonItemComponent').should('exist');
    });

    it('should correct search with lowerCase pokemonsItens', () => {
        let pokemonSearch = 'bulbasaur'
        cy.get('input').type(pokemonSearch);

        cy.findByTestId('pokemonItemComponent')
            .invoke('text')
            .then(el => expect(el.toLowerCase()).to.contain(pokemonSearch));
    });

    it('should correct search with upperCase pokemonsItens', () => {
        let pokemonSearch = 'Bulbasaur'
        cy.get('input').type(pokemonSearch);

        cy.findByTestId('pokemonItemComponent')
            .invoke('text')
            .then(el => expect(el).to.contain(pokemonSearch));
    });
})