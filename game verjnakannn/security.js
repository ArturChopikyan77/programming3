let LivingCreature = require("./LivingCreature")

module.exports = class Security extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.multiply = 0
        this.directions = [];
    }

    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
        ];
    }

    chooseCell(char) {
        this.getNewCoordinates()
        
        return super.chooseCell(char);
    }

    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
        }

    mul() {
        // this.multiply++;
        // var emptyCells = this.chooseCell(0);
        // var newCell = random(emptyCells);
        var newCell = this.random(0)
   
        if (newCell && this.multiply >=20) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 5;

            var securEat = new Security(newX, newY);
            securityArr.push(securEat);
            this.multiply = 1;
        }
    }

    move() {

        let found = super.chooseCell(0);
        let exact = found[[Math.floor(Math.random() * found.length)]];

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = matrix[this.y][this.x];
            matrix[this.y][this.x] = 0;
            this.x = x;
            this.y = y;
        }
        else {
            let found = super.chooseCell(1);
            let exact = found[[Math.floor(Math.random() * found.length)]];
            if (exact) {
                let x = exact[0];
                let y = exact[1];
                matrix[y][x] = matrix[this.y][this.x];
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;
            }
        }
        // this.energy--
        // var emptyCell = this.chooseCell(0)
        // var newCell = random(emptyCell)

        // if (newCell && this.energy >= 0) {
         
        //     var newX = newCell[0]
        //     var newY = newCell[1]
        //     matrix[newY][newX] = matrix[this.y][this.x]
        //     matrix[this.y][this.x] = 0
        //     this.x = newX
        //     this.y = newY
        // }    
        
    }

    collect() {
        var emptyCell = this.chooseCell(5)
        var newCell = random(emptyCell)

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]

            matrix[newY][newX] = matrix[this.y][this.x]
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY
            for (var i in grassArr) {
                if (newX == grassArr[i].x && newY == grassArr[i].y) {
                    grassArr.splice(i, 1)
                    break
                }
            }
        }
        else {
            this.move()
        }
    }

    
}