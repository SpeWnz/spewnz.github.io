import {fillContainer} from './main.js';
const JSON_PATH = './jsons/guides.json';
const CONTAINER_ID = 'guidesContainer';
const ID_PREFIX = "guideNo";
const LINK_TEXT = "Link to the guide";

window.addEventListener('load',fillContainer(JSON_PATH,CONTAINER_ID,ID_PREFIX,LINK_TEXT));