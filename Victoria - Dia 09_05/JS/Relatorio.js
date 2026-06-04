document.addEventListener('DOMContentLoaded', () => {
    const ctx = document.getElementById('chartRelatorioMensal');

    /*if (ctx) {
        new Chart(ctx, {
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [{
                    label: 'Consumo Mensal (m³)',
                    data: [12, 19, 15, 8, 12, 14],
                    borderColor: '#598392',
                    backgroundColor: 'rgba(89, 131, 146, 0.2)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3,
                    pointBackgroundColor: '#124559'
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                plugins: {
                    legend: { display: false }
                },
                scales: {
                    y: { beginAtZero: true, grid: { color: 'rgba(0,0,0,0.05)' } },
                    x: { grid: { display: false } }
                }
            }
        });
    }*/

    atualizarResumos();

    const tbody = document.getElementById('tabelaRegistros');
    const historico = JSON.parse(localStorage.getItem('victoria_historico')) || [];

    if (tbody) {
        tbody.innerHTML = '';

        if (historico.length === 0) {
            tbody.innerHTML = `<tr><td colspan="4" style="text-align: center; color: var(--dark-teal);">Nenhuma atividade recente registrada no Dashboard.</td></tr>`;
        } else {
            historico.forEach(registro => {
                const badgeClass = registro.status === "Social" ? "badge-info" : "badge-ok";

                const tr = document.createElement('tr');
                tr.innerHTML = `
                <td>${registro.data}</td>
                <td>${registro.leitura}</td>
                <td><strong style="color: var(--primary);">${registro.consumo}</strong></td>
                <td><span class="badge-ok ${badgeClass}">${registro.status}</span></td>
            `;
                tbody.appendChild(tr);
            });
        }
    }
});

function atualizarResumos() {
    document.getElementById('mediaConsumo').innerHTML = "14.5 <small>m³</small>";
    document.getElementById('picoConsumo').innerHTML = "22.1 <small>m³</small>";
}

