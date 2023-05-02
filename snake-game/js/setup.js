let canvas = document.getElementById("snake"); 
let context = canvas.getContext("2d"); 
let box = 32;

let isPause = true

let snake = []; 
snake[0] ={
    x: 8 * box,
    y: 8 * box
}

let direction = "right";
let food ={
    x: Math.floor(Math.random() * 15 + 1) * box,
    y: Math.floor(Math.random() * 15 + 1) * box
}

function criarBG(){
    context.fillStyle = "#A1B591";
    context.fillRect(0, 0, 16*box, 16*box);
}

function criarCobrinha (){
    for(i = 0; i < snake.length; i++){
        context.fillStyle = "black";
        context.fillRect(snake[i].x, snake[i].y, box, box);
    }
}

function checkCollision () {
    if (snake[0].x > (15 * box) && direction == "right") snake[0].x = 0
    else if (snake[0].x < 0 && direction == "left") snake[0].x = (16 * box)
    else if (snake[0].y > (15 * box) && direction == "down") snake[0].y = 0
    else if (snake[0].y < 0 && direction == "up") snake[0].y = (16 * box)
}

function drawFood (){
    context.fillStyle = "#3B6918";
    context.fillRect(food.x, food.y, box, box);
}

function toEat() {
    if (snake[0].x == food.x && snake[0].y == food.y) {
        food = { x: Math.floor(Math.random() * 15 + 1) * box, y: Math.floor(Math.random() * 15 + 1) * box }
        return;
    }
    
    snake.pop()
}

function checkGameOver() {
    for (let i = 1; i < snake.length; i++) {
        if (snake[0].x == snake[i].x && snake[0].y == snake[i].y) {
            clearInterval(jogo)
            alert("Game over :(")
            snake = []
            snake[0] = { x: 8 * box, y: 8 * box }
            jogo = setInterval(iniciarJogo, 100);
        }
    }
}

function start () {
    isPause = false
    document.getElementById("start").classList.add("hide")
    document.getElementById("pause").classList.remove("hide")
}

function pause () {
    isPause = true
    document.getElementById("pause").classList.add("hide")
    document.getElementById("start").classList.remove("hide")
}

document.addEventListener('keydown', update);

function update(event){
    if(event.keyCode == 37 && direction != 'right') direction = 'left';
    if(event.keyCode == 38 && direction != 'down') direction = 'up';
    if(event.keyCode == 39 && direction != 'left') direction = 'right';
    if(event.keyCode == 40 && direction != 'up') direction = 'down';
}

function iniciarJogo(){ 
    
    if (!isPause) {
        checkCollision();
        checkGameOver();
        criarBG();
        criarCobrinha();
        drawFood();

        let snakeX = snake[0].x;
        let snakeY = snake[0].y;

        if (direction == "right") snakeX += box;
        else if (direction == "left") snakeX -= box;
        else if (direction == "up") snakeY -= box;
        else if (direction == "down") snakeY += box;

        toEat()
        let newHead = { x: snakeX, y: snakeY }
        snake.unshift(newHead);
        }
    }

let jogo = setInterval(iniciarJogo, 100);