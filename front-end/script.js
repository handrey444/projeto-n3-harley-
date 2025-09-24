const API_URL = window.location.origin;

let dadosCompletos = [];
const itensPorPagina = 10;
let paginaAtual = 1;
let totalPaginas = 1;

async function fetchData() {
    try {
        const response = await fetch(`${API_URL}/historico`);
        const data = await response.json();

        if (Array.isArray(data)) {
            dadosCompletos = data.reverse(); 
            totalPaginas = Math.ceil(dadosCompletos.length / itensPorPagina);

            renderPagina();
        } else {
            console.error('Os dados recebidos não são um array:', data);
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function renderPagina() {
    const latestData = dadosCompletos[0];
    document.getElementById('current-temp').textContent = latestData ? latestData.temperatura.toFixed(1) : '--';
    document.getElementById('current-humid').textContent = latestData ? latestData.umidade.toFixed(1) : '--';

    const inicio = (paginaAtual - 1) * itensPorPagina;
    const fim = inicio + itensPorPagina;
    const dadosDaPagina = dadosCompletos.slice(inicio, fim);

    const tableBodyEl = document.getElementById('history-table-body');
    tableBodyEl.innerHTML = '';

    if (dadosDaPagina.length > 0) {
        dadosDaPagina.forEach(item => {
            const row = document.createElement('tr');
            const dataFormatada = new Date(item.timestamp).toLocaleString('pt-BR');
            row.innerHTML = `
                <td>${item.temperatura.toFixed(1)}</td>
                <td>${item.umidade.toFixed(1)}</td>
                <td>${dataFormatada}</td>
            `;
            tableBodyEl.appendChild(row);
        });
    }

    document.getElementById('page-info').textContent = `Página ${paginaAtual} de ${totalPaginas}`;
    document.getElementById('prev-btn').disabled = paginaAtual === 1;
    document.getElementById('next-btn').disabled = paginaAtual === totalPaginas;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    if (paginaAtual > 1) {
        paginaAtual--;
        renderPagina();
    }
});

document.getElementById('next-btn').addEventListener('click', () => {
    if (paginaAtual < totalPaginas) {
        paginaAtual++;
        renderPagina();
    }
});

setInterval(fetchData, 5000);
fetchData();