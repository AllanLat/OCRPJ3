// Authentification et stockage dans une variable de Session.
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
            alertMessage.innerText = 'Utilisateur non reconnu';
            
        } else {
            alertMessage.innerText = 'Utilisateur ou mot de passe non reconnu';
        } 
        
        form.insertBefore(alertMessage, placementMessage);
    }

    const result = await Reponse.json();
     if (Reponse.status === 200) {
        TokenSauvegarde = result.token;
        // Redirect vers la page d'accueil 
        sessionStorage.setItem('TokenAuth0', TokenSauvegarde);
        window.location.pathname = "/FrontEnd/index.html";

     }
}

