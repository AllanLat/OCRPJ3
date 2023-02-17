// Authentification et stockage dans une variable de Session.
import { callApiProjectsCategories } from "./project.js";
import { modalViews } from "./modal.js";

let TokenSauvegarde;

const form = document.querySelector('#loginForm');
const alertMessage = document.createElement('h2');

export async function createconnection(emailReq, mpReq) {

    // controle les variables email et mp 
    const emailVerif = emailReq; 
    const mpVerif = mpReq;

    // faire un appel fetch en js 
    const Reponse = await fetch('http://localhost:5678/api/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email: emailVerif, password: mpVerif })
      });


    if (!Reponse.ok) {

        alertMessage.className = 'alertLogin';
        const placementMessage = form.childNodes[2];
       
        if(Reponse.status === 404){
            alertMessage.innerText = 'Erreur dans l’identifiant ou le mot de passe';
            
        } else {
            alertMessage.innerText = 'Erreur dans l’identifiant ou le mot de passe';
        } 
        
        form.insertBefore(alertMessage, placementMessage);
    }

    const result = await Reponse.json();
     if (Reponse.status === 200) {
        TokenSauvegarde = result.token;
        // Redirect vers la page d'accueil 
        sessionStorage.setItem('TokenAuth0', TokenSauvegarde);
        window.location.pathname = "./FrontEnd/index.html";

     }
}

export async function deletedProduct(dataId){
  const token = sessionStorage.getItem('TokenAuth0');

  if(window.confirm("Voulez-vous vraiment supprimer le projet ?")) {
    const rep = await fetch(`http://localhost:5678/api/works/${dataId}`, {
      method: 'DELETE',
      headers: {
          'Authorization': `Bearer ${token}`,
      }
  });

  if(rep.status === 204) {
     await callApiProjectsCategories();
    
  }
  else {
    console.log(rep.status);
     alert('Une erreur est survenue');
  }

  }
  

}

export async function viewsCategory(){
  const categorys = await fetch('http://localhost:5678/api/categories');
  const category = await categorys.json();

  if (categorys.status === 200) {
    //console.log(category);
    return category;
  } else {
    return false;
  }

}

export async function addProject(datas){
  const token = sessionStorage.getItem('TokenAuth0');
  console.log(datas)
  const rep = await fetch('http://localhost:5678/api/works', {
      method: 'POST',
      headers: {
      'Authorization': `Bearer ${token}`
      },
      body: datas
    });

  if(rep.status === 201) {
    await callApiProjectsCategories();
  }
  else {
    console.log(rep);
     alert('Une erreur est survenue');
  }

}