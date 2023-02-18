import { deletedProduct, projectsList } from "./api.js";

export async function modalViews() {
        
    //console.log(projectsList);

    const gallery = document.querySelector(".content");
    gallery.innerHTML = ""; 

    const goBack = document.querySelector('.goBack');
    goBack.style.visibility = 'hidden';

    const buttonValidation = document.querySelector('#addPhoto');
    buttonValidation.innerText = 'Ajouter une photo';
    buttonValidation.style.display = "block";

    const btnAddProject = document.querySelector('#valideProject');
    btnAddProject.style.display = 'none';


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
            
            deletedButtons[i].addEventListener('click', async event => {
                event.preventDefault()
            
                const button = deletedButtons[i];
                const dataId = button.getAttribute("data-id-delete");
                await deletedProduct(dataId);

                await modalViews();
            });
        }

   
    }
    else {
        const message = document.createElement('h4');
        message.innerText = 'Aucun projet dans la gallery . . .';
        message.style.textAlign = 'center';
        message.style.width = '100%';
        gallery.appendChild(message);
    }

}

