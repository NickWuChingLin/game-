const c = document.querySelector("#myCanvas");
const cWidth = c.width;
const cHeight = c.height;
console.log(cWidth, cHeight)
const ctx = c.getContext("2d");
let circle_x = 160;
let circle_y = 60;
let radius = 20;
let xSpeed = 20;
let ySpeed = 20;
let groundX = 100;
let groundY = 500;
let groundHeight = 5;
let breakArray = [];
let count = 0;
let game;
// 生成隨機的數字
function getRandom(min, max) {
    return min + Math.floor(Math.random() * (max - min))
}
class Brick {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.width = 20;
        this.height = 20;
        breakArray.push(this)
    }
    drawBrick() {
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height)
    }
    touchingBall(ballX, ballY) {
        return (
            ballX >= this.x - radius && ballX <= this.x + this.width + radius && ballY <= this.y + radius + this.height && ballY >= this.y - radius
        )
    }
}
// 製作所有的brick
for (let i = 0; i < 9; i++) {
    new Brick(getRandom(0, 950), getRandom(0, 550))
}


let brick1 = new Brick(100, 100);
c.addEventListener("mousemove", (e) => {
    console.log(e)
    groundX = e.clientX
})

function drawCricle() {

    // 確認球是否打到磚塊
    breakArray.forEach((i, index) => {
        if (i.touchingBall(circle_x, circle_y)) {
            count++;
            console.log(count);
            // 改變x y 方向速度並且將brick移除
            // 從下方撞擊，從上方撞擊
            if ((circle_y >= i.y + i.height) || (circle_y < i.y)) {
                ySpeed *= -1
            }
            // 從左方撞擊
            else if ((circle_x >= i.x + i.width) || (circle_x < i.x)) {
                xSpeed *= -1
            }
            breakArray.splice(index, 1);
            if (breakArray.length == 0) {
                alert("遊戲結束")
                clearInterval(game);
                clearInterval(interval);
            }

        }
    }

    )

    // 確認球是否有打到橘色地板
    if (circle_x >= groundX - radius && circle_x <= groundX + radius + 200 && circle_y >= groundY - radius && circle_y <= groundY + radius) {
        if (ySpeed > 0) {
            circle_y -= 20;

        } else {
            circle_y += 20;

        }
        ySpeed *= -1
    }

    // 確認球有沒有打到邊界

    // 確認球右邊的邊界
    if (circle_x >= cWidth - radius) {
        xSpeed *= -1;
    }
    // 確認球左邊的邊界
    if (circle_x <= radius) {
        xSpeed *= -1
    }
    // 確認球上邊的邊界
    if (circle_y <= radius) {
        ySpeed *= -1
    }
    // 確認球下邊的邊界
    if (circle_y >= cHeight) {
        ySpeed *= -1
    }
    // 移動球
    circle_x += xSpeed;
    circle_y += ySpeed
    //    畫出黑色背景
    ctx.fillStyle = "black"
    ctx.fillRect(0, 0, cWidth, cHeight);
    // 劃出所有的brick
    breakArray.forEach(i => {
        i.drawBrick()
    })

    // 劃出可控制的地板
    ctx.fillStyle = 'yellow';
    ctx.fillRect(groundX, groundY, 200, groundHeight)

    // 劃出圓球
    // x,y圓心的座標
    ctx.beginPath();
    ctx.arc(circle_x, circle_y, radius, 0, 2 * Math.PI)
    ctx.fillStyle = 'green';
    ctx.fill()
}



// 碼表功能
let seconds = 0;
let m_seconds = 0;
let start = document.querySelector(".start");
const dispalyMseconds = document.querySelector("#minutes ");
const displaySeconds = document.querySelector("#seconds");
let timer = () => {
    m_seconds++;
    if (Number(m_seconds) <= 9) {
        dispalyMseconds.innerHTML = `0${m_seconds}`
    }
    if (Number(m_seconds) > 9) {
        dispalyMseconds.innerHTML = m_seconds;
    }
    console.log(m_seconds);

    if (m_seconds > 99) {
        seconds++;
        displaySeconds.innerHTML = `0${seconds}`;
        m_seconds = 0;
        dispalyMseconds.innerHTML = `0${m_seconds}`
    }
    if (Number(seconds) > 9) {
        displaySeconds.innerHTML = `${seconds}`;
    }
}
let interval;
start.addEventListener("click", () => {

    interval = setInterval(timer, 10);
    game = setInterval(drawCricle, 20);
    // window.location.reload();
})
