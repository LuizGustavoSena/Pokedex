import { describe, expect, it } from "vitest";
import { HttpClientSpy, mockRequest } from "../../data/mocks";
import { GraphqlClientDecorator } from "./graphql-client-decorator";

type Props = {
    httpClientSpy: HttpClientSpy;
    sut: GraphqlClientDecorator;
}
const makeSut = (): Props => {
    let httpClientSpy = new HttpClientSpy();
    let sut = new GraphqlClientDecorator(httpClientSpy);

    return {
        httpClientSpy,
        sut
    }
}

describe('main/decorators/graphql-client-decorator', () => {
    it('Should correct headers', () => {
        const { httpClientSpy, sut } = makeSut();

        sut.request(mockRequest());

        expect(httpClientSpy.headers).toEqual({ 'Content-Type': 'application/json' })
    })
})