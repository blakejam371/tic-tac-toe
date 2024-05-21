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

    const cells = document.querySelectorAll('.cells');
    cells.forEach(cell => {
      cell.addEventListener('click', (event) => {
        const index = event.target.dataset.index;

        if(!event.target.innerText && index !== undefined) {
          event.target.innerText = player.currentPlayer;
          Gameboard.arr[index] = player.currentPlayer;
          if(checkWin(Gameboard.arr)) {
            let div = document.createElement('div');
            div.innerText = `${player.currentPlayer} wins`;
            div.classList.add('result');
            Gameboard.container.insertAdjacentElement('afterend', div);
            let reset = document.createElement('button');
            reset.innerText = 'Reset Game';
            reset.classList.add('resetButton');
            reset.addEventListener('click', resetGame)
            Gameboard.container.insertAdjacentElement('afterend', reset);
          };
          player.currentPlayer = player.currentPlayer === 'X' ? 'O' : 'X';
        }
      });
    });

    const resetGame = () => {
      // reset the array
      Gameboard.arr = Array(9).fill(null);
      // remove the text content from the cells
      cells.forEach(cell => {
        cell.innerText = '';
      })
      // remove the result message
      const resultMessage = document.querySelector('.result');
      if(resultMessage) {
        resultMessage.remove();
      }
      // remove the reset button
      const resetButton = document.querySelector('.resetButton')
      if(resetButton) {
        resetButton.remove();
      }
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

  })();


  return { Gameboard, Game }
  })();
});