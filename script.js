let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];


snake[0] = {
    x: 8 * box,
    y: 8 * box
}

let direction = "right";

//Draw the background 
function createBackground(){
    context.fillStyle = "#ffdf80";
    context.fillRect(0, 0, 16 * box, 16 * box);
}

//Draw the snake
function createSnake(){
    for(i=0; i<snake.length; i++){
        context.fillStyle = "#997300";
        context.fillRect(snake[i].x, snake[i].y, box, box); //length X Y Quad
    }
}

//Check the button pressed and set the movement
document.addEventListener('keydown', update);
function update (event){
    if(event.keyCode == 37 && direction != "right") direction = "left";
    if(event.keyCode == 38 && direction != "down") direction = "up";
    if(event.keyCode == 39 && direction != "left") direction = "right";
    if(event.keyCode == 40 && direction != "up") direction = "down";
}





function startGame(){
    /*The snake needs to continue moving when it get close to the border. 
    The opposite side is set in the code bellow  */
    if(snake[0].x > 15 * box && direction == "right") snake[0].x = 0;
    if(snake[0].x < 0 * box && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 * box && direction == "up") snake[0].y = 16 * box;

    createBackground();
    createSnake();


    //Initial position on background
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Movement directions
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    snake.pop(); //remove last box of snake body

    //Create a new box 'head' to snake body
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
