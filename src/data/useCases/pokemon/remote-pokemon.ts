import { RequestError } from "../../../domain/error/requestError";
import { HttpGetClient } from "../../protocols/http/http-get-client";
import { HttpStatusCode } from "../../protocols/http/http-response";

export class RemotePokemon {
    constructor(
        private readonly url: string,
        private readonly httpGetClient: HttpGetClient
    ){}

    async get():Promise<void>{
        const response = await this.httpGetClient.get({ url: this.url });
        switch(response.statusCode){
            case HttpStatusCode.serverError: 
                throw new RequestError();
            default:
                return Promise.resolve();
        }
    }
}      