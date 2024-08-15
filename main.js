
const sentences_phrases = [
    "{} hits on someone",
    "{} hits on a minor",
    "{} gets sunburned",
    "Unknow person dies (no one's fault)",
    "Unknow person dies ({}'s fault)",
    "Collective fight", 
    "Collective fight involving Marzio",
    "{} gets into a fight", 
    "{} gets into a monopoly fight",
    "{} gets into a monopattino accident",
    "Fata turchina 2", 
    "Bresco forgets {}", 
    "Marzio forgets {}", 
    "{} faints from the heat", 
    "{} loses the phone", 
    "{} doesn't buy the ticket", 
    "{} gets fined (any reason)", 
    "Bresco's grandpa cuddling {}", 
    "{} is stung by a jellyfish", 
    "{} flees the vacation", 
    "{} sneaks a jellyfish into Gioele's costume", 
    "{} gets lost in the pineta", 
    "Sun umbrella flies away 3+ times", 
    "{} misses the train", 
    "Lorenzo B builds a sand castle",
    "Marzio builds a better sand castle", 
    "Marzio cooks risotto", 
    "{} hit by a meteor", 
    "{} hit by a motorcycle", 
    "{} gets sick", 
    "{} gets food poisoning", 
    "Bresco's grandpa has a turtle (any meaning)", 
    "{} hit by a car", 
    "{} chokes Marzio", 
    "{} chokes Bresco",
    "{} chokes both at the same time", 
    "{} chokes himself",
    "Bresco baths in Fosso Burlamacca (real place, look it up)",
    "Trip to lake Massaciuccoli (real place, look it up)",
    "Bresco's grandpa skinny dipping",
    "{} brings a souvenir to the office",
]; 

const points_for_phrase = [
    5, 50, 10, 50, 100, 20, 15, 20, 10, 30, 20, 10, 10, 25, 15, 15, 10, 100, 80, 50, 150, 75, 30, 10, 40, 20, 15, 150, 100, 20, 50, 150, 150, 100, 100, 150, 10, 50, 30, 200, 200 
]

// Function to create sentence items and append to pool
function populateSentencePool() {
    sentences_phrases.forEach((sentence, index) => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';
        sentenceItem.draggable = true;
        sentenceItem.id = `sentence-${index + 1}`;
        sentenceItem.textContent = sentence;

        const p = document.createElement('p');
        p.classList.add('point-banner');
        p.textContent = `${points_for_phrase[index]}` + " points";

        sentenceItem.appendChild(p);
        
        sentencePool.appendChild(sentenceItem);
    });
}

// Call the function to populate the pool
const sentencePool = document.getElementById('sentence-pool');
populateSentencePool();
const bingoCells = document.querySelectorAll('.bingo-cell');

let draggedItem = null;
let currentCell = null;
let editedItem = null;
let grid = null;
let firstTime = true;

document.querySelectorAll('.sentence-item').forEach(sentence => {
    sentence.addEventListener('dragstart', dragStart);
    sentence.addEventListener('dragend', dragEnd);
});

bingoCells.forEach(cell => {
    cell.addEventListener('dragover', dragOver);
    cell.addEventListener('dragleave', dragLeave);
    cell.addEventListener('drop', dropOnBingoCell);
});

sentencePool.addEventListener('dragover', dragOver);
sentencePool.addEventListener('drop', dropInPool);

document.getElementById('save-button').addEventListener('click', saveConfiguration);
// Handle modal submission
document.getElementById('submit-input').addEventListener('click', function() {
    const userInput = document.getElementById('user-input').value.trim();
    if (userInput && currentCell) {
        editedItem.oldTextContent = editedItem.innerHTML;
        editedItem.innerHTML = str_replace(editedItem.innerHTML.trim(), '{}', userInput);

        grid.appendChild(editedItem);
        
        grid = null; // Clear the grid
        editedItem = null; // Clear the edited item
        currentCell = null; // Clear the current cell
        $("#modal-text-contaner").text("");
        $('#inputModal').modal('hide'); // Hide the modal
    }

    document.getElementById('user-input').value = ''; // Clear the input field
});

