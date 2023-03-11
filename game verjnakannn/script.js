function matrixGenerator(matrixSize,grass,grassEater,predator,vorsord,security,bomb) {
    var matrix = []

    for (let i = 0; i < matrixSize; i++) {
        matrix.push([])
        for (let j = 0; j < matrixSize; j++) {
        matrix[i].push(0)
        
        }
    }


    for (let i = 0; i < grass; i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 1
        
    }

    for (let i = 0; i < grassEater; i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 2
        
    }
    


    for (let i = 0; i < predator; i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 3

        
    }


    for (let i = 0; i < vorsord; i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 4
        
    }

    // for (let i = 0; i < Security; i++) {
        
    //     var x = Math.floor(Math.random() * matrixSize)
    //     var y = Math.floor(Math.random() * matrixSize)

    //     matrix[y][x] = 5
        
    // }

    for (let i = 0; i < matrix.length; i++) {
    
        for (let j = 0; j < matrix[i].length; j++) {
    
                        if (i == j) {
                            matrix[i][j] = 5
                        }
        }
    }

    for (let i = 0; i < bomb; i++) {
        
        var x = Math.floor(Math.random() * matrixSize)
        var y = Math.floor(Math.random() * matrixSize)

        matrix[y][x] = 6
        
    }

    return matrix
}

var matrix = matrixGenerator(30,50,25,5,15,10,5)
var side = 25
//

var grassArr = []
var grassEaterArr = []
var predatorArr = [] 
var vorsordArr = []
var securityArr = []
var bombArr = []


function setup() {
    frameRate(15)
    createCanvas(matrix[0].length * side ,matrix.length * side)

    for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
       
           if(matrix[y][x] == 1){
                var gr = new Grass(x,y)
                grassArr.push(gr)
           }else  if(matrix[y][x] == 2){
            var grEat = new GrassEater(x,y)
            grassEaterArr.push(grEat)
           }else if(matrix[y][x] == 3){
            var pred = new Predator(x,y)
                predatorArr.push(pred)
            }else if(matrix[y][x] == 4){
                var vorsord = new Vorsord(x,y)
                    vorsordArr.push(vorsord)
                }
                else if(matrix[y][x] == 5){
                    var security = new Security(x,y)
                        securityArr.push(security)
                    }else if(matrix[y][x] == 6){
                        var bomb = new Bomb(x,y)
                            bombArr.push(bomb)
                        }
           }
        }
        
    }



function draw() {
    
      for (let y = 0; y < matrix.length; y++) {
        for (let x = 0; x < matrix[y].length; x++) {
          var tbot = side-side*0.1
          textSize (tbot)
                if(matrix[y][x] == 1){
                     fill ("green")
                     rect(x * side, y * side,side,side)
                     text('🍀',x * side,y * side +tbot)
                }else if (matrix[y][x] == 2){
                        fill ("yellow")
                        rect(x * side, y * side,side,side)
                        text('🐄',x * side,y * side +tbot)
                }else if(matrix[y][x] == 3){
                            fill ("red")
                            rect(x * side, y * side,side,side)
                            text('👹',x * side,y * side+tbot)
                }else if(matrix[y][x] == 4){
                    fill ("pink")
                    rect(x * side, y * side,side,side)
                    text('🥷🏻',x * side,y * side +tbot)
                 }else if(matrix[y][x] == 5){
                    fill ("orange")
                    rect(x * side, y * side,side,side)
                    text('👮🏻‍♂️',x * side,y * side+tbot)
                 }else if(matrix[y][x] == 6){
                    fill ("black")
                    rect(x * side, y * side,side,side)
                    text('💣',x * side,y * side +tbot)
                 }
                else{
                    fill ("gray")
                    rect(x * side, y * side,side,side)

                }
                // rect (x * side , y * side ,side,side)
        }
          
      }

      for(let i in  grassArr){
            grassArr[i].mul()
      }

      for(let i in  grassEaterArr){
        grassEaterArr[i].eat()
        
  }



     for(let i in predatorArr){
         predatorArr[i].eat()
     }


     for(let i in vorsordArr){
        vorsordArr[i].kill()
    }


    for(let i in securityArr){
        securityArr[i].mul()
    }

   
    for(let i in bombArr){
        bombArr[i].mul()
    }
}