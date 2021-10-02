
function createUpdateBox(index){
    var updateElement = $("<li>").append($('<a>').text(Updates[index])); 
    updateElement.click(function(){
        document.location.replace("update.html?page=" + Updates[index]);
    });

    return updateElement; 
}


$(document).ready(function(){

    var ls = $("<ul>"); 
    
    for (let i = 0; i < Updates.length; i++) {
        var boxElement = createUpdateBox(i); 
        ls.append(boxElement); 
    }
    
    $(UPDATE_LIST).append(ls);
});
