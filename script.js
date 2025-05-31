const clickSound = new Audio('./sounds/click.mp3');
const startSound = new Audio('./sounds/start.mp3');
const stopSound = new Audio('./sounds/stop.mp3');

const dynamicIsland = document.getElementById('dynamicIsland');



const display = document.getElementById('display');
const btnIniciar = document.getElementById('btnIniciar');
const btnParar = document.getElementById('btnParar');
const btnZerar = document.getElementById('btnZerar');

let segundos = 0;
let minutos = 0;
let horas = 0;
let milissegundos = 0;
let intervalo;
let estaRodando = false;

// Função para formatar o tempo (adiciona zero à esquerda)
function formatarTempo(numero) {
	return numero < 10 ? '0' + numero : numero;
}

// Função para formatar milissegundos (para ter sempre 3 dígitos)
function formatarMilissegundos(numero) {
    if (numero < 10) {
        return '00' + numero;
    } else if (numero < 100) {
        return '0' + numero;
    }
    return numero;
}

function atualizarCronometro() {
	milissegundos += 10; // Incrementa 10ms a cada 10ms reais
	
	if (milissegundos === 1000) {
		milissegundos = 0;
		segundos++;
	}
	
	if (segundos === 60) {
		segundos = 0;
		minutos++;
	}

	if (minutos === 60) {
		minutos = 0;
		horas++;
	}

	// Atualiza o display com horas, minutos, segundos e milissegundos
	display.textContent = `${formatarTempo(horas)}:${formatarTempo(minutos)}:${formatarTempo(segundos)}:${formatarMilissegundos(milissegundos)}`;
}

function iniciarCronometro() {
    if (!estaRodando) {
        intervalo = setInterval(atualizarCronometro, 10);
        estaRodando = true;
        btnIniciar.disabled = true;
        btnParar.disabled = false;
        btnZerar.disabled = false;

        startSound.play();
        dynamicIsland.classList.add('expand');
        setTimeout(() => dynamicIsland.classList.remove('expand'), 600);
    }
}

function pararCronometro() {
    clearInterval(intervalo);
    estaRodando = false;
    btnIniciar.disabled = false;
    btnParar.disabled = true;
    btnZerar.disabled = false;

    stopSound.play();
    dynamicIsland.classList.add('shrink');
    setTimeout(() => dynamicIsland.classList.remove('shrink'), 600);
}

function zerarCronometro() {
    pararCronometro();
    horas = 0;
    minutos = 0;
    segundos = 0;
    milissegundos = 0;
    display.textContent = '00:00:00:000';
	// Habilita/desabilita botões após zerar
	btnIniciar.disabled = false; // Pode iniciar novamente
	btnParar.disabled = true;  // Não pode parar se não está rodando
	btnZerar.disabled = true;  // Não pode zerar novamente se já está zerado

    clickSound.play();
}


// Adicionando Escutadores de Eventos
btnIniciar.addEventListener('click', iniciarCronometro);
btnParar.addEventListener('click', pararCronometro);
btnZerar.addEventListener('click', zerarCronometro);

// Estado inicial dos botões ao carregar a página
btnParar.disabled = true;
btnZerar.disabled = true;