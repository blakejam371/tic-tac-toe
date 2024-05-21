document.addEventListener("DOMContentLoaded", function() {
  const TicTacToe = (function () {

    const Gameboard = (function() {
      const arr = Array(9).fill(null);
      let container = document.querySelector('.container');

      if (container) {
        arr.forEach((cell, index) => {
          let div = document.createElement('div');
          div.classList.add('cells');
          div.dataset.index = index;
          container.appendChild(div);
        });
      } else {
        console.error('Container element not found.');
      }
      return { arr, container };
    })();

    const Player = () => {
      let currentPlayer = 'X';
      return { currentPlayer };
    }

    const Game = (function() {
      const player = Player();
      let cells = document.querySelectorAll('.cells');

      const resetGame = () => {
        Gameboard.arr.fill(null);
        cells.forEach(cell => {
          cell.innerText = '';
        });
        const resultMessage = document.querySelector('.result');
        if (resultMessage) {
          resultMessage.remove();
        }
        const resetButton = document.querySelector('.resetButton');
        if (resetButton) {
          resetButton.remove();
        }
        player.currentPlayer = 'X';
      }

      const createResetButton = () => {
        let reset = document.createElement('button');
          reset.innerText = 'Reset Game';
          reset.classList.add('resetButton');
          reset.addEventListener('click', resetGame);
          Gameboard.container.insertAdjacentElement('afterend', reset);
      }

      const checkWin = (arr) => {
        const winningCombs = [
          [0, 1, 2],
          [3, 4, 5],
          [6, 7, 8],
          [0, 3, 6],
          [1, 4, 7],
          [2, 5, 8],
          [0, 4, 8],
          [2, 4, 6],
        ];

        for (let comb of winningCombs) {
          const [a, b, c] = comb;
          if (arr[a] && arr[a] === arr[b] && arr[a] === arr[c]) {
            return true;
          }
        }
        return false;
      }

      cells.forEach(cell => {
        cell.addEventListener('click', (event) => {
          const index = event.target.dataset.index;

          if (!event.target.innerText && index !== undefined) {
            event.target.innerText = player.currentPlayer;
            Gameboard.arr[index] = player.currentPlayer;

            if (checkWin(Gameboard.arr)) {
              let resultDiv = document.createElement('div');
              resultDiv.innerText = `${player.currentPlayer} wins`;
              resultDiv.classList.add('result');
              Gameboard.container.insertAdjacentElement('afterend', resultDiv);
              createResetButton();
            } else if (Gameboard.arr.every(cell => cell !== null)) {
              let drawDiv = document.createElement('div');
              drawDiv.innerText = `It's a draw`;
              drawDiv.classList.add('result');
              Gameboard.container.insertAdjacentElement('afterend', drawDiv);
              createResetButton();
            }
            player.currentPlayer = player.currentPlayer === 'X' ? 'O' : 'X';
          }
        });
      });

      return { resetGame };
    })();

    return { Gameboard, Game };
  })();
});
