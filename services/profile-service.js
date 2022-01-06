import { HttpService } from "./http-service.js";

export class ProfileService {
    constructor() {
        this._http = new HttpService();
    }

    editProfile(data) {
        return this._http
            .post("http://localhost:3333/profile/edit", data)
            .then((res) => {
                console.log(res);
            })
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    getProfile(data) {
        return this._http
            .post("http://localhost:3333/profile", data)
            .then((res) => res)
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
}
