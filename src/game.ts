import Settings from "./settings";
import * as Visuals from "./visuals";
import { Path } from "./pathfinding";

var Board: HTMLDivElement;
export var Tiles: BoardTile[][];
var NextDisplay: HTMLDivElement;
var NextColors: Color[];
var IsPlaying: boolean = false;
var SelectedTile: BoardTile = null;
var ScoreDisplay: HTMLSpanElement;
var Score: number = 0;
var PathTiles: BoardTile[] = [];
var HoverTile: BoardTile;

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

function traversible(x: number, y: number): boolean {
  return (
    x >= 0 &&
    x < Settings.BoardWidth &&
    y >= 0 &&
    y < Settings.BoardHeight &&
    Tiles[x][y].color == Color.Empty
  );
}

class BoardTile {
  private _div: HTMLDivElement;
  private marble: HTMLDivElement;
  private _color: Color;
  public x: number;
  public y: number;

  constructor(
    x: number,
    y: number,
    clickCallback: (x: number, y: number) => void,
    color?: Color
  ) {
    this.x = x;
    this.y = y;

    this._div = Visuals.Square(x, y, Settings.TileSize);
    this._div.classList.add("board-tile");
    this._div.style.left = `${x * Settings.TileSize}px`;
    this._div.style.top = `${y * Settings.TileSize}px`;
    this._div.setAttribute("x", x.toString());
    this._div.setAttribute("y", y.toString());
    this._color = color | Color.Empty;

    this._div.addEventListener("click", () => {
      clickCallback(x, y);
      this.updatePathDisplay();
    });
    this._div.addEventListener("mouseenter", this.updatePathDisplay.bind(this));
    this._div.addEventListener("mouseleave", () => {
      if ((HoverTile = this)) {
        for (let tile of PathTiles) {
          tile.div.classList.remove("path");
        }
        PathTiles = [];
      }
    });
  }

  private updatePathDisplay(): void {
    HoverTile = this;
    for (let tile of PathTiles) {
      tile.div.classList.remove("path");
    }
    PathTiles = [];
    if (SelectedTile != null && SelectedTile != this) {
      let path = new Path(
        [SelectedTile.x, SelectedTile.y],
        [this.x, this.y],
        traversible
      );
      for (let p of path.points) {
        Tiles[p.x][p.y].div.classList.add("path");
        PathTiles.push(Tiles[p.x][p.y]);
      }
    }
  }

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
    this._color = c;
  }
}

