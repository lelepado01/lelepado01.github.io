
function getRelativePathToPage(pageLink){

    var currentPage = document.URL; 

    if (!currentPage.includes("src/html") && pageLink != "index.html"){
        return "src/html/" + pageLink; 
    } else if (currentPage.includes("src/html") && pageLink == "index.html") {
        return "../../" + pageLink;
    }

    return pageLink; 
}
