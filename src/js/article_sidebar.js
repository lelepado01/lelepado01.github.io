
$(document).ready(function(){

    var converter = new showdown.Converter();

    $("#article_content").html(converter.makeHtml("# cioa \n mamma come sya"));

});