
function toggleHiddenArticleVisibility(hiddenElements, titleElement){
    if (hiddenElements.is(":hidden")) {
        hiddenElements.show(); 
        titleElement.text("- " + titleElement.text().replace("> ", ""));
    } else {
        hiddenElements.hide(); 
        titleElement.text("> " + titleElement.text().replace("- ", ""));
    }
}

function createArticleBox(article){
    var title = $("<a>").text(article.name); 
    var articleElement = $("<li>").append(title); 

    if (article.items){
        title.text("> " + article.name); 

        var hidden_ls = $("<ul>").css("display", "none");
        for (let i = 0; i < article.items.length; i++) {
            var hiddenArticle = createArticleBox(article.items[i]); 

            hiddenArticle.click(function(){
                GoToPage("article.html?page=" + article.items[i].name);
            }); 

            hidden_ls.append(hiddenArticle);
        }

        articleElement.click(function(){
            toggleHiddenArticleVisibility(hidden_ls, title); 
        }); 

        articleElement.append(hidden_ls); 

    } else {

        articleElement.click(function(){
            GoToPage("article.html?page=" + article.name);
        }); 
    }
    

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
        ls.append(createArticleBox(article_list[i])); 
    }

    return ls; 
}

$(document).ready(function(){

    getFileAtPath(ARTICLE_STRUCTURE_PATH).then(function(file_tree_structure){

        var ls = $("<ul>"); 
        for (let i = 0; i < file_tree_structure.items.length; i++) {
            ls.append(createTopicBox(file_tree_structure.items[i])); 
        }

        $(TOPIC_CONTAINER).append(ls); 

        $(ARTICLE_LIST).append(
            createArticleList(file_tree_structure.items[0].items)
        ); 
    }); 
    
});
