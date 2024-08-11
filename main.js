
const sentences_phrases = [
    "Fata turchina 2", 
    "{} approccia qualcuno/a",
    "{} approccia minore", 
    "Tizio schiattato (colpa di nessuno)", 
    "Tizio schiattato colpa di X", 
    "Litigio collettivo", 
    "Litigio collettivo centra marzio", 
    "X fa incidente in monopattino", 
    "X dimentica y", 
    "X sviene per il caldo", 
    "X perde il telefono", 
    "X non prende il biglietto", 
    "X viene multato", 
    "Bresco senior cuddling X", 
    "X viene punto da medusa", 
    "Gioele strozza entrambi contemporaneamente", 
    "X fugge dalla vacanza", 
    "X mette medusa nel costume di Y", 
    "X si perde nella pineta", 
    "Ombrellone vola via 3+ volte", 
    "Marzio fa castello di sabbia grande 4 volte", 
    "X perde il treno", 
    "Lorenzo B castello di sabbia", 
    "Gioele strozza bresco", 
    "Marzio fa il risotto", 
    "Colpido da una meteora", 
    "Investito da una moto", 
    "Malattia x", 
    "Intossicazione alimentare", 
    "Il nonno ha la tartaruga", 
    "Investito da una macchina", 
    "Gioele strozza marzio", 
]; 

// Function to create sentence items and append to pool
function populateSentencePool() {
    sentences_phrases.forEach((sentence, index) => {
        const sentenceItem = document.createElement('div');
        sentenceItem.className = 'sentence-item';
        sentenceItem.draggable = true;
        sentenceItem.id = `sentence-${index + 1}`;
        sentenceItem.textContent = sentence;
        
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
    if (userInput) {
        if (currentCell) {
            editedItem.oldTextContent = editedItem.textContent
            editedItem.textContent = str_replace(editedItem.textContent.trim(), '{}', userInput);

            grid.appendChild(editedItem);
            
            grid = null; // Clear the grid
            editedItem = null; // Clear the edited item
            currentCell = null; // Clear the current cell
            $('#inputModal').modal('hide'); // Hide the modal
        }
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
                existingElement.textContent = existingElement.oldTextContent;
                delete existingElement.oldTextContent;
            }
            // reset the style of the cell
            cell.style.backgroundColor = '';
            sentencePool.appendChild(existingElement);
        }
    });
});


function saveConfiguration() {
    const bingoCells = document.querySelectorAll('.bingo-cell');
    const bingoConfig = [];

    bingoCells.forEach(cell => {
        bingoConfig.push(cell.textContent.trim());
    });

    const jsonConfig = JSON.stringify(bingoConfig, null, 2);

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
        const existingElement = this.firstChild;
        sentencePool.appendChild(existingElement);
    }

    // Append the dragged element to the bingo cell
    if (str_contains(draggedItem.textContent.trim(), '{}')) {
        // Show modal for user input
        currentCell = cell; // Set the current cell
        editedItem = draggedItem;
        grid = this;
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
            draggedItem.textContent = draggedItem.oldTextContent;
            delete draggedItem.oldTextContent;
        }
        sentencePool.insertBefore(draggedItem, e.target.nextSibling);
    } else if (draggedItem) {
        // Append the dragged item to the pool
        sentencePool.appendChild(draggedItem);
    }
}