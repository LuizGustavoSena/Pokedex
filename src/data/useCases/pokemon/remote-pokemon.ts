import { HttpGetClient } from "../../protocols/http/http-get-client";

export class RemotePokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient
    ){}

    async get():Promise<void>{
        await this.httpGetClient.get({ url: this.url });
    }
}      