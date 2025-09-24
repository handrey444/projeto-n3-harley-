

let dadosCompletos = [];
const itensPorPagina = 10;
let paginaAtual = 1;
let totalPaginas = 1;

async function fetchData() {
    try {
        const response = await fetch(`https://projeto-n3-harley-bdcm.vercel.app/clima/historico`);
        const data = await response.json();

        if (Array.isArray(data)) {
            dadosCompletos = data.reverse(); 
           
            renderPagina();
        } else {
            console.error('Os dados recebidos não são um array:', data);
        }
    } catch (error) {
        console.error('Erro ao buscar dados da API:', error);
    }
}

function renderPagina() {

   
   

    const tableBodyEl = document.getElementById('history-table-body');
    tableBodyEl.innerHTML = '';

    if (dadosDaPagina.length > 0) {
        dadosDaPagina.forEach(item => {
            const row = document.createElement('tr');
           
            row.innerHTML = `
                <td>${item.temperatura.toFixed(1)}</td>
                <td>${item.umidade.toFixed(1)}</td>
         
            `;
            tableBodyEl.appendChild(row);
        });
    }

}

setInterval(fetchData, 5000);
fetchData();