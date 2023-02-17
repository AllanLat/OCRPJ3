const navigation = document.querySelector('nav');
navigation.id = "nav";

const btnLink = document.querySelector("#nav");
const listNav = btnLink.querySelector("ul");

const linkContact = listNav.children[1];

linkContact.addEventListener('click', function() {
    window.location.href = 'index.html#contact';
})

const home = listNav.children[0];
home.addEventListener('click', function(){
    window.location.href = 'index.html';
})


const login = listNav.children[2];
if (sessionStorage.getItem('TokenAuth0')) {
    login.innerText = 'logout';
}

const publier = document.querySelector('#exitEditMode');

if(publier) {
    publier.addEventListener('click', function(){
    if (sessionStorage.getItem('TokenAuth0')) {
        sessionStorage.clear('TokenAuth0');
        console.log(sessionStorage)
        window.location.href = "./login.html";
    }
    else {
        window.location.href = "./login.html";
    }
})

}


login.addEventListener('click', function(){
    if (sessionStorage.getItem('TokenAuth0')) {
        sessionStorage.clear('TokenAuth0');
        console.log(sessionStorage)
        window.location.href = "./login.html";
    }
    else {
        window.location.href = "./login.html";
    }
})
