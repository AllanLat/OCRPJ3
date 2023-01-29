// Edit mode and modal function.

if(sessionStorage.getItem('TokenAuth0')) {
    const classEdit = document.getElementsByClassName("edit");
    for (var i = 0; i < classEdit.length; i++) {
        classEdit[i].style.display = "block";
    }

    const editBar = document.querySelector('#editBar');
    editBar.style.display = "flex";

    document.head.innerHTML += '<link href="./assets/css/edit.css" type="text/css" rel="stylesheet">';


    const editProject = document.querySelector('#editProject');
    editProject.style.display = "inline";

    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '100px 0px';













}
else {
    const headerMargin = document.querySelector('header');
    headerMargin.style.margin = '50px 0px';
}
