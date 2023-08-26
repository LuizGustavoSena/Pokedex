import { GraphqlClientDecorator } from "@/main/decorators";
import faker from "faker";
import { describe, expect, it } from "vitest";
import { HttpClientSpy, mockRequest } from "../../data/mocks";

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
    it('Should correct values request', async () => {
        const { httpClientSpy, sut } = makeSut();

        httpClientSpy.response = {
            statusCode: faker.random.number(),
            body: { data: faker.random.objectElement() }
        }

        let request = mockRequest();

        let response = await sut.request(request);

        expect(httpClientSpy.url).toBe(request.url);
        expect(httpClientSpy.body).toBe(JSON.stringify(request.body));
        expect(httpClientSpy.method).toBe(request.method);
        expect(response.statusCode).toBe(httpClientSpy.response.statusCode);
        expect(response.body).toBe(httpClientSpy.response.body.data);
    });


})