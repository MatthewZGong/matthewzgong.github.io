//Global Variables 
//ik im bad at coding 
//:P

// var QSettings = [];
// for(var i = 0; i<QSettings.length ; i++){
//     QSettings[i].style.display = "block"
// }
var QLearningSets= document.getElementById("QLearingSettings");
QLearningSets.style = "display:none;"
var fps = 10;
canvas = document.getElementById('game-board');
ctx = canvas.getContext('2d');
var game_Width = 20
var game_Length = 20
var game_Pixel_Size = 20;
var intervalID = null;
var mode = 'bfs';
var discountF = 0.9; 
var randomF = 0.05
var learningR = 0.85
var TailLength = 0;
var Deaths = -1; 
var Score = 0; 
var TotalScore= 0; 
var Average = 0; 
function updateScoreBoard(){
    document.getElementById("p1").innerHTML = "Score: "+Score;
    document.getElementById("p2").innerHTML = "Deaths "+Deaths;
    document.getElementById("p3").innerHTML = "Average: "+TotalScore/Deaths;
}

// canvas.width = 500;
// canvas.length = 500;
// x = width; 
// y = length; 
class Game {
    constructor(tailSize, play, walls, width, length, pixel_Size){
        this.walls = walls; 
        this.intial_tail_size = tailSize
        this.tail = tailSize
        this.play = play;
        this.intial_starting_pos = {x: Math.floor(width/2) ,y: Math.floor(length/2) }    
        this.velocity = {x : 0, y: 0}
        this.pixel_Size = pixel_Size
        this.past_moves = [] 
        this.fruit = {x: 0, y:0}
        this.player = { x:  this.intial_starting_pos.x, y:  this.intial_starting_pos.y }
        this.points = 0;
        this.lastAction = null;
        //for q learning 
        this.reward = 0; 
        this.width = width;
        this.length = length;

    }
    action(a){
        //console.log(this.lastAction);
        if( a == 'up' && this.lastAction != 'down'){
            this.velocity.x = 0; 
            this.velocity.y = -1;
            this.lastAction = a;
        }else if( a == 'down'&& this.lastAction != 'up'){
            this.velocity.x = 0; 
            this.velocity.y = 1;
            this.lastAction = a;

        }else if( a == 'right'&& this.lastAction != 'left'){
            this.velocity.x = 1; 
            this.velocity.y = 0;
            this.lastAction = a;
        

        }else if( a == 'left'&& this.lastAction != 'right'){
            this.velocity.x = -1; 
            this.velocity.y = 0;
            this.lastAction = a;
        }
    }
    randomFruit(){
        this.fruit.x = 1+Math.floor(Math.random() * (this.width-1));
        this.fruit.y = 1+Math.floor(Math.random() * (this.length-1));
        //console.log(this.fruit.x +" "+ this.fruit.y)
    }

    wallCheck(){
        if(this.walls == true){
            if(this.player.x <= -1) this.reset();
            if(this.player.x >= this.width) this.reset();
            if(this.player.y <= -1) this.reset();
            if(this.player.y >= this.length) this.reset();
        }else{
            if(this.player.x <= -1) this.player.x = this.width;
            if(this.player.x >= this.width) this.player.x = -1;
            if(this.player.y <= -1) this.player.y = this.length;
            if(this.player.y >= this.width) this.player.y = -1;
        }
    }

