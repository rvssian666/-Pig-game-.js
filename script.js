/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/
'use strcit';

// Seleccionando elementos del DOM
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const score1El = document.getElementById('score--0');
const score2El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let currentScore, scoreS, playing, activeplayer;

// Función de inicialización del juego
const init = function () {
  // Oculta el dado al inicio del juego
  diceEl.classList.add('hidden');
  
  // Establece todas las puntuaciones a cero
  score1El.textContent = 0;
  score2El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;
  
  currentScore = 0;
  activeplayer = 0;
  scoreS = [0, 0]; // [puntuación Jugador 0, puntuación Jugador 1]
  playing = true; // El juego está activo
  
  // Resetea los estados visuales
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player0El.classList.add('player--active'); // Jugador 0 comienza activo
  player1El.classList.remove('player--active');
};

init();

// Función para cambiar de jugador
const switchPlayer = function () {
  // Resetea la puntuación redonda del jugador activo actual
  document.getElementById(`current--${activeplayer}`).textContent = 0;
  currentScore = 0;
  
  // Cambia el jugador activo (0 a 1, o 1 a 0)
  activeplayer = activeplayer === 0 ? 1 : 0;
  
  // Alterna la clase visual 'player--active'
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

// Evento para tirar el dado (Roll Dice)
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Genera un número aleatorio del 1 al 6
    const dice = Math.trunc(Math.random() * 6) + 1;
    
    // 2. Muestra el dado y actualiza la imagen
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;
    
    // 3. Comprueba si el resultado es 1
    if (dice !== 1) {
      // Agrega el dado a la puntuación de la ronda
      currentScore += dice;
      document.getElementById(`current--${activeplayer}`).textContent =
        currentScore;
    } else {
      // Si saca 1, pierde la puntuación de la ronda y cambia de jugador
      switchPlayer();
    }
  }
});

// Evento para mantener la puntuación (Hold)
btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Agrega la puntuación de la ronda al puntaje GLOBAL del jugador activo
    scoreS[activeplayer] += currentScore;
    document.getElementById(`score--${activeplayer}`).textContent =
      scoreS[activeplayer];
    
    // 2. Comprueba si el jugador ha alcanzado la puntuación de victoria (100)
    if (scoreS[activeplayer] >= 100) { // Regla original: 100 puntos
      // El jugador GANA
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activeplayer}`)
        .classList.remove('player--active');
      playing = false; // Detiene el juego
    } else {
      // Cambia al siguiente jugador
      switchPlayer();
    }
  }
});

// Evento para iniciar un nuevo juego (New Game)
btnNew.addEventListener('click', init);