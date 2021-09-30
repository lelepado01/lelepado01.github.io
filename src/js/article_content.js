
var pageName = "../../pages/" + document.URL.split("=")[1] + ".txt";

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
    createArticleContent(
        createArticleSidebar() 
    ); 
});