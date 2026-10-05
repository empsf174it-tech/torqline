/* assets/js/filters.js */
document.addEventListener('DOMContentLoaded', () => {
    const filterForm = document.getElementById('filterForm');
    const resetBtn = document.getElementById('resetFilters');
    const vehicleCards = document.querySelectorAll('.vehicle-item');
    const noResults = document.getElementById('noResults');
    const resultCount = document.getElementById('resultCount');
    const typeSelect = document.getElementById('f-type');

    if (!filterForm) return;

    function applyFilters() {
        const type = typeSelect.value;
        const price = document.getElementById('f-price').value;

        let visibleCount = 0;

        vehicleCards.forEach(card => {
            const cardType = card.getAttribute('data-type');
            const cardPrice = parseInt(card.getAttribute('data-price'), 10);

            let matchType = type === 'all' || cardType === type;
            let matchPrice = true;

            if (price !== 'all') {
                const [min, max] = price.split('-').map(Number);
                if (max) {
                    matchPrice = cardPrice >= min && cardPrice <= max;
                } else {
                    matchPrice = cardPrice >= min; // for '80000+'
                }
            }

            if (matchType && matchPrice) {
                card.style.display = '';
                visibleCount++;
            } else {
                card.style.display = 'none';
            }
        });

        noResults.style.display = visibleCount === 0 ? 'block' : 'none';
        if (resultCount) {
            resultCount.textContent = `${visibleCount} ${visibleCount === 1 ? 'vehicle' : 'vehicles'}`;
        }
    }

    filterForm.addEventListener('change', applyFilters);

    if (resetBtn) {
        resetBtn.addEventListener('click', () => {
            filterForm.reset();
            applyFilters();
        });
    }

    // Category shortcuts: buttons with data-filter-type set the body-type filter
    document.querySelectorAll('[data-filter-type]').forEach(btn => {
        btn.addEventListener('click', () => {
            typeSelect.value = btn.getAttribute('data-filter-type');
            applyFilters();
            filterForm.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    // Support deep links like vehicles.html?type=evs
    const typeParam = new URLSearchParams(window.location.search).get('type');
    if (typeParam && typeSelect.querySelector(`option[value="${CSS.escape(typeParam)}"]`)) {
        typeSelect.value = typeParam;
    }
    applyFilters();
});
