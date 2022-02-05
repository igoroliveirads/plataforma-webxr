import { HttpService } from "./http-service.js";

export class ArService {
    constructor() {
        this._http = new HttpService();
    }

    getModel(data) {
        return this._http
            .post("http://localhost:3333/models/get", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}