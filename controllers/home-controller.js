import { HomeService } from "../services/home-service.js";
import { del } from "./create-ar-controller.js";
import { tables } from "./table-controller.js";
import { graphic } from "./graphic-controller.js";

export function models() {
    let homeService = new HomeService();
    let data = {
        token: localStorage.getItem("token"),
    };

    homeService
        .list_model_recent(data)
        .then((res) => {
            let data = [];
            for (let i = 0; i < res._templates.length; i++) {
                let array = [
                    res._templates[i].id.toString(),
                    res._templates[i].name_model,
                    res._templates[i].category.name,
                    `<div class="row">
                        <div class="col-4 align-items-center">
                            <a href="model-viewer.html?token=${res._templates[i].token}">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-link"></i>
                                    <p class="d-none d-sm-block">Visualizar</p>
                                </div>
                            </a>
                        </div>
                        <div class="col-4 align-items-center">
                            <a href="edit-ar.html?token=${res._templates[i].token}">
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-edit"></i>
                                    <p class="d-none d-sm-block">Editar</p>
                                </div>
                            </a>
                        </div>
                        <div class="col-4 align-items-center">
                            <a id="${res._templates[i].token}" key="${res._templates[i].token}" href=# >
                                <div class="sb-nav-link-icon">
                                    <i class="fas fa-trash"></i>
                                    <p class="d-none d-sm-block">Excluir</p>
                                </div>
                            </a>
                        </div>
                        
                    </div>
                    `,
                ];

                data.push(array);
            }
            if (res._templates.length != 0) {
                document.getElementById("banner").hidden = true;
            } else {
                document.getElementById("infos").hidden = true;
            }

            tables(data);

            for (let i = 0; i < res._templates.length; i++) {
                document.getElementById(res._templates[i].token).onclick =
                    function () {
                        del(res._templates[i].token);
                    };
            }

            let labels = [];
            let dataGraphic = [];
            let max = 0;
            for (let i = 0; i < res._categories.length; i++) {
                labels.push(res._categories[i].name);
                dataGraphic.push(res._categories[i].templates.length);
                if (res._categories[i].templates.length > max) {
                    max = res._categories[i].templates.length;
                }
            }
            graphic(labels, dataGraphic, max + 5);
        })
        .catch((erro) => {
            console.log(erro);
            // alert(erro);
        });
}
