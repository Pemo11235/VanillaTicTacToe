class Box {
    constructor(x,y,value = '') {
        this.x = x;
        this.y = y;
        this.value = value;
    }

     setValue(newValue) {
        if(this.value === ''){
            this.value = newValue;
        }
    }

    getValue(){
        return this.value;
    }

    set xCord(newX) {
        this.x = newX;
    }

    set yCord(newY) {
        this.y = newY;
    }

    get xCord() {
        return this.x;
    }

    get yCord() {
        return this.y;
    }
}
export {Box};
