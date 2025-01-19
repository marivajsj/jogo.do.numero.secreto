//let titulo = document.querySelector('h1');
//titulo.innerHTML = 'Jogo do número secreto';
//let paragrafo = document.querySelector('p');
//paragrafo.innerHTML = 'Escolha um número entre 1 e 100.';

//Função para selecionar tag e exibir texto
let listaDeNumerosSorteados = [];
let numeroLimite = 100;
let numeroSecreto = geraNumeroAleatorio();
let tentativas = 1;
exibirMensagemInicial();

function exibirTextoNaTela(tag, texto) {
    let campo = document.querySelector(tag);
    campo.innerHTML = texto;
    responsiveVoice.speak(texto, 'Brazilian Portuguese Female',{rate: 1.2});
}
function geraNumeroAleatorio() {
    let numeroGerado = parseInt(Math.random() * numeroLimite + 1);
    let quantidadeDeElementosNaLista = listaDeNumerosSorteados.length;

    if (quantidadeDeElementosNaLista === numeroLimite) {
        listaDeNumerosSorteados = [];
    }

    if (listaDeNumerosSorteados.indexOf(numeroGerado) === -1) {
        listaDeNumerosSorteados.push(numeroGerado);
        console.log(listaDeNumerosSorteados);
        return numeroGerado;
    } else {
        return geraNumeroAleatorio();
    }
}
function exibirMensagemInicial () {
    exibirTextoNaTela('h1', 'Jogo do Número Secreto');
    exibirTextoNaTela('p', `Escolha um número entre 1 e ${numeroLimite}.`);
}
function limparCampo() {
   chute = document.querySelector('input').value = '';
}
function reiniciarJogo() {
    numeroSecreto = geraNumeroAleatorio();
    limparCampo();
    tentativas = 1;
    exibirMensagemInicial();
    document.getElementById('reiniciar').setAttribute('disabled',true);
}
function verificarChute() {
    let chute = document.querySelector('input').value;
    
    if (chute === '') {
        exibirTextoNaTela('p', 'Você precisa digitar um número.');
        return;
    }
    if (isNaN(chute)) {
        exibirTextoNaTela('p', 'Você precisa digitar um número válido.');
        return;
    }
    if (chute < 1 || chute > numeroLimite) {
        exibirTextoNaTela('p', `Você precisa digitar um número entre 1 e ${numeroLimite}.`);
        return;
    }
    if (chute == numeroSecreto) {
        let textoTentativas = tentativas > 1 ? 'tentativas' : 'tentativa';
        exibirTextoNaTela('h1', 'Parabéns, você acertou!');
        let mensagemTentativa =`O número secreto é ${numeroSecreto}, você acertou com ${tentativas} ${textoTentativas}.`;
        exibirTextoNaTela('p', mensagemTentativa);
        document.getElementById('reiniciar').removeAttribute('disabled');
    } else {
        if (chute > numeroSecreto) {
            exibirTextoNaTela ('p', 'O número secreto é menor, tente novamente.');
            limparCampo();
        } else {
            exibirTextoNaTela ('p', 'O número secreto é maior, tente novamente.');
            limparCampo();
        }
        tentativas++;
    }
}   