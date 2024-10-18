document.getElementById('tableForm').addEventListener('submit', function(e) {
    e.preventDefault();
    generateTable();
});

function generateTable() {
    const rows = parseInt(document.getElementById('rows').value);
    const columns = parseInt(document.getElementById('columns').value);
    const tableContainer = document.getElementById('tableContainer');

    // Clear previous table if any
    tableContainer.innerHTML = '';

    // Create table
    const table = document.createElement('table');
    table.className = 'table table-bordered table-striped';

    // Create table header
    const thead = document.createElement('thead');
    const headerRow = document.createElement('tr');
    for (let i = 0; i < columns; i++) {
        const th = document.createElement('th');
        th.textContent = `Column ${i + 1}`;
        headerRow.appendChild(th);
    }
    thead.appendChild(headerRow);
    table.appendChild(thead);

    // Create table body
    const tbody = document.createElement('tbody');
    for (let i = 0; i < rows; i++) {
        const row = document.createElement('tr');
        for (let j = 0; j < columns; j++) {
            const cell = document.createElement('td');
            cell.textContent = `Row ${i + 1}, Col ${j + 1}`;
            row.appendChild(cell);
        }
        tbody.appendChild(row);
    }
    table.appendChild(tbody);

    // Add table to container
    tableContainer.appendChild(table);
}
