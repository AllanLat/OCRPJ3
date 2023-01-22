// Import des scripts 

// Import API 
import "./assets/js/api.js";

// Import Fichier relatif au project
import "./assets/js/project.js";

// Import Login 
import "./assets/js/login.js";




const navigation = document.querySelector('nav');
navigation.id = "nav";

const btnLink = document.querySelector("#nav");
const listNav = btnLink.querySelector("ul");


const login = listNav.children[2];
login.addEventListener('click', function(){
    window.location.href = 'login.html';
})

const home = listNav.children[0];
home.addEventListener('click', function(){
    window.location.href = 'index.html';
})


