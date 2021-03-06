import { HttpService } from "./http-service.js";

export class ArService {
    constructor() {
        this._http = new HttpService();
    }

    getModel(data) {
        return this._http
            .post("models/get", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }

    getModelViewer(data) {
        return this._http
            .post("models/viewer", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                alert(erro);
            });
    }
}
