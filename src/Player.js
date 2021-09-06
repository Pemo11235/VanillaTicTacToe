class Player {
   constructor(sign = 'X', color = 'white') {
      this.playerSign = sign;
      this.color = color;
      this.name = `PLAYER ${this.playerSign}`
   }
}
export {Player}
