import { Pokemons } from '@/domain/usecases';
import Pokemon from '@/presentation/components/pokemon';
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';
import { itemPokemon } from '../../../domain/mocks';

const makeSut = (pokemons: Pokemons.Model = itemPokemon()) => {
    return render(
        <Pokemon item={pokemons} />
    )
}

describe('presentation/components/header', () => {
    it('Should render component', () => {
        const component = makeSut();

        expect(component).toBeTruthy();
    });

    it('Should correct values component', () => {
        let pokemonItem = itemPokemon();

        const { getByTestId } = makeSut(pokemonItem);

        let srcImage = getByTestId('imagePokemon').getAttribute('src');
        let pokemonName = getByTestId('labelNamePokemon').textContent;

        expect(srcImage).toBe(pokemonItem.sprites.front_default);
        expect(pokemonName).toBe(pokemonItem.name);
    });
})