
var ShortDescriptions = [];

function createArticleBox(index){
    var articleElement = $("<li>").append($("<a>").text(Articles[index])); 
    articleElement.click(function(){
        createViewedArticleDescription(index);
    }); 
    return articleElement; 
}

function createViewedArticleDescription(index){
    $(ARTICLE_VIEWED).empty(); 
    $(ARTICLE_VIEWED).append($("<h2>").text(Articles[index]));
    $(ARTICLE_VIEWED).append($("<p>").text(ShortDescriptions[index]));

    var btn = $("<div>", {class:"info_button"}).text("View Article"); 
    btn.click(function(){
        document.location.replace("src/html/article.html?page=" + Articles[index]);
    });
    $(ARTICLE_VIEWED).append(btn); 
}

async function createArticleDescriptionList(){
    
    for (let i = 0; i < Articles.length; i++) {
        var descriptionFound = false; 
        await fetch("../../pages/" + Articles[i] + ".txt").then((data) => data.text().then((fileContent) => {
            var fileLines = fileContent.split("\n"); 
            for (let line = 0; line < fileLines.length; line++) {
                if (fileLines[line].includes(DESCRIPTION_SECTION_TAG)){
                    ShortDescriptions[i] = fileLines[line].replace(DESCRIPTION_SECTION_TAG, ""); 
                    descriptionFound = true; 
                    break; 
                }
            }
        }));

        if (!descriptionFound) ShortDescriptions[i] = "No description found"; 
    }

}

$(document).ready(function(){

    createArticleDescriptionList().then(() => {
        var ls = $("<ul>"); 
    
        for (let i = 0; i < Articles.length; i++) {
            ls.append(createArticleBox(i)); 
        }
        
        var container = $("<div>", {class:"box_list"}).append(ls); 
        $(ARTICLE_LIST).append(container); 
    
        createViewedArticleDescription(0); 
    });  
});
