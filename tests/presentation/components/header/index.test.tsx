import Header from "@/presentation/components/header";
import { fireEvent, render } from '@testing-library/react';
import faker from "faker";
import { describe, expect, it } from 'vitest';

type Props = {
    onChange(text: string): void;
}

const makeSut = ({ onChange }: Props) => {
    return render(
        <Header onChange={onChange} />
    )
};

describe('presentation/components/header', () => {
    it('Should render component', () => {
        const component = makeSut({ onChange: () => { } });

        expect(component).toBeTruthy();
    });

    it('Should call onChanges function', () => {
        let textVar = '';
        let textFaker = faker.name.firstName();

        const onChange = (text: string) => {
            textVar = text
        }

        const { getByTestId } = makeSut({ onChange });

        fireEvent.change(getByTestId('searchInput'), { target: { value: textFaker } });

        expect(textVar).toBe(textFaker);
    });
})