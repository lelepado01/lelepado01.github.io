
var Converter = new showdown.Converter();

var completeHtml = '';
var cachedText = ''; 

$(document).ready(function(){
    var page = document.URL.split("=")[1]; 
    if (page.includes("#")) page = page.split("#")[0]; 
    var pageName = PAGES_FOLDER + page + ".md";

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

function createNote(text){
    text = text.replace(NOTE_SECTION_TAG, "");
    return '<div class="note">' + "<b>Note:</b> " + text + '</div>'; 
}

function parseArticleLine(line){
    if (line.includes(DESCRIPTION_SECTION_TAG)) {
        return; 
    } else if (line.includes(CODE_SECTION_TAG)) {
        completeHtml += Converter.makeHtml(cachedText); 
        cachedText = ''; 

        var filepath = line.split(" ")[2]; 
        cachedText += '<div id="' + filepath + '"></div>';  
    } else if (line.includes(NOTE_SECTION_TAG)) {
        line = line.replace(NOTE_SECTION_TAG, ""); 
        cachedText += createNote(line);
    } else {
        cachedText += line + "\n";
    }
}


function convertArticleFromTextToHtml(textData){
    var textDataLines = textData.split("\n"); 

    for (let i = 0; i < textDataLines.length; i++) {
        parseArticleLine(textDataLines[i]); 
    }

    if (cachedText != "") completeHtml += Converter.makeHtml(cachedText); 
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
    
    var related = Converter.makeHtml(relatedArticlesMarkdown)
    related = related.replace("<ul>", "");
    related = related.replace("</ul>", "");
    related = related.split("<li>");
    
    var related_list = $("<ul>"); 
    for (let i = 0; i < related.length; i++) {
        let articleName = related[i].replace("</li>", ""); 
        
        if (articleName == "\n")continue; 

        related_list.append(
            $("<li>").append(
                $("<a>", {href: "article.html?page=" + articleName}).text(articleName)
            )
        ); 
    }

    $(ARTICLE_SIDEBAR).append(related_list); 
}

