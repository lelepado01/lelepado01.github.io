
var Converter = new showdown.Converter();

$(document).ready(function(){
    var page = document.URL.split("=")[1]; 
    if (page.includes("#")) page = page.split("#")[0]; 
    var pageName = "../../" + UPDATES_FOLDER + page + ".md";

    $(PAGE_CONTAINER).prepend($("<h2>").text(page.replace("%20", " ")));
    createUpdateContent(pageName); 
});

function createUpdateContent(pagePath){

    fetch(pagePath).then((r) => r.blob().then((b)=>{
        var reader = new FileReader();
        reader.readAsText(b);

        reader.onload = function(){
            var fileString = reader.result;
            $(UPDATE_BODY).append(Converter.makeHtml(fileString));    
        };
    })
);

}
