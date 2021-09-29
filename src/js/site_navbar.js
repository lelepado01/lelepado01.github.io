
var pages = [
    "The Dinger",
    "Home",
    "Articles",
    "Updates"
];

var pageLinks = [
    "",
    "index.html",
    "articles.html",
    "updates.html",
    ""
];


function getRelativePathToPage(pageLink, currentPage){
    var home = "index.html";
    if (currentPage == home && pageLink != home){
        return "html/" + pageLink; 
    } else if (currentPage != home && pageLink == home) {
        return "../../" + pageLink
    }

    return pageLink; 
}

function createNavbarItem(index) {
    var item;
    var linkToPage = getRelativePathToPage(pageLinks[index], document.URL.split("/").pop());
    if (index == 0) item = $("<li>", {id:"title"}).text(pages[index]);
    else item = $("<li>").append($("<a>", {href:linkToPage}).text(pages[index]));; 
    return item; 
}

$(document).ready(function(){

    var ls = $("<ul>"); 

    for (let i = 0; i < pages.length; i++) {
        ls.append(createNavbarItem(i));
    }

    var container = $("<div>", {class:"nav"}).append(ls); 
    $("#site_navbar").append(container)

});