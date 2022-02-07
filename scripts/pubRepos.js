import {fillContainer} from './main.js';
const JSON_PATH = './jsons/pubRepos.json';
const CONTAINER_ID = 'pubReposContainer';
const ID_PREFIX = "repoNo";
const LINK_TEXT = "Link to the repo";

window.addEventListener('load',fillContainer(JSON_PATH,CONTAINER_ID,ID_PREFIX,LINK_TEXT));