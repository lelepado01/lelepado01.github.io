
function createNavbarItem(index) {
    var item;
    var linkToPage = GetRelativePathToPage(SiteNavbarItems[index].link);

    if (index == 0) {
        item = $("<li>", {id:"title"}).text(SiteNavbarItems[index].name);
    } else {
        item = $("<li>").append($("<a>", {href:linkToPage}).text(SiteNavbarItems[index].name));
    }

    return item; 
}

$(document).ready(function(){

    var ls = $("<ul>"); 
    for (let i = 0; i < SiteNavbarItems.length; i++) {
        ls.append(createNavbarItem(i));
    }

    var container = $("<div>", {class:"nav"}).append(ls); 
    $(NAVBAR_CONTAINER).append(container)

});