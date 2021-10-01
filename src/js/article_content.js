
$(document).ready(function(){

    var page = document.URL.split("=")[1]; 
    if (page.includes("#")) page = page.split("#")[0]; 
    var pageName = "../../pages/" + page + ".txt";

    createArticleContent(pageName, (data) => {
        createArticleSidebar(data); 
    }); 
});

function createArticleContent(pagePath, callback){

    fetch(pagePath).then((r) => r.blob().then((b)=>{
            var reader = new FileReader();
            reader.readAsText(b);
    
            reader.onload = function(){
                var fileString = reader.result;

                convertArticleFromTextToHtml(fileString.split(RELATED_TAG)[0]); 
        
                var related_articles = fileString.split(RELATED_TAG)[1]; 
                if (callback) callback(related_articles); 
            };
        })
    );
}

function convertArticleFromTextToHtml(textData){
    var converter = new showdown.Converter();

    var textDataLines = textData.split("\n"); 

    var currentTextToParse = ""; 
    var completeHtml = "";

    for (let i = 0; i < textDataLines.length; i++) {
        if (textDataLines[i].includes(DESCRIPTION_SECTION_TAG)) continue; 

        if (!textDataLines[i].includes(CODE_SECTION_TAG)) {

            currentTextToParse += textDataLines[i] + "\n"; 
            
        } else {

            completeHtml += converter.makeHtml(currentTextToParse); 
            currentTextToParse = ""; 

            var filepath = textDataLines[i].split(" ")[2]; 
            completeHtml += '<div id="' + filepath + '"></div>';

        }
    }
    
    if (currentTextToParse != "") completeHtml += converter.makeHtml(currentTextToParse); 
    $(ARTICLE_BODY).html(completeHtml);

}

function createArticleSidebar(relatedArticlesMarkdown){
    var header_list = document.getElementsByTagName("h2"); 

    var chapter_list = $("<ul>");
    for (let i = 0; i < header_list.length; i++) {
        chapter_list.append(
            $("<li>").append($("<a>", {href:"#" + header_list[i].innerText.toLowerCase().replaceAll(" ", "")}).text(header_list[i].innerText))
        )
    }

    $(ARTICLE_SIDEBAR).append($("<h4>").text("Chapters"))
    $(ARTICLE_SIDEBAR).append(chapter_list);

    $(ARTICLE_SIDEBAR).append($("<hr>")); 
    $(ARTICLE_SIDEBAR).append($("<h4>").text("Related Articles")); 
    
    var converter = new showdown.Converter();
    $(ARTICLE_SIDEBAR).append(converter.makeHtml(relatedArticlesMarkdown)); 
}

