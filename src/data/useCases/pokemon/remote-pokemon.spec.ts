interface HttpGetClient {
    get(url: string):Promise<void>;
}

class RemotePokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient
    ){}

    async get():Promise<void>{
        await this.httpGetClient.get(this.url);
    }
}

describe('RemotePokemon', () =>{
    test('Should call HttpClient with correct URL', async() => {
        class HttpGetClientSpy implements HttpGetClient {
            url?: string;

            async get(url: string): Promise<void> {
                this.url = url;
                return Promise.resolve();
            }
        }

        const url = 'any_url';
        const httpGetClient = new HttpGetClientSpy();

        const sut = new RemotePokemon(url, httpGetClient);
        await sut.get();

        expect(httpClient.url).toBe(url)
    })
})