// Handle clear map button
document.getElementById('clear-map-button').addEventListener('click', function() {
    const bingoCells = document.querySelectorAll('.bingo-cell');
    bingoCells.forEach(cell => {
        if (cell.hasChildNodes()) {
            const existingElement = cell.firstChild;
            if (existingElement.oldTextContent) {
                existingElement.innerHTML = existingElement.oldTextContent;
                delete existingElement.oldTextContent;
            }
            // reset the style of the cell
            cell.style.backgroundColor = '';
            sentencePool.appendChild(existingElement);
        }
    });
});

let userName = '';

document.getElementById('user-name').addEventListener('input', function() {
    userName = this.value;
}); 

document.getElementById('capture-button').addEventListener('click', function() {
    if (firstTime) {
        showMinecraftModal(); 
        return; 
    }

    html2canvas(document.body, {
        onrendered: function(canvas) {
            // Create an <a> element
            var link = document.createElement('a');
            link.href = canvas.toDataURL();
            link.download = 'webpage-snapshot.png';
            link.click();
        }
    });
});

function showMinecraftModal() {
    $('#minecraftModal').modal('show');
    firstTime = false;
}

function saveConfiguration() {
    if (firstTime) {
        showMinecraftModal(); 
        return; 
    }

    const bingoCells = document.querySelectorAll('.bingo-cell');
    let data = {};
    const bingoConfig = [];

    bingoCells.forEach(cell => {
        bingoConfig.push(cell.textContent.trim());
    });
    data['user'] = userName;
    data['bingo'] = bingoConfig;

    const jsonConfig = JSON.stringify(data, null, 2);

    // Trigger download
    const blob = new Blob([jsonConfig], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'bingo_configuration.json';
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

function dragStart(e) {
    draggedItem = e.target;
    e.dataTransfer.setData('text/plain', e.target.id);
    setTimeout(() => {
        e.target.style.display = 'none'; // Hide the dragged element
    }, 0);
}

function dragEnd(e) {
    setTimeout(() => {
        draggedItem.style.display = 'block'; // Show the dragged element again
    }, 0);
}

function dragOver(e) {
    e.preventDefault();
    // change the cursor to indicate that the element can be dropped
    e.dataTransfer.dropEffect = 'move';

    if (this.classList.contains('bingo-cell')) {
        this.style.backgroundColor = 'lightblue';
    }

    if (this.classList.contains('sentence-item')) {
        this.style.backgroundColor = 'lightgreen';
    }
}

function dragLeave(e) {
    e.preventDefault();
    this.style.backgroundColor = '';
}

function str_contains(str, substr) {
    return str.indexOf(substr) !== -1;
}

function str_replace(str, substr, replacement) {
    return str.replace(substr, replacement);
}

function dropOnBingoCell(e) {
    e.preventDefault();

    const cell = e.target;
    const id = e.dataTransfer.getData('text');
    draggedItem = document.getElementById(id);
    
    // If the cell has a child node, move it back to the pool
    if (this.hasChildNodes()) {
        sentencePool.appendChild(draggedItem);
        return; 
    }

    // Append the dragged element to the bingo cell
    if (str_contains(draggedItem.textContent.trim(), '{}')) {
        // Show modal for user input
        currentCell = cell; // Set the current cell
        editedItem = draggedItem;
        grid = this;
        $("#modal-text-contaner").text(draggedItem.textContent);
        $('#inputModal').modal('show'); // Show the modal
    } else {
        this.appendChild(draggedItem);
    }

}


function dropInPool(e) {
    e.preventDefault();
    if (draggedItem && e.target.classList.contains('sentence-item')) {
        // Re-arrange sentences within the pool
        if (draggedItem.oldTextContent) {
            draggedItem.innerHTML = draggedItem.oldTextContent;
            delete draggedItem.oldTextContent;
        }
        sentencePool.insertBefore(draggedItem, e.target.nextSibling);
    } else if (draggedItem) {
        if (draggedItem.oldTextContent) {
            draggedItem.innerHTML = draggedItem.oldTextContent;
            delete draggedItem.oldTextContent;
        }
        // Append the dragged item to the pool
        sentencePool.appendChild(draggedItem);
    }
}