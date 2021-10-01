
var pages = [
    {name:"The Dinger",link: ""},
    {name:"Home",link: "index.html"},
    {name:"Articles",link: "articles.html"},
    {name:"Updates",link: "updates.html"}
];


function getRelativePathToPage(pageLink, currentPage){
    var home = "index.html";
    if ((currentPage.includes(home) || !currentPage.includes("src")) && pageLink != home){
        return "src/html/" + pageLink; 
    } else if (!currentPage.includes(home) && pageLink == home) {
        return "../../" + pageLink;
    }

    return pageLink; 
}

function createNavbarItem(index) {
    var item;
    var linkToPage = getRelativePathToPage(pages[index].link, document.URL.split("/").pop());

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