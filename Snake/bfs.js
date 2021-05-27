
class point {
    constructor(x,y,path){
        this.x = x
        this.y = y
        this.path = path 
        this.dfs = false;
    }
    merge(other){
       for(var i = 0; i <other.path.length ; i++){
           this.path.push(other.path[i]);
       }
    }
}
 var BFSPath = null

 

async function bfs(){ 
    // if(BFSPath.length == 0){
    //   BFSPath = await bfsPath().path;
    //     console.log("length" + BFSPath.length)
    // }
    
    let move = BFSPath.shift();

    if(move != null){
    let moveX = snake.player.x -move.x
    let moveY = snake.player.y -move.y
    //console.log("next location: "+ move.x+" "+move.y);
    if(moveX == 1){
        snake.action('left')
    }else if(moveY == 1){
        snake.action("up")
    }else if(moveX == -1){
        snake.action("right")
    }else if(moveY == -1){
        snake.action("down")
    }
}
    //console.log(snake.velocity.x +" "+ snake.velocity.y)
    let reward = await loop();
    if(reward == -1 || reward == 1){
        console.log("reset path")
        BFSPath = bfsPath().path;
        BFSPath.shift();
    }
    // console.log(snake.player.x+" "+snake.player.y)

}
function sleep(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }
async function runBFS(){
    snake.start()
    BFSPath = bfsPath().path
    // console.log("was here 1")
    // let l = BFSPath.length
    // for(var i = 0; i< l; i++){
    //     //console.log("hi");
    //     await sleep(2000);
    //      bfs();
    // }
    intervalID = setInterval(bfs, 1000/fps);
}
function bfsPath(){
    let map = []
    //makiing the map
    for(var i = 0; i<snake.width; i++){
        let holder = []; 
        for(var j = 0; j<snake.length ;j++){
            holder.push(0)                
        }
        map.push(holder);
    }
    
   

    map[snake.player.x][snake.player.y] = 1;
   // console.log("player locatioin: " +snake.player.x + " "+snake.player.y)
    for(var i = 0; i < snake.past_moves.length;i++ ){
        map[snake.past_moves[i].x][snake.past_moves[i].y] = 1;
    }
        //calculating the path 
    // console.log(snake.pixel_Size)
    map[snake.fruit.x][snake.fruit.y] = 2;
    for(var i = 0; i<snake.pixel_Size; i++){
        let holder = map[i]; 
            console.log(map[i]);             

    }
    let queue = []
    let start = new point(snake.player.x, snake.player.y, [])
    queue.push(start)
    //console.log(start.x+" "+ start.y)
    let moves = [[1,0],[-1,0],[0,1],[0,-1]]
    let stop = false;
    let answer = null;
    //console.log(map.length*map[0].length)
    // console.log("fruit: "+snake.fruit.x +" "+ snake.fruit.y)
    var counter = 0;

    while(queue.length != 0 && stop == false ){
        //console.log(queue.length);
        let current = queue.shift()
        answer = current;
        counter++
        for(var i = 0; i< moves.length ;i++){
            let newX = current.x + moves[i][0]
            let newY = current.y + moves[i][1]
            //console.log(newX+" "+ newY) 
            if(newX >= 0 && newX <map.length){
                if(newY >= 0 && newY<map[i].length){
                    if(map[newX][newY] != 1){
                        
                        map[newX][newY] = 1
                        newPoint = new point(newX,newY,[])
                        newPoint.merge(current)
                        newPoint.path.push(current)
                        queue.push(newPoint);
                    }
                }
            }
            if(newX == snake.fruit.x && newY == snake.fruit.y){
                answer = newPoint
                stop = true; 
                break
            }
            
        }

    }
    // console.log("hello");
    // console.log(answer.x+" "+answer.y)
    
    answer.path.push(answer);
    // for(var i = 0; i<answer.path.length; i++){
    //     console.log(answer.path[i].x+" "+answer.path[i].y);
    // }
    return answer
}


 runBFS()
