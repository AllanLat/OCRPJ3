// Views project.


async function viewsProject(){

    // GET in const Project.
    const projects = await fetch("http://localhost:5678/api/works");
    const worksJson = await projects.json();

    const gallery = document.querySelector(".gallery");
    gallery.innerHTML = ""; 

    // Create loop
    for(let i = 0; i < worksJson.length; i++) {
        
        const figure = document.createElement('figure');
        const img = document.createElement('img');
        const figCaption = document.createElement('figcaption');

        img.src = worksJson[i].imageUrl;
        img.alt = worksJson[i].title;
        img.crossOrigin = "anonymous";
        figCaption.innerText = worksJson[i].title;

        figure.appendChild(img);
        figure.appendChild(figCaption);
        gallery.appendChild(figure);

    }
    
}

// Appeler la function aillant une boucle 
viewsProject();
