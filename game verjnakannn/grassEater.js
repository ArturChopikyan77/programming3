let LivingCreature = require("./LivingCreature")

module.exports = class GrassEater extends LivingCreature {
    constructor(x, y) {
        super(x,y)
        this.energy = 10;
        this.directions = [];
    }
    getNewCoordinates() {
        this.directions = [
            [this.x - 1, this.y - 1],
            [this.x, this.y - 1],
            [this.x + 1, this.y - 1],
            [this.x - 1, this.y],
            [this.x + 1, this.y],
            [this.x - 1, this.y + 1],
            [this.x, this.y + 1],
            [this.x + 1, this.y + 1]
        ];
    }
    chooseCell(char) {
        this.getNewCoordinates();
        


        return super.chooseCell(char);
    }
    
    random(ch){
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random()*found.length)
        return found[result];
        }
    mul() {
        // let emptyCell = this.chooseCell(0);
        // let newCell = random(emptyCell)
        let newCell = this.random(0)
        
        if (newCell && this.energy > 5) {
            let newX = newCell[0];
            let newY = newCell[1];

            let grEat = new GrassEater(newX, newY);
            matrix[newY][newX] = 2;
            grassEaterArr.push(grEat);

            this.energy = 10;
        }
    }



    eat() {
        // let emptyCell = this.chooseCell(1);
        let newCell = this.random(1)

        if (newCell) {
            this.energy += 5;
            let newX = newCell[0];
            let newY = newCell[1];

            for (let i = 0; i < grassArr.length; i++) {
                if (grassArr[i].x == newX && grassArr[i].y == newY) {
                    grassArr.splice(i, 1)
                    break;
                }
            }

            matrix[newY][newX] = 2;
            matrix[this.y][this.x] = 0;

            this.x = newX;
            this.y = newY;

            if (this.energy > 30) {
                this.mul()
            }
        } 
        
        
        
        else {
            this.move()
        }
    }


    move() {
        let found = super.chooseCell(0);
        let exact = found[[Math.floor(Math.random() * found.length)]];

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 2;
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
                matrix[y][x] = 2;
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;
            }
        }

        // let emptyCell = this.chooseCell(0);
        // let newCell = random(emptyCell)

        // if (newCell) {
        //     let newX = newCell[0];
        //     let newY = newCell[1];

        //     matrix[newY][newX] = 2;
        //     matrix[this.y][this.x] = 0;

           
        //     this.x = newX;
        //     this.y = newY;

        //     this.energy--

        //     if (this.energy < 0) {
        //         this.die()
        //     }
        // } 
    }


    die() {
        for (let i = 0; i < grassEaterArr.length; i++) {
            if (grassEaterArr[i].x == this.x && grassEaterArr[i].y == this.y) {
                grassEaterArr.splice(i, 1)
            }
        }
        matrix[this.y][this.x] = 0;
    }
}

