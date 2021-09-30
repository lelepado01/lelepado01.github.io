
function createArticleSidebar(){
    var header_list = document.getElementsByTagName("h1"); 

    var ls = $("<ul>")
    for (let i = 0; i < header_list.length; i++) {
        ls.append(
            $("<li>").append($("<a>", {href:"#" + header_list[i].innerText}).text(header_list[i].innerText))
        )
    }

    $("#article_sidebar").append(ls);
}