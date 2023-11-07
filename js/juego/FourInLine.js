document.addEventListener("DOMContentLoaded", function(event) {

    //selecciona los elementos del DOM
    let canvas = document.querySelector('#board');
    let startGame = document.querySelector('#btn-juego');
    let winnerInfo = document.querySelector('#winner-info');
    let drawInfo = document.querySelector('#draw-info');
    let game = new Game(canvas);

    //inicia un nuevo juego
    const playGame = ()  => {
        game = new Game(canvas);
        game.prepareGame();
        winnerInfo.classList.add('hide');
        drawInfo.classList.add('hide');
    }

    //verifica si se hizo click en una ficha
    const onMouseDown = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;            
        game.isClickedToken(x, y);
    }

    //mueve la ficha en el canvas
    const onMouseMove = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;   
        if (game.haveClickedToken())
            game.moveToken(x, y);
    }

    //inserta la ficha en la posicion que fue soltada
    const onMouseUp = e => {
        let x = e.layerX - e.currentTarget.offsetLeft;
        let y = e.layerY - e.currentTarget.offsetTop;
        if (game.haveClickedToken()){
            game.insertToken(x,y);    
        }
    }
    
    // Función para iniciar el temporizador
const iniciarTemporizador = e => {
    let tiempoRestante = 300;
    const timerDisplay = document.getElementById('countdown');
  

    const temporizador = setInterval(() => {
        let minutos = Math.floor(tiempoRestante / 60);
        let segundos = tiempoRestante % 60;
        segundos = segundos < 5 ? '0' + segundos : segundos;

        timerDisplay.textContent = "Tiempo restante:" +`${minutos}:${segundos}`;
        
        tiempoRestante--;

        if (tiempoRestante <= 0) {
            clearInterval(temporizador);
            //si se acaba el tiempo, se muestra un mensaje
            timerDisplay.textContent = "Se te acabó el tiempo";

        }
    }, 1000); // Actualizar el temporizador cada segundo (1000 ms)
}





//agrega los respectivos eventos.
    startGame.addEventListener('click', playGame, false);
    startGame.addEventListener ('click', iniciarTemporizador);
    canvas.addEventListener('mousedown', onMouseDown, false);
    canvas.addEventListener('mousemove', onMouseMove, false);
    canvas.addEventListener('mouseup', onMouseUp, false);





    

});