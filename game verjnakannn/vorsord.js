let LivingCreature = require("./LivingCreature")

module.exports = class Vorsord extends LivingCreature {
    constructor(x, y) {
        super(x, y)
        this.energy = 8;
        this.multiply = 2
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

    chooseCell(character) {
        this.getNewCoordinates()

        return super.chooseCell(character);
    }
    random(ch) {
        let found = this.chooseCell(ch);
        let result = Math.floor(Math.random() * found.length)
        return found[result];
    }
    mul() {
        // this.multiply++;
        // var emptyCells = this.chooseCell(0);
        // var newCell = random(emptyCells);
        var newCell = this.random(0)

        if (newCell && this.multiply >= 15) {
            var newX = newCell[0];
            var newY = newCell[1];
            matrix[newY][newX] = 4;

            var hun = new vorsord(newX, newY);
            vorsordArr.push(hun);
            this.multiply = 2;
        }
    }

    move() {

        let found = super.chooseCell(0);
        let exact = found[[Math.floor(Math.random() * found.length)]];

        if (exact) {
            let x = exact[0];
            let y = exact[1];
            matrix[y][x] = 4;
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
                matrix[y][x] = 4;
                matrix[this.y][this.x] = 0;
                this.x = x;
                this.y = y;
            }
        }

        // this.energy--
        // var emptyCells = this.chooseCell(0)
        // var newCell = random(emptyCells);

        // if (newCell && this.energy >= 0) {

        //     var newX = newCell[0]
        //     var newY = newCell[1]
        //     matrix[newY][newX] = 4
        //     matrix[this.y][this.x] = 0
        //     this.x = newX
        //     this.y = newY
        // }
        // else {
        //     if (this.energy < 0) {
        //         this.die()
        //     }
        // }
    }

    kill() {
        var emptyCells = this.chooseCell(3)
        var newCell = random(3);

        if (newCell) {
            this.energy++
            var newX = newCell[0]
            var newY = newCell[1]
            for (var i in predatorArr) {
                if (newX == predatorArr[i].x && newY == predatorArr[i].y) {
                    predatorArr.splice(i, 1)
                    break
                }
            }
            matrix[newY][newX] = 4
            matrix[this.y][this.x] = 0
            this.x = newX
            this.y = newY

        }
        else {
            this.move()
        }
    }

    die() {
        matrix[this.y][this.x] = 0;
        for (var i in vorsordArr) {
            if (this.x == vorsordArr[i].x && this.y == vorsordArr[i].y) {
                vorsordArr.splice(i, 1);
                break;
            }
        }
    }
}