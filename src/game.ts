import Settings from "./settings"
import * as Visuals from "./visuals"

var Board: HTMLDivElement

var Game = {
    start: function (): void {

    },

    createBoard: function (): void {

    }
}

class BoardTile {
    div: HTMLDivElement
    constructor(x: number, y: number) {
        this.div = Visuals.Square(x, y, Settings.TileSize)
    }
}

export default Game