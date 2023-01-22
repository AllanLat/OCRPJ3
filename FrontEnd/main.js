// Import des scripts 

// Import API 
import "./assets/js/api.js";

// Import Fichier relatif au project
import "./assets/js/project.js";

// Import Login 
import "./assets/js/login.js";

// import Header
import "./assets/js/header.js";
import { validateUrl } from "./assets/js/tools.js";


// Dans un fichier HEADER serai plus approprier
if (sessionStorage.getItem('TokenAuth0')) {
    alert('Vous êtes connecter');
}



