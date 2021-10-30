
function createArticleBox(articlePath){
    var title = $("<a>").text(getFileNameFromPath(articlePath)); 
    var articleElement = $("<li>").append(title); 
    
    articleElement.click(function(){
        $(ARTICLE_VIEWED).show(); 
        createArticlePreview(articlePath);
    }); 

    return articleElement; 
}


function fillArticleDescription(articleName){
    fetch("pages" + articleName + ".md").then((r) => r.blob().then((b)=>{
        var reader = new FileReader();
        reader.readAsText(b);

        reader.onload = function(){
            var fileLines = reader.result.split("\n");

            for (let i = 0; i < fileLines.length; i++) {
                if (fileLines[i].includes(DESCRIPTION_SECTION_TAG)){
                    $(ARTICLE_VIEWED).prepend(
                        $("<p>").text(fileLines[i].replace(DESCRIPTION_SECTION_TAG, ""))
                    );  
                }                
            }
        };
    }));
}


function createArticlePreview(articlePath){
    $(ARTICLE_VIEWED).empty(); 

    var articleBtn = $("<div>", {"class": "info_button"}).text("View full Article"); 
    articleBtn.click(function(){
        GoToPage(HTML_FOLDER + "article.html?page=" + articlePath);
    }); 

    $(ARTICLE_VIEWED).append(articleBtn); 

    fillArticleDescription(articlePath);  
}


function getArticleList(file_tree_structure, prefix){
    var ls = []; 

    if (file_tree_structure.items){
        for (let i = 0; i < file_tree_structure.items.length; i++) {

            var tmpprefix = prefix + "/";
            if (file_tree_structure.name) {
                tmpprefix += file_tree_structure.name; 
            } 
            
            var subls = getArticleList(file_tree_structure.items[i], tmpprefix); 
            subls.forEach((elem)=>{ls.push(elem)}); 
        }
    } else {
        ls.push(prefix + "/" + file_tree_structure.name); 
    }

    return ls; 
}


function selectRandomArticles(file_tree_structure){
    var article_ls = getArticleList(file_tree_structure, ""); 
    var selectedArticles = []; 

    for (let i = 0; i < RECOMENDED_ARTICLE_NUMBER; i++) {
        var r = Math.floor(Math.random() * article_ls.length); 
        selectedArticles.push(article_ls[r]);
        article_ls = article_ls.filter((x) => {return x != article_ls[r]});  
    }

    return selectedArticles; 
}


$(document).ready(function(){

    $(ARTICLE_VIEWED).hide(); 

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