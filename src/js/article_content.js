
var pageName = "../../pages/" + document.URL.split("=")[1] + ".txt";

$(document).ready(function(){

    console.log(pageName);

    var converter = new showdown.Converter();

    fetch(pageName).then(function(r){
        var reader = new FileReader();
        reader.readAsText(r.blob());

        reader.onload(function(evt){
            var fileString = evt.target.result;
            $("#article_content").html(converter.makeHtml(fileString));
        });
    });

});