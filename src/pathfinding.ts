import Settings from "./settings";

class Point {
  public x: number;
  public y: number;

  constructor(x: number, y: number) {
    this.x = x;
    this.y = y;
  }

  distanceTo(other: Point): number {
    return Math.sqrt((other.x - this.x) ** 2 + (other.y - this.y) ** 2);
  }

  equalTo(other: Point): boolean {
    return this.x == other.x && this.y == other.y;
  }

  toTuple(): [number, number] {
    return [this.x, this.y];
  }
}

class Node extends Point {
  public prev: Node;
  public fromStart: number;
  public toDest: number;

  constructor(x: number, y: number, prev: Node, dest: Point) {
    super(x, y);
    this.previous = prev;
    this.toDest = this.distanceTo(dest);
  }

  get sum(): number {
    return this.fromStart + this.toDest;
  }

  set previous(prev: Node) {
    this.prev = prev;
    this.fromStart = prev == null ? 0 : prev.fromStart + 1;
  }

  toPoint(): Point {
    return new Point(this.x, this.y);
  }
}

export class Path {
  private _points: Point[] = [];
  private startPoint: Point;
  private destination: Point;
  private open: Node[];
  private closed: Node[];
  public found: boolean = false;

  constructor(
    start: [number, number],
    dest: [number, number],
    traversibleFunc: (x: number, y: number) => boolean
  ) {
    this.startPoint = new Point(start[0], start[1]);
    this.destination = new Point(dest[0], dest[1]);

    this.open = new Array<Node>();
    this.open.push(
      new Node(this.startPoint.x, this.startPoint.y, null, this.destination)
    );
    this.closed = new Array<Node>();
    let current: Node;
    while (this.open.length > 0) {
      current = this.open.shift();
      this.closed.push(current);

      if (current.toPoint().equalTo(this.destination)) {
        this.found = true;
        break;
      }

      for (let nbr of this.neigbors(current)) {
        if (!traversibleFunc(nbr.x, nbr.y)) continue;
        //console.log(nbr);
        let inOpen = this.nodeInArray(nbr, this.open);
        //console.log(nbr, this.open, inOpen);
        if (inOpen != null) {
          if (nbr.sum < inOpen.sum)
            this.open[this.open.indexOf(inOpen)].prev = current;
        } else this.open.push(nbr);
      }
      this.open.sort((a, b) => {
        return a.sum - b.sum;
      });
    }

    if (this.found) {
      this.points.push(this.destination);
      while (current.prev != null) {
        this.points.push(current);
        current = current.prev;
      }
      this.points.push(current);
      this.points.reverse();
    }
  }

  private nodeInArray(p: Point, a: Node[]): Node {
    let filtered = a.filter(n => {
      return n.equalTo(p);
    });
    //console.log(a, p, filtered);
    return filtered.length == 1 ? filtered[0] : null;
  }

  private neigbors(n: Node): Node[] {
    let dirs = [
      [-1, 0],
      [0, -1],
      [1, 0],
      [0, 1]
    ];
    let nodes = new Array<Node>();
    for (let dir of dirs) {
      let p = new Point(n.x + dir[0], n.y + dir[1]);
      if (this.nodeInArray(p, this.closed) == null)
        nodes.push(new Node(p.x, p.y, n, this.destination));
    }
    return nodes;
  }

  get length() {
    return this._points.length;
  }

  get points() {
    return this._points;
  }
}
