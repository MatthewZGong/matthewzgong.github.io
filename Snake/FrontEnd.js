
// var FrontEnd = (function(){
  




//     // intervalID = setInterval(snake.loop(), 1000 / 15);
// })()
// $("#pxiels_enter").click(function(){
//     $("#current").text($("#default").val())
// })
$("#pixels_enter").click(function(){
    game_Pixel_size =  $("#pixels").val()
    snake.pixel_Size = game_Pixel_size
    runApplication();

})
$("#length_enter").click(function(){
    game_Length =  $("#Length").val()
    snake.length= game_Length
    runApplication();
})
$("#width_enter").click(function(){
    game_Width =  $("#Width").val()
    snake.width = game_Width
    runApplication();
})
$("#fps_enter").click(function(){
    fps =  $("#FPS").val()
    clearInterval(intervalID)

    if(mode == "bfs"){
        intervalID = setInterval(bfs , 1000/fps)
    }else if(mode == 'dfs'){
        intervalID = setInterval(DFS , 1000/fps)
    }else if(mode == 'q-learning'){
        intervalID = setInterval(qLearning , 1000/fps)
    }else{
        intervalID = setInterval(loop , 1000/fps)
    }
})
$("#Play").click(function(){
    mode = "normal-play"
    runApplication();
})
$("#BFS").click(function(){
    mode = "bfs"
    runApplication();
})
$("#DFS").click(function(){
    mode = "dfs"
    runApplication();
})
$("#Q-Learning").click(function(){
    mode = "q-learning"
    runApplication();
})




$("#Learning_enter").click(function(){
    learningR=  $("#Learning").val()
    qLearningTable.learningRate = learningR
})
$("#Discount_enter").click(function(){
    discountR=  $("#Discount").val()
    qLearningTable.discountFactor = discountR
})
$("#Random_enter").click(function(){
    randomF =  $("#Random").val()
    qLearningTable.randomAction = randomF
}) 
$("#Wall").click(function(){
    if(snake.walls == false){
        snake.walls = true;
    }else{
        snake.walls = false;
    }
    runApplication();
}) 


function runApplication(){
    Deaths = -1; 
    Score = 0; 
    TotalScore= 0; 
    Average = 0; 
    updateScoreBoard()
    clearInterval(intervalID)
    // snake.reset()
    var QLearningSets= document.getElementById("QLearingSettings");
    QLearningSets.style = (mode == 'q-learning') ? "display:block;": "display:none;"
    console.log('lulululuulululul')
    if(mode == "bfs"){
        runBFS()
    }else if(mode == 'dfs'){
        runDFS();
    }else if(mode == 'q-learning'){
        qLearningTable = new qTable(learningR, discountF, randomF )
        runQLearning();
    }else{
        normalPlay()
    }
}

