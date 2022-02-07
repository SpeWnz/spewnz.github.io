import {fillContainer} from './main.js';
const JSON_PATH = './jsons/myRepos.json';
const CONTAINER_ID = 'repoContainer';
const ID_PREFIX = "repoNo";
const LINK_TEXT = null;

window.addEventListener('load',fillContainer(JSON_PATH,CONTAINER_ID,ID_PREFIX,LINK_TEXT));

