let canvas = document.getElementById("snake");
let context = canvas.getContext("2d");
let box = 32;
let snake = [];


snake[0] = {
    x: 8 * box,
    y: 8 * box
}

//Set the direction and food variables 
let direction = "right";
//Position of food in cartesian plane (x, y)
let food = {
    // it randoms a position * box size 
    x: Math.floor( Math.random() * 15 + 1) * box, //it generates a random x position
    y: Math.floor( Math.random() * 15 + 1) * box
}

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


//Draw the snake food
function drawFood(){
    context.fillStyle = "red";
    context.fillRect(food.x, food.y, box, box);
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
    if(snake[0].x < 0 && direction == "left") snake[0].x = 16 * box;
    if(snake[0].y > 15 * box && direction == "down") snake[0].y = 0;
    if(snake[0].y < 0 && direction == "up") snake[0].y = 16 * box;
   
   
    //Game over function in case of snake touch the own body
    for( i = 1; i < snake.length; i++){
        if(snake[0].x == snake[i].x && snake[0].y == snake[i].y){
            clearInterval(game);
            alert("Game Over :(");
        }
    }


    createBackground();
    createSnake();
    drawFood();


    //Initial position on background
    let snakeX = snake[0].x;
    let snakeY = snake[0].y;

    //Movement directions
    if(direction == "right") snakeX += box;
    if(direction == "left") snakeX -= box;
    if(direction == "up") snakeY -= box;
    if(direction == "down") snakeY += box;

    //Increase or decrease snake body length and insert food in a different position
    if(snakeX != food.x || snakeY != food.y){
        snake.pop(); //remove last box of snake body
    }else{
        //Setting random position
        food.x = Math.floor( Math.random() * 15 + 1) * box; 
        food.y =  Math.floor( Math.random() * 15 + 1) * box;
    }

    

    //Create a new box 'head' to snake body
    let newHead = {
        x: snakeX,
        y: snakeY
    }

    snake.unshift(newHead);
}

let game = setInterval(startGame, 100);
