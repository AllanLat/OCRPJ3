// Edit mode and modal function.
import { modalFormViews } from "./form.js";
import { modalViews } from "./modal.js";

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
      if (event.target === modal) {
            event.preventDefault();
           closeModals();
        }
  });
    
    formButtons.addEventListener('click', async function() {
        retourGallery.style.display = "block";
        await modalFormViews();
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
