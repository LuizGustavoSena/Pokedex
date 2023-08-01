import Loading from '@/presentation/components/loading';
import { render } from "@testing-library/react";
import { describe, expect, it } from 'vitest';

const makeSut = (show: boolean = true) => {
    return render(
        <Loading show={show} />
    )
}

describe('presentation/components/loading', () => {
    it('Should render component', () => {
        let component = makeSut();

        expect(component).toBeTruthy();
    });

    it('Should don`t render component', () => {
        let text;
        let { getByText } = makeSut(false);

        try {
            text = getByText('Carregando...');
        } catch (error) {
            text = null
        }

        expect(text).toBeNull();
    });

    it('Should render component', () => {
        let { getByText } = makeSut(true);

        let text = getByText('Carregando...');

        expect(text).not.toBeNull();
    });
})