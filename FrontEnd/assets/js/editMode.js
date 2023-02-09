// Edit mode and modal function.
import { projectsList } from "./project.js";
import { deletedProduct } from "./api.js";
import { modalFormViews } from "./formModal.js";

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
    const formButtons = document.querySelector('#addPhoto');
    const retourGallery = document.querySelector(".goBack");

    openModal.addEventListener('click', function() {
        modalViews();
        modal.style.display = "block";
    });
    
    const closeModals = () => {
        modal.style.display = 'none';
    };

    closeModal.addEventListener('click', function() {
        closeModals();
    });

    window.addEventListener('click', event => {
        event.preventDefault();

        if (event.target === modal) {
            closeModals();
        }
    });
    
    formButtons.addEventListener('click', function() {
        retourGallery.style.display = "block";
        modalFormViews();
    });
    
    retourGallery.addEventListener('click', function() {
        retourGallery.style.visibility = "hidden";
        modalViews();
    })

}
else {
    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '50px 0px';
}

export async function modalViews() {
        
    const gallery = document.querySelector(".content");
    gallery.innerHTML = ""; 

    const buttonValidation = document.querySelector('#addPhoto');
    buttonValidation.innerText = 'Ajouter une photo';

    const worksJson = projectsList;

    if (worksJson.length > 0){
        // Create loop
        for(let i = 0; i < worksJson.length; i++) {

            const projectImg = document.createElement('div');
            projectImg.id = worksJson[i].title + " - " + i;
            projectImg.className = "project-img";
            gallery.appendChild(projectImg);


            const outils = document.createElement('div');
            outils.className = 'outils';
            outils.innerHTML = '<button><i class="fa-solid fa-arrows-up-down-left-right"></i></button>'+
            '<button class="delete" ><i class="fa-solid fa-trash-can"></i></button>';
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

        const deletedButtons = document.querySelectorAll('.delete');

        for(let i = 0; i < deletedButtons.length; i++) {
            
            deletedButtons[i].addEventListener('click', function(event) {
                event.preventDefault()
            
                const button = deletedButtons[i];
                const dateId = button.getAttribute("data-id-delete");
                deletedProduct(dateId);

            });
        }

   
    }

}

