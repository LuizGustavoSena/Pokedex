import Home from '@/presentation/pages/home';
import { render, waitFor } from "@testing-library/react";
import { describe, expect, it } from 'vitest';
import { RemotePokemonSpy } from "../../../domain/mocks";

const makeSut = () => {
    let remotePokemonSpy = new RemotePokemonSpy();
    let component = render(
        <Home remotePokemon={remotePokemonSpy} />
    );
    return {
        remotePokemonSpy,
        component
    }
}

describe('presentation/pages/home', () => {
    it('Should render component', () => {
        let { component } = makeSut();

        expect(component).toBeTruthy();
    });

    it('Should correct pokemons component', async () => {
        let { component, remotePokemonSpy } = makeSut();
        let { getAllByTestId } = component;

        let pokemonsName = await waitFor(() => getAllByTestId('labelNamePokemon'));

        pokemonsName.forEach((el, index) => {
            expect(el.textContent).toBe(remotePokemonSpy.pokemons[index].name)
        })
    });
})