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
    })();
  
  
  })();
});