const Game = {
  init: function(): void {
    document.getElementById("start-btn").addEventListener("click", Game.start);
    SelectedTile = null;
    ScoreDisplay = document.getElementById("score-text");
    Game.updateScore(0);

    Board = document.getElementById("game-board") as HTMLDivElement;
    Board.innerHTML = "";
    Tiles = [];
    for (let x = 0; x < Settings.BoardWidth; x++) {
      Tiles.push([]);
      for (let y = 0; y < Settings.BoardHeight; y++) {
        Tiles[x].push(null);
      }
    }

    Game.createBoard();
    Game.nextBatch();
  },

  start: function(): void {
    IsPlaying = true;
    Game.init();
  },

  over: function(): void {
    IsPlaying = false;
    for (let row of Tiles) {
      for (let tile of row) tile.div.classList.remove("board-tile");
    }
    NextDisplay.innerHTML = "KONIEC GRY";
    alert("Koniec gry! Twój wynik: " + Score);
  },

  createBoard: function(): void {
    for (let x = 0; x < Settings.BoardWidth; x++) {
      for (let y = 0; y < Settings.BoardHeight; y++) {
        let tile = new BoardTile(x, y, Game.tileClicked);
        Tiles[x][y] = tile;
        Board.appendChild(tile.div);
      }
    }
    for (let i = 0; i < 5; i++) Game.placeAtRandomSpot(randomColor());
  },

  nextBatch: function(): void {
    NextDisplay = document.getElementById("next-display") as HTMLDivElement;
    NextDisplay.innerHTML = "";
    NextColors = [];
    for (let i = 0; i < 3; i++) {
      let color: Color = randomColor();
      NextColors.push(color);
      let marble = Visuals.Circle(0, 0, Settings.TileSize / 4);
      marble.classList.add("marble");
      marble.style.display = "inline-block";
      marble.style.position = "initial";
      marble.style.backgroundColor = Color[color];
      marble.style.margin = "0 5px 0 5px";
      NextDisplay.appendChild(marble);
    }
  },

  nextRound: function(): void {
    for (let c of NextColors) Game.placeAtRandomSpot(c);

    if (!IsPlaying) return;
    if (Game.freeTilesCount() == 0) {
      Game.over();
      return;
    }
    Game.nextBatch();
  },

  freeTilesCount: function(): number {
    let count = 0;
    for (let row of Tiles) {
      for (let tile of row) if (tile.color == Color.Empty) count++;
    }
    return count;
  },

  placeAtRandomSpot(color: Color): void {
    if (!IsPlaying) return;
    if (Game.freeTilesCount() == 0) Game.over();

    let randX: number = Math.floor(Math.random() * Settings.BoardWidth);
    let randY: number = Math.floor(Math.random() * Settings.BoardHeight);
    if (Tiles[randX][randY].color == Color.Empty) {
      Tiles[randX][randY].color = color;
      Game.checkForFive(randX, randY);
    } else Game.placeAtRandomSpot(color);
  },

  tileClicked: function(x: number, y: number): void {
    if (!IsPlaying) return;

    if (SelectedTile == null) {
      if (Tiles[x][y].color != Color.Empty) {
        SelectedTile = Tiles[x][y];
        SelectedTile.div.setAttribute("selected", "");
      }
    } else {
      if (Tiles[x][y].color == Color.Empty) {
        let path = new Path(
          [SelectedTile.x, SelectedTile.y],
          [x, y],
          traversible
        );
        if (path.length == 0) return;

        Tiles[x][y].color = SelectedTile.color;
        Tiles[SelectedTile.x][SelectedTile.y].color = Color.Empty;
        SelectedTile.div.removeAttribute("selected");
        SelectedTile = null;

        if (!Game.checkForFive(x, y)) Game.nextRound();
      } else {
        SelectedTile.div.removeAttribute("selected");
        if (Tiles[x][y] != SelectedTile) {
          SelectedTile = Tiles[x][y];
          SelectedTile.div.setAttribute("selected", "");
        } else {
          SelectedTile = null;
        }
      }
    }
  },

  checkForFive(x: number, y: number): boolean {
    let color = Tiles[x][y].color;
    if (color == Color.Empty) return;

    let checkPos = (posX: number, posY: number, posColor: Color): boolean => {
      return (
        posX >= 0 &&
        posX < Settings.BoardWidth &&
        posY >= 0 &&
        posY < Settings.BoardHeight &&
        Tiles[posX][posY].color == posColor
      );
    };

    let toRemove: [number, number][] = [];

    let countInDir = (
      dirX: number,
      dirY: number,
      c: Color,
      remove?: boolean
    ): void => {
      if (remove) {
        toRemove.push([x, y]);
      }

      let count = 1;
      let offsetX = dirX;
      let offsetY = dirY;
      while (checkPos(x + offsetX, y + offsetY, color)) {
        if (remove) {
          toRemove.push([x + offsetX, y + offsetY]);
        }

        count++;
        offsetX += dirX;
        offsetY += dirY;
      }
      dirX = -dirX;
      dirY = -dirY;
      offsetX = dirX;
      offsetY = dirY;

      while (checkPos(x + offsetX, y + offsetY, color)) {
        if (remove) {
          toRemove.push([x + offsetX, y + offsetY]);
        }
        count++;
        offsetX += dirX;
        offsetY += dirY;
      }

      if (count >= 5 && !remove) countInDir(dirX, dirY, c, true);
    };

    countInDir(-1, -1, color);
    countInDir(-1, 0, color);
    countInDir(-1, 1, color);
    countInDir(0, -1, color);

    for (let coords of toRemove) {
      Tiles[coords[0]][coords[1]].color = Color.Empty;
      Score++;
    }
    Game.updateScore(Score);
    return toRemove.length > 0;

    /* console.log(x, y, Color[color], "\\", countInDir(-1, -1, color));
    console.log(x, y, Color[color], "-", countInDir(-1, 0, color));
    console.log(x, y, Color[color], "/", countInDir(-1, 1, color));
    console.log(x, y, Color[color], "|", countInDir(0, -1, color)); */
  },

  updateScore: function(newScore: number): void {
    Score = newScore;
    ScoreDisplay.innerHTML = Score.toString();
  }
};

export default Game;
