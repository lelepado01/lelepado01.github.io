
var related_articles = [
    "Ciao"
]; 

function createArticleSidebar(){
    var header_list = document.getElementsByTagName("h1"); 

    var ls = $("<ul>")
    for (let i = 0; i < header_list.length; i++) {
        ls.append(
            $("<li>").append($("<a>", {href:"#" + header_list[i].innerText}).text(header_list[i].innerText))
        )
    }

    $("#article_sidebar").append($("<h2>").text("Chapters"))
    $("#article_sidebar").append(ls);

    $("#article_sidebar").append($("<hr>")); 
    $("#article_sidebar").append($("<h2>").text("Related Articles")); 
    
    for (let i = 0; i < related_articles.length; i++) {
        $("#article_sidebar").append(
            $("<li>").append($("<a>", {href:related_articles[i]}).text(related_articles[i]))
        )
    }
}