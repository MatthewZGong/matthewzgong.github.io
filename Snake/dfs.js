function startDFSPath(){
    let map =[]
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
    // for(var i = 0; i<snake.pixel_Size; i++){
    //     console.log(map[i]);             

    // }
  w
    let moves = [[1,0],[-1,0],[0,1],[0,-1]]
    let current = new point(snake.player.x, snake.player.y, [])
    console.log("hi")
    let result = current; 
    for(var i = 0; i< moves.length ;i++){
        let newX = current.x + moves[i][0]
        let newY = current.y + moves[i][1]
        //console.log(newX+" "+ newY) 
   
        // console.log(current.x+" "+current.y)
        if(newX >= 0 && newX <map.length){
            if(newY >= 0 && newY<map[i].length){
                if(map[newX][newY] == 0){
                    map[newX][newY] = 1
                    // console.log("new Points: "+newX+" "+newY)
                    newPoint = new point(newX,newY,[])
                    result = DFSPath(map, newPoint)
                    if(newX == snake.fruit.x && newY == snake.fruit.y){
                        answer = newPoint
                        stop = true; 
                        result.dfs = true; 
                        result.path.push(newPoint)
                        result.path.push(current)
                        result.merge(current)
                        return result; 
                    }
                    result.path.push(current)
                    result.merge(current)
                    if(result.dfs == true){
                        return result; 
                    }
                }
            }
        }

    }
    return result; 
}
function DFSPath(map, current){
    // for(var i = 0; i < map.length; i++){
    //     console.log(map[i])
    // }
   // console.log(current)
    let moves = [[1,0],[-1,0],[0,1],[0,-1]]
    let result = current; 
    for(var i = 0; i< moves.length ;i++){
        let newX = current.x + moves[i][0]
        let newY = current.y + moves[i][1]
        // console.log(newX+" "+ newY) 
        if(newX >= 0 && newX <map.length){
            if(newY >= 0 && newY<map.length){
                if(map[newX][newY] == 0){
                    map[newX][newY] = 1
                    newPoint = new point(newX,newY,[])
                    result = DFSPath(map, newPoint)
                    if(newX == snake.fruit.x && newY == snake.fruit.y){
                        console.log("found fruit")
                        answer = newPoint
                        stop = true; 
                        result.dfs = true; 
                        console.log("fruittt: "+newX +" "+ newY)
                        console.log("fruitt: "+ snake.fruit.x +" "+ snake.fruit.y)
                        console.log("fruit: "+ newPoint.x +" "+ newPoint.y)
                        result.path.push(new point(newX,newY,[]))
                        result.path.push(current)
                        result.merge(current)
                     
                        return result; 
                    }
                    result.path.push(current)
                    result.merge(current)
                    
                    if(result.dfs == true){
                        return result; 
                    }
                }
            }
        }

    }
    return result; 
}
DFS_Path = startDFSPath().path; 
// console.log("HI")
// console.log(DFS_Path.length)
// for(var i = 0; i< DFS_Path.length; i++){
//     console.log("DFS: "+DFS_Path[i].x +" "+DFS_Path[i].y)
// }
async function DFS(){
    let move = DFS_Path.pop();
    if(move != null){
        let moveX = snake.player.x -move.x
        let moveY = snake.player.y -move.y
        // console.log("next location: "+ move.x+" "+move.y);
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
        DFS_Path = startDFSPath().path; 
        // for(var i = 0; i< DFS_Path.length; i++){
        //     console.log("DFS: "+DFS_Path[i].x +" "+DFS_Path[i].y)
        // }
        DFS_Path.pop();
    }
}
function runDFS(){
    snake.start()
    // let l = BFSPath.length
    // for(var i = 0; i< l; i++){
    //     //console.log("hi");
    //     await sleep(2000);
    //      bfs();
    // }
    intervalID = setInterval(DFS, 1000/fps);
}
//runDFS()