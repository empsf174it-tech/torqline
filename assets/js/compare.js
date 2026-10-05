/* assets/js/compare.js */
document.addEventListener('DOMContentLoaded', () => {
    // Logic for comparison matrix functionality
    const diffToggle = document.getElementById('diffToggle');
    if (diffToggle) {
        diffToggle.addEventListener('change', (e) => {
            const rows = document.querySelectorAll('.matrix-row[data-diff]');
            rows.forEach(row => {
                if (e.target.checked) {
                    if (row.getAttribute('data-diff') === 'false') {
                        row.style.display = 'none';
                    }
                } else {
                    row.style.display = '';
                }
            });
        });
    }

    // Vehicle removal
    const removeBtns = document.querySelectorAll('.remove-vehicle');
    removeBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const colIndex = e.target.closest('th').cellIndex;
            const table = e.target.closest('table');
            
            // Only allow removing if more than 2 vehicles
            const headCells = table.querySelectorAll('thead th');
            if (headCells.length <= 3) { // 1 sticky col + 2 vehicle cols
                alert('Minimum 2 vehicles required for comparison.');
                return;
            }

            // Remove column from thead and tbody
            table.querySelectorAll('tr').forEach(row => {
                if (row.children.length > colIndex) {
                    row.removeChild(row.children[colIndex]);
                }
            });
        });
    });
});
