export enum HttpStatusCode {
    ok = 200,
    serverError = 500
}

export type HttpResponse<T> ={
    statusCode: number;
    body?: T
}