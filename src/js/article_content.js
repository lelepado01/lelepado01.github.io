
var pageName = "../../pages/" + document.URL.split("=")[1] + ".txt";

$(document).ready(function(){

    console.log(pageName);

    var converter = new showdown.Converter();

    fetch(pageName).then((r) => r.blob().then((b)=>{
            var reader = new FileReader();
            reader.readAsText(b);
    
            reader.onload = function(evt){
                var fileString = reader.result;
                $("#article_content").html(converter.makeHtml(fileString));
            };
        })
    );

});