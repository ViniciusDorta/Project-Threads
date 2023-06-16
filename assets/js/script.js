import selecionaCotacao from "./imprimeCotacao.js";
const graficoDolar = document.getElementById('graficoDolar');
const graficoIene = document.getElementById('graficoIene');
const graficoEuro = document.getElementById('graficoEuro');

const graficoParaDolar = new Chart(graficoDolar, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Valor dólar',
            data: [],
            borderWidth: 1,
            borderColor: '#00dea3',
            backgroundColor: '#00dea3'
        }]
    },
});

const graficoParaIene = new Chart(graficoIene, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Valor iene',
            data: [],
            borderWidth: 1,
            borderColor: '#5e74c7',
            backgroundColor: '#5e74c7'
        }]
    },
});

const graficoParaEuro = new Chart(graficoEuro, {
    type: 'line',
    data: {
        labels: [],
        datasets: [{
            label: 'Valor euro',
            data: [],
            borderWidth: 1,
            borderColor: '#143eb2',
            backgroundColor: '#143eb2'
        }]
    },
});

function geraHorario(){
    let data = new Date();
    let horario = data.getHours() + ":" + data.getMinutes() + ":" + data.getSeconds();
    return horario;
}

function adicionarDados(grafico, legenda, dados){
    grafico.data.labels.push(legenda);
    grafico.data.datasets.forEach((dataset) => {
        dataset.data.push(dados);
    });
    grafico.update();
}

let workerDolar = new Worker('../../assets/js/workers/workerDolar.js');
workerDolar.postMessage('usd');
workerDolar.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaDolar, tempo, valor);
    selecionaCotacao("dolar", valor);
})

let workerIene = new Worker('../../assets/js/workers/workerIene.js');
workerIene.postMessage('iene');
workerIene.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaIene, tempo, valor);
    selecionaCotacao("iene", valor);
})

let workerEuro = new Worker('../../assets/js/workers/workerEuro.js');
workerEuro.postMessage('euro');
workerEuro.addEventListener("message", event => {
    let tempo = geraHorario();
    let valor = event.data.ask;
    adicionarDados(graficoParaEuro, tempo, valor);
    selecionaCotacao("euro", valor);
})