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

        const deletedButtons = document.querySelectorAll('.delete');

        for(let i = 0; i < deletedButtons.length; i++) {
            console.log(JSON.stringify(deletedButtons[i].innerText));

            deletedButtons[i].addEventListener('click', function() {
                const button = deletedButtons[i];
                const dateId = button.getAttribute("data-id-delete");

                deletedProduct(dateId);
            });
        }

    }


    async function deletedProduct(dataId){
        const token = sessionStorage.getItem('TokenAuth0');

        const result = await fetch(`http://localhost:5678/api/works/id=${dataId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${token}`,
            },
            body: ''
        });

        if(result.ok) {
            await callApiProjectsCategories();
            await modalViews();
        }
        else {
            return false
        }

    }

    async function addNewProject(idCategorie, titleString, _UrlIMG) {
        const token = sessionStorage.getItem('TokenAuth0');
        console.log(token);

        const headers = new Headers({
            'Authorization': `Bearer ${token}`,
            'Content-type': 'application/json',
        });
      
        const response = await fetch('http://localhost:5678/api/works', {
          method: 'POST',
          headers: headers,
          body: JSON.stringify({
            title: titleString,
            image: 'image=@abajour-tahina.png;type=image/png',
            category: idCategorie
          })
        });
      
        if (!response.ok) {
          throw new Error(`Error adding project: ${response.statusText}`);
        }
      
        const json = await response.json();
        return json;
    }
    //const addnew = await addNewProject('1', 'ceci est un tests', 'https://via.placeholder.com/400x400');
    

}
else {
    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '50px 0px';
}
