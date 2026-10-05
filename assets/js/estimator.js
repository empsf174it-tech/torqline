/* assets/js/estimator.js */
document.addEventListener('DOMContentLoaded', () => {
    const estForm = document.getElementById('estimatorForm');

    if (estForm) {
        const fmt = (n) => '$' + n.toLocaleString('en-US', { maximumFractionDigits: 0 });

        estForm.addEventListener('submit', (e) => {
            e.preventDefault();

            const price = parseFloat(document.getElementById('e-price').value);
            const dist = parseFloat(document.getElementById('e-dist').value);
            const fuel = parseFloat(document.getElementById('e-fuel').value);
            const ins = parseFloat(document.getElementById('e-ins').value);
            const msg = estForm.querySelector('.form-msg');
            const resultBox = document.getElementById('estResult');

            if (isNaN(price) || isNaN(dist) || isNaN(fuel) || isNaN(ins)) {
                msg.textContent = 'Please enter valid numeric values.';
                msg.className = 'form-msg error';
                return;
            }

            msg.textContent = '';

            // Basic demo calculation
            const annualFuel = (dist / 100) * fuel * 1.5; // Demo logic: assumes 1.5 price per unit
            const annualDepreciation = price * 0.15;
            const annualMaintenance = 500;
            const total = annualFuel + ins + annualMaintenance + annualDepreciation;

            resultBox.innerHTML = `
                <div class="est-total">
                    <span>Estimated annual cost</span>
                    <strong>${fmt(total)}</strong>
                </div>
                <div class="est-breakdown">
                    <div><span>Fuel / charging</span><b>${fmt(annualFuel)}</b></div>
                    <div><span>Insurance</span><b>${fmt(ins)}</b></div>
                    <div><span>Maintenance</span><b>${fmt(annualMaintenance)}</b></div>
                    <div><span>Depreciation</span><b>${fmt(annualDepreciation)}</b></div>
                </div>
                <p class="disclosure">This is a DEMO estimate only and does not constitute financial advice.</p>
            `;
            resultBox.style.display = 'block';
        });
    }
});
