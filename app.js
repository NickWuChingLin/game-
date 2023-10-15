const canvas = document.getElementById("myCanvas");
const ctx = canvas.getContext("2d");
// getContext() method會回傳一個canvas的drawing context，
// drawing context可以用來在canvas內畫圖
const unit =20;
const row =canvas.height / unit;
const colum =canvas.width / unit;
let snake = [];//array 中每個元素都是一個物件

    snake[0]={
        x:80,
        y:0
    };
    snake[1]={
        x:60,
        y:0
    };
    snake[2]={
        x:40,
        y:0
    };
    snake[3]={
        x:20,
        y:0
    };
//初始設定
//物件的工作就是儲存身體的x,y座標

class Fruit{
    constructor(x,y){
        this.x=Math.floor(Math.random()*colum)*unit;
        this.y=Math.floor(Math.random()*row)*unit;
    }
    drawFruit(){
        ctx.fillStyle="yellow";
        ctx.fillRect(this.x,this.y,unit,unit);
    }
    pickLocation(){
        let overlapping =false;
        let new_x;
        let new_y;
        function checkOverlapping(new_x,new_y){
       for(i=0;i<snake.length;i++){
        if(new_x ==snake[i].x&&new_y ==snake[i].y){
            overlapping =true;
            return;
        }else{
            overlapping =false;
        }
       }
        }
        do{
         new_x =Math.floor(Math.random()*colum)*unit;
         new_y =Math.floor(Math.random()*row)*unit;
         checkOverlapping(new_x,new_y);
         this.x =new_x;
         this.y =new_y;
        }while(overlapping)
    }
}

let myFruit = new Fruit();
window.addEventListener("keydown",changeDirection);
let d ="Right";
function changeDirection(e){
if(e.key == "ArrowLeft"&& d!=="right"){
    d="Left"
}else if (e.key =="ArrowDown"&&d!=="up"){
    d="Down"

}else if (e.key =="ArrowRight"&& d!=="Left"){
    d ="Right"

}else if (e.key =="ArrowUp"&&d!=="Dwon"){
    d ="Up"
 
}
//每次按下上下左右鍵之後,在下一次被畫出來前
//不接受任何keydown事件
//可以防止連續按鍵導致蛇在邏輯上自殺
window.removeEventListener("keydown",changeDirection);
}
let score =0;

document.getElementById("myScore").innerHTML ="遊戲分數"+score;
function draw(){
    //每次畫圖前確認蛇有沒有咬到自己
    for(let i =1; i<snake.length;i++){
        if(snake[i].x==snake[0].x && snake[i].y==snake[0].y){
            clearInterval(myGame);
            alert("遊戲結束");
            return;
        }
        
    }

    //背景全設定為黑色
    ctx.fillStyle="rgb(198, 12, 236)";
    ctx.fillRect(0,0,canvas.width,canvas.height);
    myFruit.drawFruit();
    //劃出蛇
    for(i=0; i<snake.length; i++){
    if(i == 0){
        ctx.fillStyle ="blue"
    }else{
        ctx.fillStyle ="red"
    }
    ctx.strokeStyle="white"//劃出白色外框
    //x,y,width,height 劃出實心的原

    if(snake[i].x>=canvas.width){
        snake[i].x=0;
    }
    if(snake[i].y>=canvas.height){
        snake[i].y=0;
    }
    if(snake[i].x<0){
        snake[i].x =canvas.width-unit;
    }
    if(snake[i].y<0){
        snake[i].y=canvas.height - unit;
    }

    ctx.fillRect(snake[i].x,snake[i].y,unit,unit);
    ctx.strokeRect(snake[i].x,snake[i].y,unit,unit);
}
//以目前d變數方向來決定蛇的下一貞在哪個座標
let snakeX =snake[0].x;//snake[0]是一個物件
let snakeY =snake[0].y;
if(d =="Left"){
snakeX -=unit;
}else if(d =="Up"){
    snakeY -=unit;
}else if(d =="Down"){
    snakeY +=unit;
}else if(d =="Right"){
    snakeX+=unit;
}
let newHead ={
    x:snakeX,
    y:snakeY
};
//確認蛇是否吃到果實
if(snake[0].x == myFruit.x && snake[0].y == myFruit.y){
    myFruit.pickLocation();
    console.log("吃到果實了");
    score++;
    document.getElementById("myScore").innerHTML ="遊戲分數"+score;
//重新選定一個新的隨機位置
//畫出心果實
//更新分數
}else{
    snake.pop();
}
console.log(snake.length)
snake.unshift(newHead);
window.addEventListener("keydown",changeDirection)

}

let myGame =setInterval(draw,100);

