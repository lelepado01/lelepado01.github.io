
function getRelativePathToPage(pageLink, currentPage){
    if (!currentPage.includes("src") && pageLink != "index.html"){
        return "src/html/" + pageLink; 
    } else if (!currentPage.includes("src") && pageLink == "index.html") {
        return "../../" + pageLink;
    }

    return pageLink; 
}
