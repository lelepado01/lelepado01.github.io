
/* Folder Paths */
const UPDATES_FOLDER = "updates/"; 
const ARTICLES_FOLDER = "articles/"
const HTML_FOLDER = "src/html/";
const PAGES_FOLDER = "../../pages/"

/* Custom Markdown Tags */
const DESCRIPTION_SECTION_TAG = "###### descriptionsection"; 
const RELATED_TAG = "###### relatedsection";
const CODE_SECTION_TAG = "###### codesection"; 
const NOTE_SECTION_TAG = '###### notesection';

/* Components in index.html */
const ARTICLE_LIST = "#article_list_container"; 
const ARTICLE_VIEWED = "#viewed_article"; 

/* Components in article.html */
const ARTICLE_SIDEBAR = "#article_sidebar"; 
const ARTICLE_BODY = "#article_content"; 

/* Components in update.html */
const UPDATE_BODY= "#update_content";

/* Components in updates.html */
const UPDATE_LIST = "#update_list_container";

const PAGE_CONTAINER = "#page_content";
const NAVBAR_CONTAINER = "#site_navbar"

const SiteNavbarItems = [
    {name:"The Dinger",link: ""},
    {name:"Home",link: "index.html"},
    {name:"Articles",link: "articles.html"},
    {name:"Updates",link: "updates.html"}
];


const Articles = [
    "Quadtree",
    "2D Engine 0",
    "2D Engine 1: Window management",
    "2D Engine 2: Event handling",
    "2D Engine 3: Drawing textures",
    "2D Engine 4: Drawing primitives",
    "2D Engine 5: Handling Time", 
    "Isometric Tilemap", 
];

const Updates = [
    "2D Engine"
];