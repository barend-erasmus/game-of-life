(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.GameOfLife = f()}})(function(){var define,module,exports;return (function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function makeArray(h, w, val) {
    const arr = [];
    for (let y = 0; y < h; y++) {
        arr[y] = [];
        for (let x = 0; x < w; x++) {
            arr[y][x] = val;
        }
    }
    return arr;
}
exports.makeArray = makeArray;
function processMatrix(grid) {
    const newGrid = makeArray(grid.length, grid[0].length, 0);
    for (let y = 0; y < grid.length; y++)
        for (let x = 0; x < grid[0].length; x++) {
            const numberOfNeighbours = getNumberOfNeighbours(x, y, grid);
            newGrid[y][x] = getNewCellState(grid[y][x], numberOfNeighbours);
        }
    return newGrid;
}
exports.processMatrix = processMatrix;
function getNewCellState(currentState, numberOfNeighbours) {
    if (numberOfNeighbours < 2 && currentState === 1)
        return 0;
    else if ((numberOfNeighbours === 2 || numberOfNeighbours === 3) && currentState === 1)
        return 1;
    else if (numberOfNeighbours > 3 && currentState === 1)
        return 0;
    else if (numberOfNeighbours === 3 && currentState === 0)
        return 1;
    else
        return currentState;
}
exports.getNewCellState = getNewCellState;
function getNumberOfNeighbours(x, y, grid) {
    let neighbours = 0;
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
exports.getNumberOfNeighbours = getNumberOfNeighbours;
function display(grid) {
    let numberOfCellsAlive = 0;
    const width = document.getElementById("box").parentElement.clientWidth;
    const height = width;
    const canvas = document.getElementById("box");
    canvas.width = width;
    canvas.height = height;
    const ctx = canvas.getContext("2d");
    const cellSize = width / grid[0].length;
    for (let row = 0; row < grid.length; row++) {
        for (let column = 0; column < grid[row].length; column++) {
            if (grid[row][column] === 1) {
                numberOfCellsAlive++;
                ctx.fillStyle = 'black';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
            else {
                ctx.fillStyle = '#ffffff';
                ctx.fillRect(column * cellSize, row * cellSize, cellSize, cellSize);
            }
        }
    }
    const lbNumberOfAliveCells = document.getElementById('lb-number-of-alive-cells');
    lbNumberOfAliveCells.innerHTML = `Alive Cells: ${numberOfCellsAlive.toString()}`;
}
exports.display = display;
exports.interval = null;
exports.grounds = null;
function initialize() {
    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("select-pattern").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');
    exports.grounds = makeArray(75, 75, 0);
    for (let y = 0; y < exports.grounds.length; y++)
        for (let x = 0; x < exports.grounds[0].length; x++) {
            exports.grounds[y][x] = Math.random() > 0.5 ? 1 : 0;
        }
    display(exports.grounds);
}
exports.initialize = initialize;
function start() {
    document.getElementById("btn-pause").removeAttribute('disabled');
    document.getElementById("select-pattern").setAttribute('disabled', 'disabled');
    document.getElementById("btn-start").setAttribute('disabled', 'disabled');
    exports.interval = setInterval(() => {
        exports.grounds = processMatrix(exports.grounds);
        display(exports.grounds);
    }, 250);
}
exports.start = start;
function pause() {
    document.getElementById("btn-start").removeAttribute('disabled');
    document.getElementById("select-pattern").removeAttribute('disabled');
    document.getElementById("btn-pause").setAttribute('disabled', 'disabled');
    clearInterval(exports.interval);
}
exports.pause = pause;
function selectPattern() {
    const name = document.getElementById("select-pattern").value;
    const patterns = {
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
        for (let y = 0; y < exports.grounds.length; y++)
            for (let x = 0; x < exports.grounds[0].length; x++) {
                exports.grounds[y][x] = Math.random() > 0.5 ? 1 : 0;
            }
    }
    else {
        const pattern = patterns[name];
        exports.grounds = makeArray(75, 75, 0);
        const yOffset = Math.floor((75 - pattern.length) / 2);
        const xOffset = Math.floor((75 - pattern[0].length) / 2);
        for (let y = 0; y < pattern.length; y++) {
            for (let x = 0; x < pattern[y].length; x++) {
                exports.grounds[y + yOffset][x + xOffset] = pattern[y][x];
            }
        }
    }
    display(exports.grounds);
}
exports.selectPattern = selectPattern;

},{}]},{},[1])(1)
});