import {fillContainer} from './main.js';
const JSON_PATH = './jsons/articles.json';
const CONTAINER_ID = 'articlesContainer';
const ID_PREFIX = "articleNo";
const LINK_TEXT = "Link to the article";

window.addEventListener('load',fillContainer(JSON_PATH,CONTAINER_ID,ID_PREFIX,LINK_TEXT));

