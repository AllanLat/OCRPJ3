// Authentification et stockage dans une variable de Session.
let TokenSauvegarde;


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
        

        if(Reponse.status === 404){
          
        } else {
          
        }
    }

    const result = await Reponse.json();
     if (Reponse.status === 200) {
        TokenSauvegarde = result.token;
        // Redirect vers la page d'accueil 
        sessionStorage.setItem('TokenAuth0', TokenSauvegarde);
        window.location.pathname = "/FrontEnd/index.html";

     }
}

