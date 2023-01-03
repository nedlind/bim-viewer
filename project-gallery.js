import {projects} from './data.js';

function createCard(project) {
    // Project Number
    const pNumber = document.createElement("h2");
    pNumber.append(document.createTextNode(project.projectNumber));

    //Project Name
    const pName = document.createElement("h3");
    pName.append(document.createTextNode(project.projectName));

    // Thumbnail Image
    const pImg = document.createElement("img");
    pImg.src = project.thumbnailImage;

    // Link
    const pLink = document.createElement("a");
    pLink.href = "./viewer.html" + "?project=" +  project.projectNumber;
    pLink.className = "link";
    

    // Card
    const card = document.createElement("div");
    card.className = "card";

    pLink.appendChild(card);
    card.appendChild(pNumber);
    card.appendChild(pName);
    card.appendChild(pImg);
    
    return pLink
}

const container = document.querySelector(".container")

for (const p in projects) {
    const card = createCard(projects[p])
    container.appendChild(card)
}





