import { HttpService } from "./http-service.js";

export class LoginService {
    constructor() {
        this._http = new HttpService();
    }

    login(data) {
        return this._http
            .post("http://localhost:3333/login", data)
            .then((res) =>
                res.error == 0
                    ? this.set_token(res.token)
                    : this.throw_error(res.error)
            )
            .catch((erro) => {
                console.log(erro);
                throw new Error(erro);
            });
    }
    throw_error(error) {
        throw new Error(error);
    }

    set_token(token) {
        console.log(token);
        localStorage.setItem("token", token);
        window.location.href = "../index.html";
    }
}