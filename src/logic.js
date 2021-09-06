import {Grid} from "./Grid.js";
import {Player} from "./Player.js";

async function createGame() {
    let grid = new Grid();
    grid.generate();
    let actualMoves = 0;
    const moves = grid.gridSize * grid.gridSize;

    const playerX = new Player('X', 'red')
    const playerO = new Player('O', 'blue');

    let p = document.getElementById('turn');
    p.innerHTML = playerX.name;
    p.style.color = playerX.color;
    let resetButton = document.getElementById('reset')
    resetButton.addEventListener('click', event => {
        reset();
    })
    let winner = {
        name: '',
        listener() {
            setTimeout(() => {
                    if (this.name !== '') {
                        alert(`${this.name} IS THE WINNER !`);
                        reset();
                    }
                }
                , 200)
        },

        win(name) {
            this.name = name;
            this.listener();
        }
    };

    function createRow() {
        for (let i = 0; i < grid.gridSize; i++) {
            let divGrid = document.getElementById('grid');
            let row = document.createElement('div');
            row.id = `row${i}`;
            row.className = 'rows'
            divGrid.appendChild(row);
        }
    }

    function deleteRow() {
        for (let i = 0; i < grid.gridSize; i++) {
            let row = document.getElementById(`row${i}`);
            row.remove();
        }
    }

    function createBoxes() {
        for (let box of grid) {
            let boxView = document.createElement('div');
            boxView.className = 'box'
            let row = document.getElementById(`row${box.x}`)
            boxView.id = box.xy;
            if (actualMoves < moves) {
                boxView.addEventListener('click', event => {
                    box.value.setValue(whoIsPlaying())
                    grid.updateBox(box.value);
                    let movesCheck = boxView.innerHTML === '';
                    boxView.innerHTML = boxView.innerHTML === '' ? whoIsPlaying().playerSign : boxView.innerHTML;
                    boxView.style.backgroundColor = whoIsPlaying(boxView.innerHTML).color;
                    movesCheck ? actualMoves++ : null;
                    turn(boxView.innerHTML === playerX.playerSign ? playerO.playerSign : playerX.playerSign);
                    winner.win(checkWinCondition());
                })
            }
            row.appendChild(boxView);
        }
    }

    function whoIsPlaying(player) {
        if (player) {
            return playerX.playerSign === player ? playerX : playerO;
        }
        return actualMoves % 2 === 0 ? playerX : playerO;
    }

    function turn(player) {

        p.innerHTML = actualMoves < 9 ? whoIsPlaying(player).name : 'GAME OVER';
        p.style.color = whoIsPlaying(player).color;
    }

    function checkWinCondition() {
        let winner = '';

        function rowValues(x) {
            let values = [];
            for (let y = 0; y < grid.size; y++) {
                values.push(grid.getBox(x, y).getValue().playerSign);
            }
            return values;
        }

        function columnValues(y) {
            let values = [];
            for (let x = 0; x < grid.size; x++) {
                values.push(grid.getBox(x, y).getValue().playerSign)
            }
            return values;
        }

        function firstDiagonalsValues() {
            let values = [];
            for (let xy = 0; xy < grid.size; xy++) {
                values.push(grid.getBox(xy, xy).getValue().playerSign);
            }
            return values;
        }

        function secondDiagonalsValues() {
            let values = [];
            let y = 2;
            for (let x = 0; x < grid.size; x++) {
                values.push(grid.getBox(x, y).getValue().playerSign);
                y--;
            }
            return values;
        }

        function checkTriplet(triplet) {
            if (triplet.every(sign => sign === playerX.playerSign)) {
                winner = playerX.name;
                return true;
            }
            if (triplet.every(sign => sign === playerO.playerSign)) {
                winner = playerO.name;
                return true;
            }
        }

        function checkAllRows() {
            let allRowsResults = []
            for (let x = 0; x < grid.size; x++) {
                allRowsResults.push(checkTriplet(rowValues(x)))
            }
            return allRowsResults
        }

        function checkAllColumns() {
            let allColumnsResults = []
            for (let y = 0; y < grid.size; y++) {
                allColumnsResults.push(checkTriplet(columnValues(y)))
            }
            return allColumnsResults
        }

        function checkAllDiagonals() {
            let diagonalsAllResults = []
            diagonalsAllResults.push(checkTriplet(firstDiagonalsValues()))
            diagonalsAllResults.push(checkTriplet(secondDiagonalsValues()))
            return diagonalsAllResults
        }

        checkAllRows()
        checkAllColumns()
        checkAllDiagonals()
        return winner;
    }

    async function reset() {
        grid = new Grid();
        grid.generate();
        actualMoves = 0;
        winner.name = '';
        p.innerHTML = playerX.name;
        p.style.color = playerX.color;
        await deleteRow()
        await createRow()
        await createBoxes();
    }


    await createRow();
    await createBoxes();

}

export {createGame}
