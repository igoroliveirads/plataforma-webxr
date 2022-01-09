import { CategoryService } from "../services/category-service.js";

function getRandomIntInclusive(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
}

const colors = ["bg-primary", "bg-warning", "bg-success", "bg-danger"];

export function categories() {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
    };

    categoryService
        .getCategories(data)
        .then((res) => {
            console.log(res);
            for (let i = 0; i < res["_categories"].length; i++) {
                var color = colors[getRandomIntInclusive(0, 3)];

                var categories = document.getElementById("categories");

                var divMain = document.createElement("div");
                divMain.setAttribute("class", "col-xl-3 col-md-6");

                var divCard = document.createElement("div");
                divCard.setAttribute(
                    "class",
                    "card " + color + " text-white mb-4"
                );

                var divName = document.createElement("div");
                divName.setAttribute("class", "card-body");
                divName.innerHTML = res["_categories"][i]["name"];
                var div = document.createElement("div");
                div.setAttribute(
                    "class",
                    "card-footer d-flex align-items-center justify-content-between"
                );

                var aModels = document.createElement("a");
                aModels.setAttribute(
                    "class",
                    "small text-white stretched-link"
                );
                aModels.setAttribute(
                    "href",
                    "category.html?id=" + res["_categories"][i]["id"]
                );
                aModels.innerHTML = "Ver modelos";

                var divText = document.createElement("div");
                divText.setAttribute("class", "small text-white");

                var iSet = document.createElement("i");
                iSet.setAttribute("class", "fas fa-angle-right");

                divText.appendChild(iSet);
                div.appendChild(aModels);
                div.appendChild(divText);
                divCard.appendChild(divName);
                divCard.appendChild(div);
                divMain.appendChild(divCard);
                categories.appendChild(divMain);
            }
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}

export function models(category_id) {
    let categoryService = new CategoryService();
    var data = {
        token: localStorage.getItem("token"),
        category_id: parseInt(category_id),
    };

    categoryService
        .listModels(data)
        .then((res) => {
            var divMain = document.getElementById("tableCategory");

            var table = document.createElement("table");
            table.setAttribute("id", "datatablesSimple");

            var thead = document.createElement("thead");
            var trT = document.createElement("tr");

            var thId = document.createElement("th");
            var thNm = document.createElement("th");
            var thHe = document.createElement("th");
            var thWd = document.createElement("th");
            var thLe = document.createElement("th");
            var thOp = document.createElement("th");

            thId.innerHTML = "ID";
            thNm.innerHTML = "Nome";
            thHe.innerHTML = "Altura";
            thWd.innerHTML = "Largura";
            thLe.innerHTML = "Comprimento";
            thOp.innerHTML = "Opções";

            trT.appendChild(thId);
            trT.appendChild(thNm);
            trT.appendChild(thHe);
            trT.appendChild(thWd);
            trT.appendChild(thLe);
            trT.appendChild(thOp);
            thead.appendChild(trT);

            table.appendChild(thead);

            var tBody = document.createElement("tbody");

            for (let i = 0; i < res["_templates"].length; i++) {
                var tr = document.createElement("tr");

                var tdId = document.createElement("td");
                var tdNm = document.createElement("td");
                var tdHe = document.createElement("td");
                var tdWd = document.createElement("td");
                var tdLe = document.createElement("td");
                var tdOp = document.createElement("td");

                tdId.innerHTML = res["_templates"][i]["id"];
                tdNm.innerHTML = res["_templates"][i]["name_model"];
                tdHe.innerHTML = res["_templates"][i]["dim_y"];
                tdWd.innerHTML = res["_templates"][i]["dim_x"];
                tdLe.innerHTML = res["_templates"][i]["dim_z"];

                tr.appendChild(tdId);
                tr.appendChild(tdNm);
                tr.appendChild(tdHe);
                tr.appendChild(tdWd);
                tr.appendChild(tdLe);

                var divRow = document.createElement("div");
                divRow.setAttribute("class", "row");
                var divItem1 = document.createElement("div");
                divItem1.setAttribute(
                    "class",
                    "col-2 d-flex align-items-center"
                );
                var a1 = document.createElement("a");
                a1.setAttribute("href", "#");
                var divIcon1 = document.createElement("div");
                divIcon1.setAttribute("class", "sb-nav-link-icon");
                divIcon1.innerHTML = "Visualizar";
                var i1 = document.createElement("i");
                i1.setAttribute("class", "fas fa-link");

                divIcon1.appendChild(i1);
                a1.appendChild(divIcon1);
                divItem1.appendChild(a1);

                var divItem2 = document.createElement("div");
                divItem2.setAttribute(
                    "class",
                    "col-2 d-flex align-items-center"
                );
                var a2 = document.createElement("a");
                a2.setAttribute("href", "#");
                var divIcon2 = document.createElement("a");
                divIcon2.setAttribute("class", "sb-nav-link-icon");
                divIcon2.innerHTML = "Editar";
                var i2 = document.createElement("a");
                i2.setAttribute("class", "fas fa-edit");

                divIcon2.appendChild(i2);
                a2.appendChild(divIcon2);
                divItem2.appendChild(a2);

                var divItem3 = document.createElement("div");
                divItem3.setAttribute(
                    "class",
                    "col-2 d-flex align-items-center"
                );
                var a3 = document.createElement("a");
                a3.setAttribute("href", "#");
                var divIcon3 = document.createElement("a");
                divIcon3.setAttribute("class", "sb-nav-link-icon");
                divIcon3.innerHTML = "Excluir";
                var i3 = document.createElement("a");
                i3.setAttribute("class", "fas fa-trash");

                divIcon3.appendChild(i3);
                a3.appendChild(divIcon3);
                divItem3.appendChild(a3);

                divRow.appendChild(divItem1);
                divRow.appendChild(divItem2);
                divRow.appendChild(divItem3);

                tdOp.appendChild(divRow);
                tr.appendChild(tdOp);
                tBody.appendChild(tr);
            }
            table.appendChild(tBody);
            // var tfoot = document.createElement("tfoot");
            // tfoot.appendChild(trT);
            // table.appendChild(tfoot);
            divMain.appendChild(table);
            console.log(table);
        })
        .catch((erro) => {
            console.log(erro);
            throw new Error(erro);
        });
}