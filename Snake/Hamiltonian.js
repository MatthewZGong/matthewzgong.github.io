function Hamiltonian(){
    if(snake.length == 0 && snake.width == 0){
        
    }
}

// function makeGraph(){
//     var length = snake.pixels 
//     var map = [];
//     console.log("length: " +length)
//     for(var i = 0 ;i < length*length;i++){
//         var holder = []
//         for(var j = 0 ; j< length*length; j++){
//             holder.push(0)
//         }
//         if(i%length - 1 > 0){
//             holder[i-1] = 1
//         }
//         if(i%length + 1 <= length){
//             holder[i+1] = 1
//         }
//         if(i >= length){
//             holder[i-length] = 1
//         }
//         if(i < length*length-length){
//             holder[i+length] = 1
//         }
//         map[i] = holder
//     }

//     return map
// }
// function getHamiltonianPath(graph){

//         path = []
//         for (var i = 0; i < graph.length;  i++)  path.push(-1); 
  
//         path[0] = 0; 
//         if (hamCycleUtil(graph, path, 1) == false) 
//         { 
//             console.log("no solution")
//             return 0; 
//         } 
  
 
//         return path; 
// }
// function hamCycleUtil(graph, path,pos) 
// { 

//     if (pos == graph.length) 
//     { 

//         if (graph[path[pos - 1]][path[0]] == 1) 
//             return true; 
//         else
//             return false; 
//     } 

//     for (var v = 1; v < graph.length; v++) 
//     { 
//         if (isSafe(v, graph, path, pos)) 
//         { 
//             path[pos] = v; 
//             if (hamCycleUtil(graph, path, pos + 1) == true) 
//                 return true; 
//             path[pos] = -1; 
//         } 
//     } 

//     return false; 
// } 
// function isSafe(v, graph, path, pos) 
//     { 

//         if (graph[path[pos - 1]][v] == 0) 
//             return false; 
//         for (var i = 0; i < pos; i++) 
//             if (path[i] == v) 
//                 return false; 
//         return true; 
//     } 

// // graph = makeGraph();
// // var path = getHamiltonianPath(graph)
// // console.log(path)
