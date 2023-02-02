// Edit mode and modal function.
import { projectsList } from "./project.js";
import { callApiProjectsCategories } from "./project.js";

if(sessionStorage.getItem('TokenAuth0')) {
    const classEdit = document.getElementsByClassName("edit");
    for (var i = 0; i < classEdit.length; i++) {
        classEdit[i].style.display = "block";
    }

    const editBar = document.querySelector('#editBar');
    editBar.style.display = "flex";

    document.head.innerHTML += '<link href="./assets/css/edit.css" type="text/css" rel="stylesheet">';


    const editProject = document.querySelector('#editProject');
    editProject.style.display = "inline";

    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '100px 0px';

    const closeModal = document.querySelector('.close');
    const openModal = document.querySelector('#editProject');
    const modal = document.querySelector('#modalEdit');

    closeModal.addEventListener('click', function() {
        modal.style.display = "none";
        callApiProjectsCategories();
    });

    openModal.addEventListener('click', function() {
        modal.style.display = "block";
        modalViews();
    });
    
    

    async function modalViews() {

        const gallery = document.querySelector(".content");
        gallery.innerHTML = ""; 
    
        const worksJson = projectsList;
    
        // Create loop
        for(let i = 0; i < worksJson.length; i++) {

            const projectImg = document.createElement('div');
            projectImg.id = worksJson[i].title + " - " + i;
            projectImg.className = "project-img";
            gallery.appendChild(projectImg);


            const outils = document.createElement('div');
            outils.className = 'outils';
            outils.innerHTML = '<button><i class="fa-solid fa-arrows-up-down-left-right"></i></button><button class="delete" ><i class="fa-solid fa-trash-can"></i></button>';
            projectImg.appendChild(outils);

            const buttonDelete = outils.children[1];
            buttonDelete.setAttribute("data-id-delete", worksJson[i].id);
            

            const img = document.createElement('img');
            img.src = worksJson[i].imageUrl;
            img.alt = worksJson[i].title;
            img.crossOrigin = "anonymous";
            projectImg.appendChild(img);

            const small = document.createElement('small');
            small.innerText = "éditer";
            projectImg.appendChild(small)
    
        }


    }


    const deleted = document.querySelector('.delete');

    console.log(deleted);
    deleted.addEventListener('click', function() {
        const result = deleted.getAttribute("data-id-delete");
        console.log(result);
    });







}
else {
    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '50px 0px';
}
