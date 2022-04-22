import { httpGetParams } from "../../../data/protocols/http";
import axios from "axios";

export class AxiosHttpClient{
    async get(params: httpGetParams): Promise<void>{
        await axios.get(params.url);
    }
}