import {Box} from "./Box.js";

class Grid {
    constructor(size = 3) {
        this.size = size;
        this.boxes = [];
        this.rows = [];
        this.columns = [];
    }

    get gridSize() {
        return this.size;
    }

    set setGridSize(newSize) {
        this.size = newSize;
    }

    set boxesArray(box) {
        this.boxes.push(box);
    }

    get boxesArray() {
        return this.boxes;
    }

    getBox(x, y) {
        for (let box of this.boxesArray) {
            if (box.xCord === x && box.yCord === y) {
                return box;
            }
        }
    }

    addBox(x, y) {
        this.boxes.push(new Box(x, y));

    }

    updateBox(upBox) {
        this.boxes = this.boxes
            .map(box =>
                box.xCord === upBox.xCord && box.yCord === upBox.yCord
                    ? new Box(upBox.xCord, upBox.yCord, upBox.getValue()) : box)

    }


    [Symbol.iterator]() {
        return new GridIterator(this);
    }

    generate() {
        for (let x = 0; x < this.gridSize; x++) {
            for (let y = 0; y < this.gridSize; y++) {
                this.addBox(x, y);
            }
        }
    }
}

class GridIterator {
    constructor(grid) {
        this.grid = grid;
        this.x = 0;
        this.y = 0;
    }

    next() {
        if (this.y === this.grid.size) return {done: true}

        let value = {
            x: this.x,
            y: this.y,
            value: this.grid.getBox(this.x, this.y),
            xy: `${this.x}${this.y}`,
        }

        this.x++;
        if (this.x === this.grid.size) {
            this.x = 0;
            this.y++;
        }
        return {value, done: false}
    }
}

export {Grid};
