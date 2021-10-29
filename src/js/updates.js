
function createUpdateBox(updatePath){
    var updateElement = $("<li>").append($('<a>').text(getFileNameFromPath(updatePath))); 
    updateElement.click(function(){
        GoToPage("update.html?page=" + getFileNameFromPath(updatePath));
    });

    return updateElement; 
}

function getUpdateList(file_tree_structure, prefix){
    var ls = []; 

    if (file_tree_structure.items){
        for (let i = 0; i < file_tree_structure.items.length; i++) {

            if (file_tree_structure.name) {
                prefix = prefix + "/" + file_tree_structure.name; 
            }
            
            var subls = getUpdateList(file_tree_structure.items[i], prefix); 
            subls.forEach((elem)=>{ls.push(elem)}); 
        }
    } else {
        ls.push(prefix + "/" + file_tree_structure.name); 
    }

    return ls; 
}


$(document).ready(function(){ 
    
    getFileAtPath(UPDATES_STRUCTURE_PATH).then(function(file_tree_structure){

        var ls = $("<ul>"); 
        var updates = getUpdateList(file_tree_structure, ""); 
        console.log(updates); 
        for (let i = 0; i < updates.length; i++) {
            ls.append(createUpdateBox(updates[i])); 
        }

        $(UPDATE_LIST).append(ls);
    }); 
    
    
});
