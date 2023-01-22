import { createconnection } from "./api.js";

if(document.location.pathname ==='/FrontEnd/login.html') {
    const form = document.querySelector("#loginForm");
    let data = {};

    form.addEventListener("submit", function(e) {
        e.preventDefault();
        let elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.type !== "submit") {
            data[element.name] = element.value;
            }
        }


        // Une fois recupéré on ajoute le traitement à l'API.
        createconnection(data.emailform, data.passForm);

    });

}

