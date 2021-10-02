
var pages = [
    {name:"The Dinger",link: ""},
    {name:"Home",link: "index.html"},
    {name:"Articles",link: "articles.html"},
    {name:"Updates",link: "updates.html"}
];

function createNavbarItem(index) {
    var item;
    var linkToPage = getRelativePathToPage(pages[index].link);

    if (index == 0) {
        item = $("<li>", {id:"title"}).text(pages[index].name);
    } else {
        item = $("<li>").append($("<a>", {href:linkToPage}).text(pages[index].name));
    }

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