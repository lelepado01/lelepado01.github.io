
function createArticleBox(article){
    var title = $("<a>").text(article); 
    var articleElement = $("<li>").append(title); 

    // articleElement.click(function(){
    //     GoToPage("article.html?page=" + article);
    // }); 
    
    articleElement.click(function(){
        createArticlePreview(article);
    }); 

    return articleElement; 
}

function createArticlePreview(articleName){
    $(ARTICLE_VIEWED).empty(); 
}

function getArticleList(file_tree_structure){
    var ls = []; 

    if (file_tree_structure.items){
        for (let i = 0; i < file_tree_structure.items.length; i++) {
            var subls = getArticleList(file_tree_structure.items[i]); 
            subls.forEach((elem)=>{ls.push(elem)}); 
        }
    } else {
        ls.push(file_tree_structure.name); 
    }

    return ls; 
}

function selectRandomArticles(file_tree_structure){
    var article_ls = getArticleList(file_tree_structure); 
    var selectedArticles = []; 

    for (let i = 0; i < RECOMENDED_ARTICLE_NUMBER; i++) {
        var r = Math.floor(Math.random() * article_ls.length); 
        selectedArticles.push(article_ls[r]);
        article_ls.filter((x) => {return x != article_ls[r]});  
    }

    return selectedArticles; 
}

$(document).ready(function(){

    getFileAtPath(ARTICLE_STRUCTURE_PATH).then(function(file_tree_structure){
        
        var selectedArticles = selectRandomArticles(file_tree_structure); 
        var ls = $("<ul>"); 

        for (let i = 0; i < selectedArticles.length; i++) {
            ls.append(createArticleBox(selectedArticles[i])); 
        }

        $(ARTICLE_LIST).append($("<h2>").text("Some Random Articles: "));
        $(ARTICLE_LIST).append(ls);
    });

});