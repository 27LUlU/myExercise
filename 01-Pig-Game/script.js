'use strict';
// Selecting elements
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');
const diceEl = document.querySelector('.dice');
const btnRoll = document.querySelector('.btn--roll');
const btnNew = document.querySelector('.btn--new');
const btnHold = document.querySelector('.btn--hold');
const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
// const victory = document.querySelector('.victory');

// starting conditions
// let currentSum0 = 0;
// let currentSum1 = 0;
let currentScore, playerActive, playing, scores;
const init = function () {
  currentScore = 0;
  playerActive = 0;
  playing = true;
  scores = [0, 0];

  score0El.textContent = 0;
  score1El.textContent = 0;
  current0El.textContent = 0;
  current1El.textContent = 0;

  diceEl.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  player1El.classList.remove('player--active');
  player0El.classList.add('player--active');
};
init();
// const dice = function (e) {
//   diceEl.attributes.src.textContent = e;
// };

const switchPlayer = function () {
  document.getElementById(`current--${playerActive}`).textContent = 0;
  playerActive = playerActive === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1.set dice number
    let dice = Math.trunc(Math.random() * 6 + 1);
    console.log('dice', dice);

    // 2.display dice
    diceEl.classList.remove('hidden');
    //jonas method
    diceEl.src = `dice-${dice}.png`;

    // my method
    // switch (dice) {
    //   case 1:
    //     dice('dice-1.png');
    //     break;
    //   case 2:
    //     dice('dice-2.png');
    //     break;
    //   case 3:
    //     dice('dice-3.png');
    //     break;
    //   case 4:
    //     dice('dice-4.png');
    //     break;
    //   case 5:
    //     dice('dice-5.png');
    //     break;
    //   case 6:
    //     dice('dice-6.png');
    //     break;
    // }

    // 3.check for rolled 1
    //jonas method
    if (dice != 1) {
      // Add dice to current score
      currentScore += dice;
      document.getElementById(`current--${playerActive}`).textContent =
        currentScore;
    } else {
      //switch to next player
      switchPlayer();
    }

    //my method
    // if (player0El.classList.contains('player--active')) {
    //   if (num === 1) {
    //     player0El.querySelector('.current-score').textContent = 0;
    //     player0El.classList.remove('player--active');
    //     player1El.classList.add('player--active');
    //     currentSum0 = 0;
    //   } else {
    //     current = num;
    //     currentSum0 += current;
    //     player0El.querySelector('.current-score').textContent = currentSum0;
    //     // player0El.querySelector('.current-score').textContent = current;
    //   }
    // } else if (player1El.classList.contains('player--active')) {
    //   if (num === 1) {
    //     player1El.querySelector('.current-score').textContent = 0;
    //     player1El.classList.remove('player--active');
    //     player0El.classList.add('player--active');
    //     currentSum1 = 0;
    //   } else {
    //     current = num;
    //     currentSum1 += current;
    //     player1El.querySelector('.current-score').textContent = currentSum1;
    //   }
    // }
  }
});

//Jonas method
btnHold.addEventListener('click', function () {
  if (playing) {
    //1. add current score to active player's score
    scores[playerActive] += currentScore;
    document.getElementById(`score--${playerActive}`).textContent =
      scores[playerActive];
    //2.check if player's score is >= 100
    if (document.getElementById(`score--${playerActive}`).textContent >= 20) {
      //finish the game
      document
        .querySelector(`.player--${playerActive}`)
        .classList.add('player--winner');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      //switch to the next player
      switchPlayer();
    }
  }
});

// jonas method
btnNew.addEventListener('click', init);

// my method
// document.querySelector('.btn--hold').addEventListener('click', function () {
//   if (player0El.classList.contains('player--active')) {
//     score0El.textContent = currentSum0;
//     player0El.classList.remove('player--active');
//     player1El.classList.add('player--active');
//     player0El.querySelector('.current-score').textContent = 0;
//   } else if (player1El.classList.contains('player--active')) {
//     score1El.textContent = currentSum1;
//     player1El.classList.remove('player--active');
//     player0El.classList.add('player--active');
//     player1El.querySelector('.current-score').textContent = 0;
//   }
//   if (currentSum0 >= 10) {
//     victory.classList.remove('hidden');
//     console.log('win1');
//   } else if (currentSum1 >= 10) {
//     victory.classList.remove('hidden');
//     console.log('win2');
//   } else {
//     console.log('no winner');
//   }

//   console.log('currentSum0', currentSum0);
//   console.log('currentSum1', currentSum1);
// });

// document.querySelector('.btn--new').addEventListener('click', function () {
//   score0El.textContent = 0;
//   score1El.textContent = 0;
//   player0El.querySelector('.current-score').textContent = 0;
//   player1El.querySelector('.current-score').textContent = 0;
//   currentSum0 = 0;
//   currentSum1 = 0;
//   victory.classList.add('hidden');
//   diceEl.classList.add('hidden');
//   if (player1El.classList.contains('player--active')) {
//     player1El.classList.remove('player--active');
//     player0El.classList.add('player--active');
//   }
//   //TODO:roll and hold button can still roll so need a div separate the background
// });
