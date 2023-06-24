var sorteioIntervaloId;
var numerosSorteados = [];
var vencedor = null;
function obterNomeJogador() {
    var nomeJogador = prompt("Digite o nome do jogador:");
    if (nomeJogador) {
        fazerCartela(nomeJogador);
    }
}

function fazerCartela(nomeJogador) {
    var cartela = gerarCartela();

    var div_cartelas = document.getElementById('cartelas');

    var div_cartela = document.createElement('div');
    div_cartela.className = 'cartela';

    div_cartelas.appendChild(div_cartela);

    var nomeJogadorElement = document.createElement('h4');
    nomeJogadorElement.innerText = nomeJogador;

    div_cartela.appendChild(nomeJogadorElement);

    var tabela = document.createElement('table');
    var thead = document.createElement('thead');
    var tbody = document.createElement('tbody');

    div_cartela.appendChild(tabela);
    tabela.appendChild(thead);
    tabela.appendChild(tbody);

    var thB = document.createElement('th');
    var thI = document.createElement('th');
    var thN = document.createElement('th');
    var thG = document.createElement('th');
    var thO = document.createElement('th');

    thB.innerText = 'B';
    thI.innerText = 'I';
    thN.innerText = 'N';
    thG.innerText = 'G';
    thO.innerText = 'O';

    thead.appendChild(thB);
    thead.appendChild(thI);
    thead.appendChild(thN);
    thead.appendChild(thG);
    thead.appendChild(thO);

    for (var i = 0; i < 5; i++) {
        var tr = document.createElement('tr');
        for (var j = 0; j < 5; j++) {
            var td = document.createElement('td');
            if (j === 0) {
                td.innerText = cartela[j][i];
            } else if (j === 1) {
                td.innerText = cartela[j][i];
            } else if (j === 2) {
                if (i === 2) {
                    td.innerText = 'X';
                } else {
                    td.innerText = cartela[j][i];
                }
            } else if (j === 3) {
                td.innerText = cartela[j][i];
            } else if (j === 4) {
                td.innerText = cartela[j][i];
            }
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
}

function gerarCartela() {
    var cartela = [];

    var rangeB = gerarRange(1, 15);
    var rangeI = gerarRange(16, 30);
    var rangeN = gerarRange(31, 45);
    var rangeG = gerarRange(46, 60);
    var rangeO = gerarRange(61, 75);

    cartela.push(gerarNumeroAleatorio(rangeB, 5));
    cartela.push(gerarNumeroAleatorio(rangeI, 5));
    cartela.push(gerarNumeroAleatorio(rangeN, 5));
    cartela.push(gerarNumeroAleatorio(rangeG, 5));
    cartela.push(gerarNumeroAleatorio(rangeO, 5));

    return cartela;
}

function gerarRange(start, end) {
    var range = [];
    for (var i = start; i <= end; i++) {
        range.push(i);
    }
    return range;
}

function gerarNumeroAleatorio(range, count) {
    var NumerosAleatorio = [];
    var tempRange = range.slice();
    while (NumerosAleatorio.length < count) {
        var IndiceAleatorio = Math.floor(Math.random() * tempRange.length);
        var NumeroAleatorio = tempRange[IndiceAleatorio];
        if (!NumerosAleatorio.includes(NumeroAleatorio)) {
            NumerosAleatorio.push(NumeroAleatorio);
            tempRange.splice(IndiceAleatorio, 1);
        }
    }
    return NumerosAleatorio;
}

function reiniciarJogo() {
    var div_cartelas = document.getElementById('cartelas');
    div_cartelas.innerHTML = '';

    var numerosDiv = document.getElementById('numeros');
    numerosDiv.innerHTML = '';

    clearInterval(sorteioIntervaloId);
    numerosSorteados = [];
    vencedor = null;
}

function iniciarSorteio() {
    if (sorteioIntervaloId) {
        return;
    }

    sorteioIntervaloId = setInterval(sorteio, 100);
}

function sorteio() {
    if (vencedor) {
        clearInterval(sorteioIntervaloId);
        return;
    }

    var numerosDiv = document.getElementById('numeros');
    var numero = gerarNumero();

    var p = document.createElement('p');
    p.innerText = numero;

    numerosDiv.appendChild(p);

    numerosSorteados.push(numero);
    verificarVencedor();
    marcarNumerosSorteados();
}

function gerarNumero() {
    var numero;
    do {
        numero = Math.floor(Math.random() * 75 + 1);
    } while (numerosSorteados.includes(numero));
    return numero;
}

function verificarVencedor() {
    var cartelas = document.querySelectorAll('.cartela');

    for (var i = 0; i < cartelas.length; i++) {
        var cartela = cartelas[i];
        var numeros = cartela.getElementsByTagName('td');

        var completouCartela = true;

        for (var j = 0; j < numeros.length; j++) {
            if (numeros[j].innerText !== 'X' && !numerosSorteados.includes(parseInt(numeros[j].innerText))) {
                completouCartela = false;
                break;
            }
        }

        if (completouCartela) {
            vencedor = cartela.getElementsByTagName('h4')[0].innerText;
            var vencedorElement = document.getElementById('vencedor');
            vencedorElement.innerText = "Parabéns, o vencedor é: " + vencedor;
            clearInterval(sorteioIntervaloId);
            break;
        }
    }
}

function marcarNumerosSorteados() {
    var cartelas = document.querySelectorAll('.cartela');

    for (var i = 0; i < cartelas.length; i++) {
        var numeros = cartelas[i].getElementsByTagName('td');

        for (var j = 0; j < numeros.length; j++) {
            var numero = parseInt(numeros[j].innerText);
            if (numerosSorteados.includes(numero)) {
                numeros[j].style.backgroundColor = 'green';
            }
        }
    }
}