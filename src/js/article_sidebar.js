
var related_articles = [
    "Ciao"
]; 

function createArticleSidebar(){
    var header_list = document.getElementsByTagName("h1"); 

    var chapter_list = $("<ul>")
    for (let i = 0; i < header_list.length; i++) {
        chapter_list.append(
            $("<li>").append($("<a>", {href:"#" + header_list[i].innerText}).text(header_list[i].innerText))
        )
    }

    $("#article_sidebar").append($("<h4>").text("Chapters"))
    $("#article_sidebar").append(chapter_list);

    $("#article_sidebar").append($("<hr>")); 
    $("#article_sidebar").append($("<h4>").text("Related Articles")); 
    
    var related_articles_list = $("<ul>");
    for (let i = 0; i < related_articles.length; i++) {
        related_articles_list.append(
            $("<li>").append($("<a>", {href:related_articles[i]}).text(related_articles[i]))
        )
    }

    $("#article_sidebar").append(related_articles_list); 
}