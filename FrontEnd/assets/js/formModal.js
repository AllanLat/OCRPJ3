// /*
// *** File form modal
//  */ 
import { viewsCategory } from "./api.js";
import { addProject } from "./api.js";

export async function modalFormViews() {

    const goBack = document.querySelector('.goBack');
    goBack.style.visibility = 'visible';

    const formParent = document.querySelector(".content");
    formParent.innerHTML = '';

    const buttonValidation = document.querySelector('#addPhoto');
    buttonValidation.innerText = 'Enregistrer';

    const form = document.createElement('form');
    form.id = 'FormAddProject';

    const dropArea = document.createElement('div');
    dropArea.id = 'dropArea';

        const inputFile = document.createElement('input');
        inputFile.type = 'file';
        inputFile.name = 'image';
        inputFile.id = 'fileInput';
        inputFile.accept = 'image/*';

        const imgFile = document.createElement('img');
        imgFile.id = 'imgFileNone';
        imgFile.className = 'fileZoneInfo';
        imgFile.src = 'assets/images/placeholder-file.png';

        const buttonInputFile = document.createElement('button');
        buttonInputFile.id = 'btnInputFile';
        buttonInputFile.className = ' fileZoneInfo';
        buttonInputFile.innerText = '+ Ajouter une photo';

        const smallFile = document.createElement('small');
        smallFile.className = 'fileZoneInfo';
        smallFile.innerText = 'jpg, png : 4 mo max';

    const labelTitle = document.createElement('label');
    labelTitle.innerText = 'Titre';
    labelTitle.for = 'title';

    const inputTitle = document.createElement('input');
    inputTitle.type = 'text';
    inputTitle.name = 'title';
    inputTitle.id = 'title';


    const labelSelect = document.createElement('label');
    labelSelect.innerText = 'Catégorie';
    labelSelect.for = 'category';

    const inputSelect = document.createElement('select');
    inputSelect.name = 'category';
    inputSelect.id = 'FileCategorySelect';


    formParent.appendChild(form);

        dropArea.appendChild(inputFile);
        dropArea.appendChild(imgFile);
        dropArea.appendChild(buttonInputFile);
        dropArea.appendChild(smallFile);

    form.appendChild(dropArea);  

    form.appendChild(labelTitle);
    form.appendChild(inputTitle);

    form.appendChild(labelSelect);
    form.appendChild(inputSelect);

     // Create a loop 
     const optionsCategory = await viewsCategory();
     console.log(optionsCategory)
     for (let i = 0; i < optionsCategory.length;i++) {
        const option = document.createElement('option');
        option.value =  optionsCategory[i].id;
        option.innerText = optionsCategory[i].name;
        inputSelect.appendChild(option);
     }
    
    const fileInput = document.getElementById("fileInput");
    const fileImgPlaceHolder = document.querySelectorAll(".fileZoneInfo");

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
        alert("La taille du fichier ne doit pas dépasser 4 Ko.");
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
        alert("La taille du fichier ne doit pas dépasser 4 Ko.");
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

    buttonInputFile.addEventListener('click', function() {
        console.log('test');
        fileInput.click();
    });

    modalForSaveData();
}

function modalForSaveData() {
    const form = document.querySelector("#FormAddProject");
  let data = {};
const btnValidation = document.querySelector("#addPhoto");

btnValidation.addEventListener("click", (e) => {
        e.preventDefault();
        let elements = form.elements;

        for (let i = 0; i < elements.length; i++) {
            let element = elements[i];
            if (element.type !== "submit") {
                data[element.name] = element.value;
            }
        }
        
        console.log(elements);
        addProject(elements);
        
    });
}

