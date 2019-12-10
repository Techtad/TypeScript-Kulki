export function Square(x: number, y: number, dim: number): HTMLDivElement {
    let div = document.createElement("div")
    div.style.position = "absolute"
    div.style.left = x.toString() + "px"
    div.style.top = y.toString() + "px"
    div.style.width = dim.toString() + "px"
    div.style.height = dim.toString() + "px"
    return div
}

export function Circle(x: number, y: number, radius: number): HTMLDivElement {
    let div = document.createElement("div")
    div.style.position = "absolute"
    div.style.left = x.toString() + "px"
    div.style.top = y.toString() + "px"
    div.style.width = (radius * 2).toString() + "px"
    div.style.height = (radius * 2).toString() + "px"
    div.style.borderRadius = radius.toString() + "px"
    return div
}