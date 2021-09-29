
var articles = [
    "Quadtree",
    "Isometric Renderer",
    "Bla bla",
    "Particles"
];

var shortDescriptions = [
    "Ciao",
    "Ciaon w s",
    "Cia wwo",
    "Ciao ,aa," 
];

var currentArticle = 0; 

function createArticleBox(index){
    var articleElement = $("<li>").append($("<a>").text(articles[index])); 
    articleElement.click(function(){
        createViewedArticleDescription(index);
    }); 
    return articleElement; 
}

function createViewedArticleDescription(index){
    $("#viewed_article").empty(); 
    $("#viewed_article").append($("<h2>").text(articles[index]));
    $("#viewed_article").append($("<p>").text(shortDescriptions[index]));

    var btn = $("<div>", {class:"info_button"}).text("View Article"); 
    btn.click(function(){
        document.location.replace("src/html/article.html?page=" + articles[index]);
    });
    $("#viewed_article").append(btn); 
}

$(document).ready(function(){
    var ls = $("<ul>"); 
    
    for (let i = 0; i < articles.length; i++) {
        ls.append(createArticleBox(i)); 
    }
    
    var container = $("<div>", {class:"box_list"}).append(ls); 
    $("#article_list_container").append(container); 

    createViewedArticleDescription(0); 
});
