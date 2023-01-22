// Authentification et stockage dans une variable de Session.
let TokenSauvegarde;

async function createconnection(emailReq, mpReq) {

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
      }).catch(console.error(Error));

      const result = await Reponse.json();
     if (Reponse.status == 200) {
        return result.token;
     }
     else {
       return "Erreur de connexion";
     }
}

