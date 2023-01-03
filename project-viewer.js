import {projects} from './data.js';

const queryString = window.location.search;
const urlParams = new URLSearchParams(queryString);

const pNum = urlParams.get('project');

function getProjectByProjectNumber(projectNumber, projectList) {
    for (const p in projectList) {
        if (projectList[p].projectNumber === projectNumber) {
            return projectList[p]
        }
    }
}

const project = getProjectByProjectNumber(pNum, projects);

const iFrame = document.createElement("iframe");
iFrame.title = "BIM Viewer";
iFrame.src = project.projectLink;

const container = document.querySelector(".container")
container.appendChild(iFrame)