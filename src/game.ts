import Settings from "./settings";
import * as Visuals from "./visuals";

var Board: HTMLDivElement;
var Tiles: BoardTile[][];

var Game = {
  start: function(): void {
    Board = document.getElementById("game-board") as HTMLDivElement;
    Board.innerHTML = "";
    Tiles = [];
    for (let x = 0; x < Settings.BoardWidth; x++) {
      Tiles.push([]);
      for (let y = 0; y < Settings.BoardHeight; y++) {
        Tiles[x].push(null);
      }
    }
    this.createBoard();
  },

  createBoard: function(): void {
    for (let x = 0; x < Settings.BoardWidth; x++) {
      for (let y = 0; y < Settings.BoardHeight; y++) {
        let tile = new BoardTile(x * Settings.TileSize, y * Settings.TileSize);
        Tiles[x][y] = tile;
        console.log();
        tile.color = randomColor();
        Board.appendChild(tile.div);
      }
    }
  }
};

enum Color {
  Empty = 0,
  gray,
  red,
  green,
  blue,
  teal,
  yellow,
  pink
}

function randomColor(): Color {
  return Color[
    Color[
      Math.floor(
        1 +
          Math.random() *
            (Object.keys(Color).filter(v => {
              return !isNaN(parseInt(v));
            }).length -
              1)
      )
    ] as keyof typeof Color
  ];
}

class BoardTile {
  private _div: HTMLDivElement;
  private marble: HTMLDivElement;
  private _color: Color;

  constructor(x: number, y: number) {
    this._div = Visuals.Square(x, y, Settings.TileSize);
    this._div.classList.add("board-tile");
    this._div.style.left = `${x}px`;
    this._div.style.top = `${y}px`;
    this._color = Color.Empty;

    this._div.addEventListener("click", this.onClick);
  }

  onClick(): void {}

  get div(): HTMLDivElement {
    return this._div;
  }

  get color(): Color {
    return this._color;
  }

  set color(c: Color) {
    this._div.innerHTML = "";
    this.marble = null;
    if (c != Color.Empty) {
      this.marble = Visuals.Circle(
        Settings.TileSize / 4,
        Settings.TileSize / 4,
        Settings.TileSize / 4
      );
      this.marble.classList.add("marble");
      this.marble.style.backgroundColor = Color[c];
      this._div.appendChild(this.marble);
    }
  }
}

export default Game;
