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

export function processMatrix(grid: number[][]): number[][] {
    const newGrid: number[][] = makeArray(grid.length, grid[0].length, 0);

    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[0].length; x++) {
            const numberOfNeighbours: number = getNumberOfNeighbours(x, y, grid);

            newGrid[y][x] = getNewCellState(grid[y][x], numberOfNeighbours);
        }

    return newGrid;
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
        neighbours++;
    }
    if (x > 0 && grid[y][x - 1]) {
        ++neighbours;
    }
    if (x > 0 && y < grid.length - 1 && grid[y + 1][x - 1]) {
        neighbours++;
    }
    if (y > 0 && grid[y - 1][x]) {
        neighbours++;
    }
    if (y < grid.length - 1 && grid[y + 1][x]) {
        neighbours++;
    }
    if (y > 0 && x < grid[0].length - 1 && grid[y - 1][x + 1]) {
        neighbours++;
    }
    if (x < grid[0].length - 1 && grid[y][x + 1]) {
        neighbours++;
    }
    if (x < grid[0].length - 1 && y < grid.length - 1 && grid[y + 1][x + 1]) {
        neighbours++;
    }
    return neighbours;
}

export function display(grid: number[][]): void {

    let numberOfCellsAlive: number = 0;

    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;

    const canvas: any = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;

    const ctx = canvas.getContext("2d");

    const cellSize = Math.floor(width / grid[0].length);
    
    for (let row = 0; row < grid.length; row ++) {
        for (let column = 0; column < grid[row].length; column ++) {
            if (grid[row][column] === 1) {
                numberOfCellsAlive++;

                ctx.fillStyle = 'black';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            } else {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }

    const lbNumberOfAliveCells = document.getElementById('lb-number-of-alive-cells');

    lbNumberOfAliveCells.innerHTML = `Alive Cells: ${numberOfCellsAlive.toString()}`;
}

export let interval = null;
export let grid: number[][] = null;

export function initialize() {

    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("select-pattern").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');

    grid = makeArray(75, 75, 0);

    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[0].length; x++) {
            grid[y][x] = Math.random() > 0.5 ? 1 : 0;
        }

    display(grid);
}

export function start() {

    document.getElementById("btn-pause").removeAttribute('disabled');
    document.getElementById("select-pattern").setAttribute('disabled', 'disabled');
    document.getElementById("btn-start").setAttribute('disabled', 'disabled');

    interval = setInterval(() => {
        grid = processMatrix(grid);
        display(grid);
    }, 250);

}

export function pause() {

    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("select-pattern").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');

    clearInterval(interval);
}
export function selectPattern() {

    const name: string = (<any>document.getElementById("select-pattern")).value;

    const patterns: {} = {
        blinker: [
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0],
        ],
        toad: [
            [0, 0, 0, 0, 0, 0],
            [0, 0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        beacon: [
            [0, 0, 0, 0, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 1, 1, 0, 0, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 1, 1, 0],
            [0, 0, 0, 0, 0, 0],
        ],
        pentadecathlon: [
            [0, 0, 0, 0, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 1, 0, 1, 0],
            [0, 1, 1, 1, 0],
            [0, 0, 0, 0, 0],
        ],
        glider: [
            [0, 0, 0, 0, 0],
            [0, 1, 0, 0, 0],
            [0, 0, 1, 1, 0],
            [0, 1, 1, 0, 0],
            [0, 0, 0, 0, 0],
        ],
    };

    if (name === 'random') {
        for (let y = 0; y < grid.length; y++)
            for (let x = 0; x < grid[0].length; x++) {
                grid[y][x] = Math.random() > 0.5 ? 1 : 0;
            }
    } else {

        const pattern: number[][] = patterns[name];

        grid = makeArray(75, 75, 0);

        const yOffset: number = Math.floor((75 - pattern.length) / 2);
        const xOffset: number = Math.floor((75 - pattern[0].length) / 2);

        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                grid[y + yOffset][x + xOffset] = pattern[y][x];
            }
        }
    }

    display(grid);
}
