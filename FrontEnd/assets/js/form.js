import { addProject, viewsCategory } from "./api.js";
import { modalViews } from "./modal.js";

async function includeFile(filePath) {
    try {
      const response = await fetch(filePath);
      const content = await response.text();
      document.querySelector(".content").innerHTML = content;
    } catch (error) {
      console.error(error);
    }
  }
  
export async function modalFormViews() {
    //Afficher le formulaire et géré ces actions
    const goBack = document.querySelector('.goBack');
    goBack.style.visibility = 'visible';

    const buttonValidation = document.querySelector('#addPhoto');
    buttonValidation.style.display = "none";

    const btnAddProject = document.querySelector('#valideProject');
    btnAddProject.style.display = 'block';


    await includeFile('./form.html');

    // Affficher les categories
    const inputSelect = document.querySelector('#FileCategorySelect')
    const optionsCategory = await viewsCategory();
    //console.log(optionsCategory)
    for (let i = 0; i < optionsCategory.length;i++) {
       const option = document.createElement('option');
       option.value =  optionsCategory[i].id;
       option.innerText = optionsCategory[i].name;
       inputSelect.appendChild(option);
    }


    //Afficher formulaire
    const fileInput = document.querySelector("#fileInput");
    const fileImgPlaceHolder = document.querySelectorAll(".fileZoneInfo");
	const dropArea =  document.querySelector("#dropArea");
    const buttonAddProjectImg = document.querySelector("#btnInputFile");

    buttonAddProjectImg.addEventListener("click", function(e) {
		e.preventDefault();
		fileInput.click();
    });

    const maxFileSize = 4000 * 1024;
    const allowedTypes = ["image/jpeg", "image/png"];
    dropArea.style.backgroundColor = "#eee"

    dropArea.addEventListener("dragover", (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = "#ccc";
    });

    dropArea.addEventListener("dragleave", (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = "#eee";
    });

    dropArea.addEventListener("drop", (e) => {
        e.preventDefault();
        dropArea.style.backgroundColor = "#eee";

        const file = e.dataTransfer.files[0];
        fileInput.files = e.dataTransfer.files;
        if (file.size > maxFileSize) {
        alert("La taille du fichier ne doit pas dépasser 4 mo.");
        return;
        }

        if (!allowedTypes.includes(file.type)) {
        alert("Le type de fichier doit être JPEG ou PNG.");
        return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            dropArea.style.backgroundImage = `url(${e.target.result})`;
            for (let i = 0; i < fileImgPlaceHolder.length; i++) {
                fileImgPlaceHolder[i].style.display = 'none';
            }
            
        };
        reader.readAsDataURL(file);
    });

    fileInput.addEventListener("change", (e) => {
        dropArea.style.backgroundColor = "#eee";
        const file = e.target.files[0];
        if (file.size > maxFileSize) {
        alert("La taille du fichier ne doit pas dépasser 4 mo.");
        return;
        }
        const allowedTypes = ["image/jpeg", "image/png"];
        if (!allowedTypes.includes(file.type)) {
        alert("Le type de fichier doit être JPEG ou PNG.");
        return;
        }
        const reader = new FileReader();
        reader.onload = (e) => {
            dropArea.style.backgroundImage = `url(${e.target.result})`;
            for (let i = 0; i < fileImgPlaceHolder.length; i++) {
                fileImgPlaceHolder[i].style.display = 'none';
            }
        };
        reader.readAsDataURL(file);
    });

    let isAddingProject = false;
    
    //  Traitement du Formulaire 
    btnAddProject.addEventListener('click', async event => {
        event.preventDefault();
        if (isAddingProject) {
            return; // Ignore les clics supplémentaires lorsque la fonction est en cours d'exécution
          }
          isAddingProject = true;

        const formData = new FormData();
        // Ajout des valeurs des champs à l'objet FormData
        formData.append('image', document.getElementById('fileInput').files[0]);
        formData.append('title', document.getElementById('title').value);
        formData.append('category', document.getElementById('FileCategorySelect').value);
        

        await addProject(formData);

        modalViews();
    });
   
    
  

}



