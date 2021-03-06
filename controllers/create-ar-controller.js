import { CategoryService } from "../services/category-service.js";
import { CreateArService } from "../services/create-ar-service.js";

export function create(e, file, img) {
    e.preventDefault();
    let createArService = new CreateArService();
    let data = new FormData();
    let price = e.target[3].value.replace(".", "").replace(",", ".");
    data.append("category_id", parseInt(e.target[0].value));
    data.append("name_model", e.target[1].value);
    data.append("description_model", e.target[2].value);
    data.append("price", price);
    data.append("dim_x", parseFloat(e.target[4].value));
    data.append("dim_y", parseFloat(e.target[5].value));
    data.append("dim_z", parseFloat(e.target[6].value));
    data.append("file", file);

    data.append("token", localStorage.getItem("token"));

    createArService.newModel(data).then((res) => {
        let api = "https://webxrshop.netlify.app/";
        let reqs = {
            lvl: 0,
            id: res.id,
            thumb_model: img,
            link: api + "webxr-basic.html?token=" + res.token,
            category_id: parseInt(e.target[0].value),
        };

        createArService.confirmation(reqs);
    });
}

export function del(token) {
    let createArService = new CreateArService();
    let data = {
        token,
    };
    createArService.del(data);
}

export function editing(e, file, img, token) {
    e.preventDefault();

    if (file == null) {
        let createArService = new CreateArService();
        let price = e.target[3].value.replace(".", "").replace(",", ".");

        let data = {
            category_id: parseInt(e.target[0].value),
            name_model: e.target[1].value,
            description_model: e.target[2].value,
            price: parseFloat(price),
            dim_x: parseFloat(e.target[4].value),
            dim_y: parseFloat(e.target[5].value),
            dim_z: parseFloat(e.target[6].value),
            model_token: token,
        };

        createArService.editModelWithoutFile(data).then((res) => {
            if (img != null) {
                let reqs = {
                    lvl: 1,

                    thumb_model: img,
                    token,
                };

                createArService.confirmation(reqs);
            } else {
                window.location.href = `../model-viewer.html?token=${res.token}`;
            }
        });
    } else {
        let createArService = new CreateArService();
        let data = new FormData();
        data.append("category_id", parseInt(e.target[0].value));
        data.append("name_model", e.target[1].value);
        data.append("description_model", e.target[2].value);
        data.append("price", parseFloat(e.target[3].value));
        data.append("dim_x", parseFloat(e.target[4].value));
        data.append("dim_y", parseFloat(e.target[5].value));
        data.append("dim_z", parseFloat(e.target[6].value));
        data.append("model_token", token);
        data.append("token", localStorage.getItem("token"));
        data.append("file", file);
        createArService.editModel(data).then((res) => {
            if (img != null) {
                let reqs = {
                    lvl: 1,

                    thumb_model: img,
                    token,
                };

                createArService.confirmation(reqs);
            } else {
                window.location.href = `../model-viewer.html?token=${res.token}`;
            }
        });
    }
}

export function getCategories() {
    let categoryService = new CategoryService();
    let data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .listCategories(data)
        .then((res) => {
            let selects = document.getElementById("selectCategory");
            let selectMain = document.createElement("option");
            selectMain.selected = true;
            selectMain.innerHTML = "Selecione a categoria";
            selectMain.setAttribute("value", "");
            selectMain.setAttribute("id", "options");
            selects.appendChild(selectMain);
            for (let i = 0; i < res["_categories"].length; i++) {
                let options = document.createElement("option");
                options.setAttribute("value", res["_categories"][i]["id"]);
                options.innerHTML = res["_categories"][i]["name"];
                selects.appendChild(options);
            }
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}

export function getEdit(token) {
    let createArService = new CreateArService();
    let data = {
        token,
    };

    createArService
        .getEdit(data)
        .then((res) => {
            params(res);
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}

function params(res) {
    setCategories(res["_template"]["category_id"]);

    let priceUs = res["_template"]["price"].toString();

    let name = document.getElementById("inputName");
    let description = document.getElementById("inputDescription");
    let price = document.getElementById("inputPrice");
    let width = document.getElementById("inputWidth");
    let height = document.getElementById("inputHeight");
    let length = document.getElementById("inputLength");

    name.value = res["_template"]["name_model"];
    description.value = res["_template"]["description_model"];
    price.value = priceUs.replace(".", ",");
    width.value = res["_template"]["dim_x"];
    height.value = res["_template"]["dim_y"];
    length.value = res["_template"]["dim_z"];
}

export function setCategories(category_id) {
    let categoryService = new CategoryService();
    let data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .listCategories(data)
        .then((res) => {
            let selects = document.getElementById("selectCategory");
            let selectMain = document.createElement("option");
            for (let i = 0; i < res["_categories"].length; i++) {
                if (category_id == res["_categories"][i]["id"]) {
                    selectMain.selected = true;
                    selectMain.innerHTML = res["_categories"][i]["name"];
                    selectMain.setAttribute(
                        "value",
                        res["_categories"][i]["id"]
                    );
                    selectMain.setAttribute("id", "options");
                    selects.appendChild(selectMain);
                }
            }

            for (let i = 0; i < res["_categories"].length; i++) {
                if (category_id != res["_categories"][i]["id"]) {
                    let options = document.createElement("option");
                    options.setAttribute("value", res["_categories"][i]["id"]);
                    options.innerHTML = res["_categories"][i]["name"];
                    selects.appendChild(options);
                }
            }
        })
        .catch((erro) => {
            console.log(erro);
            alert(erro);
        });
}
