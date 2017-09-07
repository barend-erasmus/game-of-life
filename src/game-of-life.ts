export function makeArray(h: number, w: number, val: number): number[][] {
    const arr: number[][] = [];
    for (let y = 0; y < h; y++) {
        arr[y] = [];
        for (let x = 0; x < w; x++) {
            arr[y][x] = val;
        }
    }
    return arr;
}

export function processMatrix(matrix: number[][]): number[][] {
    const newMatrix: number[][] = makeArray(matrix.length, matrix[0].length, 0);

    for (let y = 0; y < matrix.length; y++)
        for (let x = 0; x < matrix[0].length; x++) {
            const numberOfNeighbours: number = getNumberOfNeighbours(x, y, matrix);

            newMatrix[y][x] = getNewCellState(matrix[y][x], numberOfNeighbours);
        }

    return newMatrix;
}

export function getNewCellState(currentState: number, numberOfNeighbours: number): number {
    if (numberOfNeighbours < 2 && currentState === 1)
        return 0;
    else if ((numberOfNeighbours === 2 || numberOfNeighbours === 3) && currentState === 1)
        return 1
    else if (numberOfNeighbours > 3 && currentState === 1)
        return 0;
    else if (numberOfNeighbours === 3 && currentState === 0)
        return 1;
    else
        return currentState;
}


export function getNumberOfNeighbours(x: number, y: number, grid: number[][]): number {
    let neighbours: number = 0;

    if (x > 0 && y > 0 && grid[y - 1][x - 1]) {
        ++neighbours;
    }
    if (x > 0 && grid[y][x - 1]) {
        ++neighbours;
    }
    if (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1]) {
        ++neighbours;
    }
    if (y > 0 && grid[y - 1][x]) {
        ++neighbours;
    }
    if (y < grid.length - 1 && grid[y + 1][x]) {
        ++neighbours;
    }
    if (y > 0 && x < grid[0].length - 1 && grid[y - 1][x + 1]) {
        ++neighbours;
    }
    if (x < grid[0].length - 1 && grid[y][x + 1]) {
        ++neighbours;
    }
    if (x < grid[0].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1]) {
        ++neighbours;
    }
    return neighbours;
}

export function display(grounds: number[][]): void {
    const html: string = `<table>${grounds.map((x) => {
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

export let interval = null;
export let grounds: number[][] = null;

export function initialize() {
    
    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("btn-reinitialize").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');

    grounds = makeArray(75, 75, 0);


    for (let y = 0; y < grounds.length; y++)
        for (let x = 0; x < grounds[0].length; x++) {
            grounds[y][x] = Math.random() > 0.5 ? 1 : 0;
        }

    display(grounds);
}

export function start() {

    document.getElementById("btn-pause").removeAttribute('disabled');
    document.getElementById("btn-reinitialize").setAttribute('disabled', 'disabled');
    document.getElementById("btn-start").setAttribute('disabled', 'disabled');


    interval = setInterval(() => {
        grounds = processMatrix(grounds);
        display(grounds);
    }, 200);

}

export function pause() {

    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("btn-reinitialize").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');


    clearInterval(interval);
}
