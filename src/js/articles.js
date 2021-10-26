
var ShortDescriptions = [];

var ARTICLE_STRUCTURE_PATH = PAGES_FOLDER + "articles.json";
const TOPIC_CONTAINER = "#topic_container"; 

function createArticleBox(name){
    var articleElement = $("<li>").append($("<a>").text(name)); 

    articleElement.click(function(){
        if (IsHomepage()){
            createViewedArticleDescription(name);
        } else {
            GoToPage("article.html?page=" + name);
        }
    }); 

    return articleElement; 
}

function createTopicBox(topic_structure){
    var articleElement = $("<li>").append($("<a>").text(topic_structure.name)); 

    articleElement.click(function(){
        $(ARTICLE_LIST).empty(); 
        $(ARTICLE_LIST).append(createArticleList(topic_structure.items)); 
    }); 

    return articleElement; 
}

function createArticleList(article_list){
    var ls = $("<ul>"); 
    for (let i = 0; i < article_list.length; i++) {
        ls.append(createArticleBox(article_list[i].name)); 
    }

    return ls; 
}

async function getFileAtPath(path){
    return await $.get(path, function(data) {
        return data;
    });
}

$(document).ready(function(){

    getFileAtPath(ARTICLE_STRUCTURE_PATH).then(function(file_tree_structure){

        var ls = $("<ul>"); 
        for (let i = 0; i < file_tree_structure.length; i++) {
            ls.append(createTopicBox(file_tree_structure[i])); 
        }

        $(TOPIC_CONTAINER).append(ls); 

        $(ARTICLE_LIST).append(
            createArticleList(file_tree_structure[0].items)
        ); 
    }); 
});
