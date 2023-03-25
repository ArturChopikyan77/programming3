var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);

var messages = [];
app.use(express.static("."));
app.get('/', function (req, res) {
    res.redirect('index.html');
});

server.listen(3000, function () {
    console.log("server okay")
});

io.on('connection', function (socket) {
    for (var i in messages) {
        socket.emit("display message", messages[i]);
    }
    socket.on("send message", function (data) {
        messages.push(data);
        io.sockets.emit("display message", data);
    });
});

function matrixGenerator(matrixSize, grass, grassEater, predator, vorsord, security, bomb) {
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

matrix = matrixGenerator(30, 50, 25, 5, 15, 10, 5)


grassArr = []
grassEaterArr = []
predatorArr = []
vorsordArr = []
securityArr = []
bombArr = []

const Grass = require("./grass")
const GrassEater = require("./grassEater")
const Predator = require("./predator")
const Vorsord = require("./vorsord")
const Security = require("./security")
const Bomb = require("./bomb")



function creatObj(){
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


    creatObj()

    function gameMove(){
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

    setInterval(gameMove,1000)