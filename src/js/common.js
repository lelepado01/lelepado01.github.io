
function GetRelativePathToPage(pageLink){

    var currentPage = document.URL; 

    if (!currentPage.includes(HTML_FOLDER) && pageLink != "index.html"){
        return HTML_FOLDER + pageLink; 
    } else if (currentPage.includes(HTML_FOLDER) && pageLink == "index.html") {
        return "../../" + pageLink;
    }

    return pageLink; 
}

function IsHomepage(){
    return !document.URL.includes("src");
}

function GoToPage(page){
    document.location.replace(page); 
}

async function getFileAtPath(path){
    return await $.get(path, function(data) {
        return data;
    });
}