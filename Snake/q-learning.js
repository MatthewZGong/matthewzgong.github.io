class qTable{
    constructor(learningRate, discountFactor, randomAction){
        this.table = {} 
        this.learningRate = learningRate
        this.discountFactor = discountFactor
        this.randomAction = randomAction
        this.actions = ['up', 'down', 'left', 'right']
    }
    getTable(state){
        if(this.table[state] == undefined){
            this.table[state] = { 'up':0, 'down':0, 'left':0, 'right':0 };
        }
        return this.table[state]
    }
    updateTable(before, after, reward, action){
        var qBefore = this.getTable(before);
        var qAfter = this.getTable(after)
        var value = reward + this.discountFactor * Math.max(qAfter.up, qAfter.down, qAfter.left, qAfter.right)-qBefore[action]
        this.table[before][action] = qBefore[action] + this.learningRate*value
    }
    bestAction(state){
        var qt = this.getTable(state)
        console.log(qt);
        console.log("snake pos: "+snake.player.x +" "+snake.player.y)
        if(Math.random() < this.randomAction){
            // console.log("r");
            return this.actions[Math.floor(Math.random() * this.actions.length)]
        }
        var max = qt[this.actions[0]]
        var bestA = this.actions[0]
        var zeros = []
        for(var i = 0; i < this.actions.length; i++){
            if(qt[this.actions[i]]> max){
                max = qt[this.actions[i]]
                bestA = this.actions[i]
            }
            if(qt[this.actions[i]] == 0 ){
                zeros.push(this.actions[i])
            }
        }
        if(max == 0){
            // console.log("r");
            return  zeros[Math.floor(Math.random() * zeros.length)]
        }
        // console.log("c");
        return bestA
    }
}

var qLearningTable = new qTable(learningR, discountF, randomF )
function state(){
    let length = snake.pixel_Size
    let player = snake.player

    let fruit = snake.fruit
    let fruitState = {x:0 ,y:0}


    let past_moves = snake.past_moves
    let past_movesState = [] 
    
    fruitState.x = fruit.x - snake.player.x; 
    while(fruitState.x < 0) fruitState.x += snake.width;
    while(fruitState.x > snake.width) fruitRelativePose.x -= snake.width;


    fruitState.y = fruit.y - snake.player.y; 
    while(fruitState.y < 0) fruitState.y += snake.length;
    while(fruitState.y > snake.length) fruitRelativePose.y -= snake.length;
var state = fruitState.x + ',' + fruitState.y;
    for(var i = 0 ; i< past_moves.length;i++){
        if(past_movesState[i] == undefined) past_movesState.push({x:0,y:0})
        past_movesState[i].x = past_moves.x- snake.player.x 
        while(past_movesState[i].x < 0) past_movesState[i].x += snake.width;
        while(past_movesState[i].x > snake.width) past_movesState[i].x -= snake.width;
        past_movesState[i].y = past_moves.y- snake.player.y 
        while(past_movesState[i].y < 0) past_movesState[i].y += snake.length;
        while(past_movesState[i].y > snake.lengtb) past_movesState[i].y -= snake.length;
        state += ',' + past_movesState[i].x + ',' + past_movesState[i].y;
    }
    return state
}

function distance(){
    return (snake.fruit.x - snake.player.x)*(snake.fruit.x - snake.player.x)+(snake.fruit.y - snake.player.y)*(snake.fruit.y - snake.player.y)
}
async function qLearning(){   
    var currentState = await state();
    var action = qLearningTable.bestAction(currentState); 
    // console.log(action)
    var beforeDistance = await distance();
    await snake.action(action)
    var reward = await loop()
    var afterDistance = distance();
    // if(reward == -0.1 && afterDistance < beforeDistance ){
    //     reward = 0.1   
    // }
    var afterState = await state()
    qLearningTable.updateTable(currentState, afterState, reward, action)
}
// function runQLearning(){
//     clearInterval();
//     intervalID = setInterval(qLearniing, 1000/15);
// }
function runQLearning(){
    snake.start()
    intervalID = setInterval(qLearning , 1000/fps)
}
// runQLearning();