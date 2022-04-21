export class RequestError extends Error{
    constructor(){
        super('Erro ao fazer a requisição');
        this.name = 'RequestError'
    }
}