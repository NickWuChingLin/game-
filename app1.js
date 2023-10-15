const canvas = document.querySelector("#mycanvas");
const ctx = canvas.getContext('2d');
console.log(canvas, ctx)
// 設定蛇一格的常跟寬
const unit = 20;
const row = canvas.height / 20;
const col = canvas.width / 20;

let snake = []; //arry中每個元素都是物件
// 初始設定
function createSnake() {
    snake[0] = {
        x: 80,
        y: 0
    };
    snake[1] = {
        x: 60,
        y: 0
    };
    snake[2] = {
        x: 40,
        y: 0
    };
    snake[3] = {
        x: 20,
        y: 0
    };

}
let heighestScore
loadHeightScore();
let score = 0;

document.querySelector("#myScore").innerHTML = `遊戲分數${score}`;
document.querySelector("#myScore2").innerHTML = `最高遊戲分數${heighestScore}`;

// 設定果實
class Fruit {
    constructor() {
        this.x = Math.floor(Math.random() * col) * unit;
        this.y = Math.floor(Math.random() * row) * unit;
    }
    drawFruit() {
        ctx.fillStyle = 'yellow';
        ctx.fillRect(this.x, this.y, unit, unit)
    }

    pickLocation() {
        //跟蛇的位置有沒有重疊
        let overlapping = false;
        let newX;
        let newY;
        // 檢查跟蛇有沒有重疊
        function checkOverlap() {
            for (let i = 0; i < snake.length; i++) {
                if (newX == snake[i].x && newY == snake[i].y) {
                    overlapping = true;
                    return;
                } else {
                    overlapping = false
                }
            }
        }
        do {
            newX = Math.floor(Math.random() * col) * unit;
            newY = Math.floor(Math.random() * row) * unit;
            checkOverlap(newX, newY)
        } while (overlapping);
        this.x = newX;
        this.y = newY
    }
}
// 初始設定
createSnake()
let myFruit = new Fruit()
// 控制蛇的方向
window.addEventListener("keydown", changeDirection
    // 每次按下上下左右鍵後在下一貞被劃出來之前不接受任何keydown事件
)
function changeDirection(e) {
    if (e.key == 'ArrowLeft' && d != 'rihgt') {
        d = 'left'
        console.log('你正在按左鍵')
    } else if (e.key == 'ArrowRight' && d != 'left') {
        d = 'right'
        console.log("你正在按右鍵")
    } else if (e.key == 'ArrowUp' && d != 'down') {
        d = 'up'
        console.log("你正在按上鍵")
    } else if (e.key == 'ArrowDown' && d != 'up') {
        d = 'down'
        console.log("你正在按下鍵")
    }
    window.removeEventListener('keydown', changeDirection)
}
let d = "right"
function draw() {
    // 每次畫圖前確認蛇有沒有咬到自己
    for (let i = 1; i < snake.length; i++) {
        if (snake[i].x == snake[0].x && snake[i].y == snake[0].y) {
            clearInterval(myGame);
            alert('遊戲結束');
            return
        }
    }
    // 要覆蓋背景
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, canvas.width, canvas.height)


    // 劃出果實
    myFruit.drawFruit()
    for (let i = 0; i < snake.length; i++) {
        if (i == 0) {
            ctx.fillStyle = "red";
        } else {
            ctx.fillStyle = "lightblue";
        }
        ctx.strokeStyle = "white";

        // 設定蛇穿牆的功能
        if (snake[i].x >= canvas.width) {
            snake[i].x = 0
        }
        if (snake[i].x < 0) {
            snake[i].x = canvas.width - unit
        }
        if (snake[i].y >= canvas.height) {
            snake[i].y = 0
        }
        if (snake[i].y < 0) {
            snake[i].y = canvas.height - unit
        }

        ctx.strokeRect(snake[i].x, snake[i].y, unit, unit);
        ctx.fillRect(snake[i].x, snake[i].y, unit, unit);

    }



    // 以目前d的變數方向來決定蛇的下一方向
    let snakeX = snake[0].x
    let snakeY = snake[0].y
    if (d == 'left') {
        snakeX -= unit;
    } else if (d == 'right') {
        snakeX += unit;
    } else if (d == 'up') {
        snakeY -= unit;
    } else if (d == 'down') {
        snakeY += unit;
    }
    let newHead = {
        x: snakeX,
        y: snakeY
    }


    //確認蛇是否有吃到果實
    if (snake[0].x == myFruit.x && snake[0].y == myFruit.y) {
        // 重新選定一個隨機位置
        myFruit.pickLocation();

        // 劃出新果實
        // 更新分數
        score++;
        setHighestScore(score)
        document.querySelector("#myScore").innerHTML = `遊戲分數${score}`;
        document.querySelector("#myScore2").innerHTML = `遊戲分數${heighestScore}`;
    } else {
        snake.pop()
    }

    snake.unshift(newHead);
    // 有咬到自己身體要怎麼辦
    window.addEventListener("keydown", changeDirection)
}

let myGame = setInterval(draw, 1)
function loadHeightScore() {
    if (localStorage.getItem('heighestScore') == null) {
        heighestScore = 0;
    } else {
        heighestScore = Number(loadHeightScore.getItem('heighestScore'))
    }

}
function setHighestScore() {
    if (score > heighestScore) {
        localStorage.setItem("heighestScore", score);
        heighestScore = score
    }
}

