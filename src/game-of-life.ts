function makeArray(w: number, h: number, val: number): number[][] {
    var arr = [];
    for (let i = 0; i < h; i++) {
        arr[i] = [];
        for (let j = 0; j < w; j++) {
            arr[i][j] = val;
        }
    }
    return arr;
}

function processMatrix(matrix: number[][]): number[][] {

    const newMatrix: number[][] = makeArray(matrix.length, matrix[0].length, 0);

    for (let x = 0; x < matrix.length; x++)
        for (let y = 0; y < matrix[0].length; y++) {

            const n = getNumberOfNeighbours(x, y, matrix);

            if (n < 2 && matrix[y][x] == 1)
                newMatrix[x][y] = 0;

            else if ((n == 2 || n == 3) && matrix[y][x] == 1)
                newMatrix[x][y] = 1;

            else if (n > 3 && matrix[y][x] == 1)
                newMatrix[x][y] = 0;

            else if (n == 3 && matrix[x][y] == 0)
                newMatrix[x][y] = 1;
        }

    return newMatrix;
}


function getNumberOfNeighbours(x: number, y: number, matrix: number[][]): number {

    let n = 0;
    if (x != 0 && matrix[x - 1][y] == 1)
        n = n + 1;
    if (y != 0 && matrix[x][y - 1] == 1)
        n = n + 1;
    if (y + 1 < matrix[0].length && matrix[x][y + 1] == 1)
        n = n + 1;
    if (x + 1 < matrix.length && matrix[x + 1][y] == 1)
        n = n + 1;
    if (x + 1 < matrix.length && y + 1 < matrix[0].length && matrix[x + 1][y + 1] == 1)
        n = n + 1;
    if (x != 0 && y != 0 && matrix[x - 1][y - 1] == 1)
        n = n + 1;
    if (x + 1 < matrix.length && y != 0 && matrix[x + 1][y - 1] == 1)
        n = n + 1;
    if (y + 1 < matrix[0].length && x != 0 && matrix[x - 1][y + 1] == 1)
        n = n + 1;
    return n;
}

function display(grounds: number[][]): void {
    const html = `<table>${grounds.map((x) => {
        return `<tr>${x.map((y) => {
            if (y === 1) {
                return '<td class="alive"></td>';
            } else {
                return '<td></td>';
            }
        }).join('')}</tr>`;
    }).join('')}</table>`;

    const element = document.getElementById("box");

    element.innerHTML = html;
}

let interval = null;
let grounds: number[][] = null;

function initialize() {
    grounds = makeArray(75, 75, 0);

    for (let x = 0; x < grounds.length; x++)
        for (let y = 0; y < grounds[0].length; y++)
            grounds[x][y] = Math.random() > 0.5 ? 1 : 0;

    display(grounds);
}

function start() {
    interval = setInterval(() => {
        grounds = processMatrix(grounds);
        display(grounds);
    }, 200);

}

function pause() {
    clearInterval(interval);
}
