let id=1;  // id of item.

/**
 * Calculate the total cost.  If the last row is the total row, skip the last row.
 * @param {} table 
 * @param {*} tableSize 
 * @returns total
 */
function calculateSum(table, tableSize) {
    let total = 0;
    for (let i=1; i<tableSize; i++) {
        //iterate through rows
        //rows would be accessed using the "row" variable assigned in the for loop
        row = table.rows[i];
        console.log("cell4: " + row.cells[4].innerText);
        total += Number(row.cells[4].innerText);
    }
    return total;
}

/**
 * Calculate the total cost.
 * @returns total 
 */
function totalCost() {
    let table = document.getElementById('list');
    let total = 0;
    let tableSize = table.rows.length;   
    
    if (tableSize > 1) { 
        lastRow = table.rows[tableSize - 1];
        // if the total row already exist, calculate the new total
        if (lastRow.cells[3].innerHTML == "<b>Total: </b>") {
            total = calculateSum(table, tableSize-1);
            lastRow.cells[4].innerText = total;            
        }
        else {
            // if there is no total row, add a total row
            total = calculateSum(table, tableSize);
            let row = table.insertRow(-1);
            row.setAttribute('id', 'totalRow');
            row.insertCell(0);
            row.insertCell(1);
            row.insertCell(2);
            row.insertCell(3).innerHTML = "<b>Total: </b>";
            row.insertCell(4).innerText = total;
            row.insertCell(5);
        }
    }
    return total;
}

// add a click button.  Add an item, quantity, cost to the table.  Calculate the subtotal.
document.getElementById('add').addEventListener('click', () => {
    let table = document.getElementById('list');
    let row = table.insertRow(1);
    row.setAttribute('id', `item-${id}`);
    row.insertCell(0).innerHTML = id;
    row.insertCell(1).innerHTML = document.getElementById('new-item').value;
    row.insertCell(2).innerHTML = document.getElementById('new-quantity').value;
    row.insertCell(3).innerHTML = document.getElementById('new-cost').value;
    row.insertCell(4).innerHTML = document.getElementById('new-cost').value*document.getElementById('new-quantity').value;;    
    let action = row.insertCell(5);
    action.appendChild(createDeleteButton(id++));
    document.getElementById('new-item').value = '';
    document.getElementById('new-quantity').value = '';
    document.getElementById('new-cost').value = '';
    totalCost();
})

/**
 * Create a delete button for each item.
 * @param {} id 
 * @returns btn
 */
function createDeleteButton(id) {
    let btn = document.createElement('button');
    btn.className = 'btn btn-primary';
    btn.id = id;
    btn.innerHTML = 'Delete';
    btn.onclick = () => {
        console.log(`deleting row with id: item-${id}`);
        let elementToDelete = document.getElementById(`item-${id}`);
        elementToDelete.parentNode.removeChild(elementToDelete);
        let total = totalCost();
        if (total == 0) {
            let elementToDelete = document.getElementById('totalRow');
            elementToDelete.parentNode.removeChild(elementToDelete);
        }
    };
    
    return btn;
}

