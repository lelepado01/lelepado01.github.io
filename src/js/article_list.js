
const DESCRIPTION_SECTION_TAG = "###### descriptionsection"; 

var articles = [];

var shortDescriptions = [];

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


async function createArticleList(){
    await fetch("../../pages").then((data)=> data.text().then((ls) => {
        
        var fileLines = ls.split("\n"); 
        for (let i = 0; i < fileLines.length; i++) {
            if (fileLines[i].includes("<li><a")){

                var currentLine = fileLines[i].replace("</a></li>", "").replace("<li>","");
                currentLine = currentLine.substr(currentLine.indexOf(">")+1); 
                currentLine = currentLine.replace(".txt", ""); 

                articles.push(currentLine); 
            }
        }
    }));
}

async function createArticleDescriptionList(){
    
    for (let i = 0; i < articles.length; i++) {
        var descriptionFound = false; 
        await fetch("../../pages/" + articles[i] + ".txt").then((data) => data.text().then((fileContent) => {
            var fileLines = fileContent.split("\n"); 
            for (let line = 0; line < fileLines.length; line++) {
                if (fileLines[line].includes(DESCRIPTION_SECTION_TAG)){
                    shortDescriptions[i] = fileLines[line].replace(DESCRIPTION_SECTION_TAG, ""); 
                    descriptionFound = true; 
                    break; 
                }
            }
        }));

        if (!descriptionFound) shortDescriptions[i] = "No description found"; 
    }

}

$(document).ready(function(){

    createArticleList().then(() => createArticleDescriptionList().then(() => {
        var ls = $("<ul>"); 
    
        for (let i = 0; i < articles.length; i++) {
            ls.append(createArticleBox(i)); 
        }
        
        var container = $("<div>", {class:"box_list"}).append(ls); 
        $("#article_list_container").append(container); 
    
        createViewedArticleDescription(0); 
    }));  
});