    reset(){
       // console.log("testing");
        TotalScore += Score;
        Score = 0; 
        Deaths++; 
        Average = TotalScore/Deaths; 

        ctx.fillStyle = 'gray'
        this.randomFruit();
        canvas.width = this.width * this.pixel_Size; 
        canvas.height = this.length * this.pixel_Size; 
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        this.lastAction = null;
        this.velocity =  {x : 0, y: 0};
        this.intial_starting_pos = {x: Math.floor(this.width/2) ,y: Math.floor(this.length/2) }    
        this.player = { x:  this.intial_starting_pos.x, y:  this.intial_starting_pos.y }
        this.tail = this.intial_tail_size
        
        this.past_moves = []
        this.past_moves.push({ x: this.player.x, y: this.player.y});
       // console.log(this.past_moves.length-1);
        this.reward = -1;
    }
    start(){
        this.reset() 
        if(this.play == true){
            this.attach();
        }
    }
    stop(){
        
    }
    pause(){
        this.velocity.x = 0; 
        this.velocity.y = 0; 
        
    }   
    attach(){
        addEventListener("keydown", (event) => {
            if (event.keyCode == 37)    this.action("left");
            if (event.keyCode == 38)  this.action('up');
            if (event.keyCode == 39)  this.action('right');
            if (event.keyCode == 40)  this.action('down');
  
        });
    }
    
}

    var snake = new Game(3,true, true, game_Width, game_Length, game_Pixel_Size);
    function loop(){ 
        snake.reward = -0.1;
        //console.log("loop")
    
        //pausing check
       // console.log(snake.velocity.x +" "+ snake.velocity.y)
        var paused = (snake.velocity.x == 0 && snake.velocity.y == 0)
        snake.player.x += snake.velocity.x
        snake.player.y += snake.velocity.y
        // console.log("velocity: " + snake.velocity.x + " "+ snake.velocity.y);
        ctx.fillStyle = 'rgba(40,40,40,0.8)';
        ctx.fillRect(0,0,canvas.width,canvas.height);
        if(paused == false){
            snake.past_moves.push({x: snake.player.x, y: snake.player.y});
            while(snake.past_moves.length > snake.tail){
                snake.past_moves.shift();
     
            } 
        }
        ctx.fillStyle = 'green'
        snake.wallCheck();
        //moving the snake 
      //  console.log(snake.past_moves.length);
        for(var i=0; i<snake.past_moves.length-1; i++) {
    
           // console.log(snake.past_moves[i].x+" "+ snake.past_moves[i].y)
            ctx.fillRect(snake.past_moves[i].x * snake.pixel_Size+1, snake.past_moves[i].y * snake.pixel_Size+1, snake.pixel_Size-2, snake.pixel_Size-2);
            if (!paused && snake.past_moves[i].x == snake.player.x && snake.past_moves[i].y == snake.player.y){
              snake.reset();
              console.log("hi ya ya ya ya ")
            }
            ctx.fillStyle = 'lime';
          }
          ctx.fillRect(snake.past_moves[snake.past_moves.length-1].x * snake.pixel_Size+1, snake.past_moves[snake.past_moves.length-1].y * snake.pixel_Size+1, snake.pixel_Size-2, snake.pixel_Size-2);
    
    
        //fruit check
          if(snake.player.x == snake.fruit.x && snake.player.y == snake.fruit.y){
            console.log("fruit:"+snake.player.x +" "+ snake.player.y )
            snake.tail++;
            snake.points++;
            Score ++; 
            snake.randomFruit();
            //console.log("hit");
            snake.reward = 1.0;
            while((function () {
        
                //console.log("reee");
                for(var i=0; i<snake.past_moves.length; i++) {
                  if (snake.past_moves[i].x == snake.fruit.x && snake.past_moves[i].y == snake.fruit.y) {
                    snake.randomFruit();
                    return true;
                  }
                }
                return false;
              })());
          }
          ctx.fillStyle = 'red';
          ctx.fillRect(snake.fruit.x * snake.pixel_Size, snake.fruit.y * snake.pixel_Size, snake.pixel_Size, snake.pixel_Size);
          //console.log("end")
          updateScoreBoard()
          return snake.reward 
    }
    // var snake = new Game(3,20,true, true);
    function normalPlay(){
        snake.start()
        // snake.reset()
        intervalID = setInterval(loop , 1000/fps)
    }
    // normalPlay()