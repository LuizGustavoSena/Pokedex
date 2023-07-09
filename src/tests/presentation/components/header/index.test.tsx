import Header from "@/presentation/components/header";
import { render } from '@testing-library/react';
import { describe, expect, it } from 'vitest';

const makeSut = () => {
    return render(
        <Header />
    )
};

describe('presentation/components/header', () => {
    it('Should render component', () => {
        const component = makeSut();

        expect(component).toBeTruthy();
    })
})