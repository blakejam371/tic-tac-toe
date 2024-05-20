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
      return { arr };
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
          player.currentPlayer = player.currentPlayer === 'X' ? 'O' : 'X';
        }
      });
    });
  })();


  return { Gameboard, Game }
  })();
});