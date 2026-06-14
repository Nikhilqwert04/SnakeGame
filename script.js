const timer = document.querySelector(".timer");
const board = document.querySelector(".board");
const height = 30;
const width = 30;
const rows = Math.floor(board.clientHeight / height);
const cols = Math.floor(board.clientWidth / width);
const MHscore = document.querySelector(".Hscore");
const blocks = [];
const snake = [{ x: 1, y: 3 }];
let score = 0;
let Mtimer = 0
let direction = "right";
let endinterval = null;
let HighScore;
if(localStorage.getItem("HighScore") == null){
    HighScore = 0;
    console.log("krfjghkewjr")
}
else{
    HighScore=JSON.parse(localStorage.getItem("HighScore"));
}

document.addEventListener("keydown", function (e) {

    if (e.key === "ArrowUp") {
        direction = "up";
    }

    if (e.key === "ArrowDown") {
        direction = "down";
    }

    if (e.key === "ArrowLeft") {
        direction = "left";
    }

    if (e.key === "ArrowRight") {
        direction = "right";
    }

    console.log(direction);
});


for (let row = 0; row < rows; row++) {
    for (let col = 0; col < cols; col++) {
        const grid = document.createElement("div");
        grid.classList.add("block");
        grid.classList.add("border");
        grid.classList.add("border-red-300");
        grid.classList.add("text-[10px]");
        grid.classList.add("text-white");
        grid.innerText = `${row},${col}`;
        board.appendChild(grid);
        blocks[`${row}-${col}`] = grid;

    }
}

let appX = Math.floor((Math.random() * (((rows / 100) - 0.01) - 0) + 0) * 100);
let appY = Math.floor((Math.random() * (((cols / 100) - 0.01) - 0) + 0) * 100);
console.log(appY);
console.log(appX);



function eatapple() {
    appX = Math.floor((Math.random() * (((rows / 100) - 0.01) - 0) + 0) * 100);
    appY = Math.floor((Math.random() * (((cols / 100) - 0.01) - 0) + 0) * 100);
}

function render() {
    snake.forEach(element => {
        blocks[`${element.x}-${element.y}`].classList.add("bg-white");

    });

    blocks[`${appX}-${appY}`].classList.add("bg-red-100");
}

function GameStart() {
    score = 0;
    console.log("Here!!!!");
    snake.length = 0;
    snake.push({x:1, y:3});
    direction = "right";
    Game();
}
Game();
function Game() {
    endinterval = setInterval(function () {
        const Mscore = document.querySelector(".score");
        MHscore.textContent=HighScore;
        Mscore.textContent =score;
        let head;
        if (direction == "left") {
            head = { x: snake[0].x, y: snake[0].y - 1 }
        }
        else if (direction == "right") {
            head = { x: snake[0].x, y: snake[0].y + 1 }
        }
        else if (direction == "up") {
            head = { x: snake[0].x - 1, y: snake[0].y }
        }
        else if (direction == "down") {
            head = { x: snake[0].x + 1, y: snake[0].y }
        }
        snake.forEach(element => {
            blocks[`${element.x}-${element.y}`].classList.remove("bg-white");

        });


        if (head.y == appY && head.x == appX) {
            blocks[`${appX}-${appY}`].classList.remove("bg-red-100");
            snake.push(blocks[`${appX}-${appY}`]);
            score = score + 1;
            Mscore.textContent = score;
            if (score > HighScore) {
                HighScore = HighScore + 1;
                MHscore.textContent = HighScore;
                localStorage.setItem("HighScore",HighScore);
            }
            eatapple();
        }

        snake.forEach(element => {
            if (element.x == appX && element.y == appY) {
                blocks[`${appX}-${appY}`].classList.remove("bg-red-100");
                eatapple();
            }
        })

        if (head.x < 0 || head.x >= rows || head.y < 0 || head.y >= cols) {
            clearInterval(endinterval);
            alert("Game over");
            GameStart();
            return;
        }

        snake.forEach(element => {
            if (head.x == element.x && head.y == element.y) {
                clearInterval(endinterval);
                alert("Game Over!!");
                GameStart();
                return;
            }
        })

        snake.unshift(head)
        snake.pop();
        console.log("hehe");
        render();
    }, 250)
}
setInterval(function(){
    Mtimer=Mtimer+1;
    timer.textContent=`${Mtimer} Sec`;
},1000);
