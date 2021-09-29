
var pages = [
    "The Dinger",
    "Home",
    "Articles",
    "Updates"
];

var pageLinks = [
    "",
    "index.html",
    "html/articles.html",
    "html/updates.html",
    ""
];


function createNavbarItem(index) {
    var item;
    if (index == 0) item = $("<li>", {id:"title"}).text(pages[index]);
    else item = $("<li>").append($("<a>", {href:pageLinks[index]}).text(pages[index]));; 
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