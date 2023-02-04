// List des import.
import { validateUrl } from "./tools.js";

// Variables global
export let projectsList;
let categories;

export async function callApiProjectsCategories() {

    const projectsCategories =  await fetch("http://localhost:5678/api/works");
    const projects = await projectsCategories.json();

    const categoriesOnJson = projects.map(itemCats => itemCats.category);
    
    projectsList = projects;
    categories = categoriesOnJson;

    // On appel l'affichage des btn et des project juste ici 
    viewsCategorie(categories);
    viewsProjects(projectsList);
    // END call 
}

async function viewsProjects(listProject) {

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; 

    const worksJson = listProject;

    // Create loop
    for(let i = 0; i < worksJson.length; i++) {
        
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');

        img.src = worksJson[i].imageUrl;
        img.alt = worksJson[i].title;
        img.crossOrigin = "anonymous";
        figCaption.innerText = worksJson[i].title;

        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallery.appendChild(figure);

    }
}

async function viewsCategorie(listCategories) {

    // On récupére le listing des catégories et 
    // On le trie avec Set de façon à ne resortir que les ids 
    const catId = new Set(listCategories.map(catRow => catRow.id));

    // Création du button All : 
    const btnChoiceConteneur = document.querySelector('#btnChoiceConteneur');
    btnChoiceConteneur.innerHTML = '';
    const buttonDefault = document.createElement('button');
    buttonDefault.id = "resetButtonCategorie";
    buttonDefault.innerText = "Tous";
    btnChoiceConteneur.appendChild(buttonDefault);
   
    // On affiche ensuite seulement les btns dont les ids sont présent 
        // Créé une boucle sur le Set.
        for(const values of catId) {
            
             // Chaque appel on va cherche dans le JSON globale le première element correspondant à l'ID
            const categoriButtonContent = Object.values(categories);
            const searchCategoriButton = categoriButtonContent.find(item => item.id === values);

            const buttonCat = document.createElement('button');

            buttonCat.id = searchCategoriButton.id;
            buttonCat.innerText = searchCategoriButton.name;

            btnChoiceConteneur.appendChild(buttonCat); 
        }
 
}


if(validateUrl('index')) {

    // Appel de la fonction inialisation
    callApiProjectsCategories()
    
    // Ajout des event
   const groupBtn = document.querySelector('#btnChoiceConteneur'); 
   groupBtn.addEventListener("click", (event) => {
    if (event.target.tagName === "BUTTON") {

        const IdButton = event.target.id;

        if (IdButton > 0) {
            const listTrier = projectsList.filter(function (projectButton){
                return projectButton.categoryId == IdButton;
            });
            viewsProjects(listTrier);
        }
        else {
            viewsProjects(projectsList);
        }
              
    }
    }) 
}



