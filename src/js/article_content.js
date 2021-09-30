
var page = document.URL.split("=")[1]; 
if (page.includes("#")) page = page.split("#")[0]; 
var pageName = "../../pages/" + page + ".txt";

function createArticleContent(callback){
    var converter = new showdown.Converter();

    fetch(pageName).then((r) => r.blob().then((b)=>{
            var reader = new FileReader();
            reader.readAsText(b);
    
            reader.onload = function(){
                var fileString = reader.result;
                $("#article_content").html(converter.makeHtml(fileString));

                if (callback) callback(); 
            };
        })
    );
}

$(document).ready(function(){
    createArticleContent(function(){
        createArticleSidebar(); 
    }); 
});