import { expect } from 'chai';
import 'mocha';

import { getNewCellState, processMatrix, getNumberOfNeighbours } from './game-of-life';

describe('getNewCellState', () => {

    // Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    it('should return 0 given 1 neighbour and live cell', () => {
        const result: number = getNewCellState(1, 1);

        expect(result).to.be.eq(0);
    });

    it('should return 1 given 2 neighbours and live cell', () => {
        const result: number = getNewCellState(1, 2);

        expect(result).to.be.eq(1);
    });

    // Any live cell with two or three live neighbours lives on to the next generation.
    it('should return 1 given 3 neighbours and live cell', () => {
        const result: number = getNewCellState(1, 3);

        expect(result).to.be.eq(1);
    });

    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    it('should return 0 given 4 neighbours and live cell', () => {
        const result: number = getNewCellState(1, 4);

        expect(result).to.be.eq(0);
    });

    it('should return 0 given 5 neighbours and live cell', () => {
        const result: number = getNewCellState(1, 5);

        expect(result).to.be.eq(0);
    });

    it('should return 0 given 6 neighbours and live cell', () => {
        const result: number = getNewCellState(1, 6);

        expect(result).to.be.eq(0);
    });

    // Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    it('should return 1 given 3 neighbours and dead cell', () => {
        const result: number = getNewCellState(0, 3);

        expect(result).to.be.eq(1);
    });

    it('should return 0 given 1 neighbour and dead cell', () => {
        const result: number = getNewCellState(0, 1);

        expect(result).to.be.eq(0);
    });
});

describe('processMatrix', () => {
    it('should return array', () => {
        const result: number[][] = processMatrix([
            [0, 0, 0, 0],
            [0, 0, 0, 0],
            [0, 0, 0, 0],
        ]);

        expect(typeof(result)).to.be.eq('object');
    });
});

describe('getNumberOfNeighbours', () => {
    it('should return 0', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [0, 0, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(0);
    });

    it('should return 1', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [0, 1, 0, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(1);
    });

    it('should return 2', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [0, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(2);
    });

    it('should return 3', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [0, 1, 0, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(3);
    });

    it('should return 4', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [0, 1, 1, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(4);
    });

    it('should return 5', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 0, 0],
        ]);

        expect(result).to.be.eq(5);
    });

    it('should return 6', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [0, 0, 1, 0],
        ]);

        expect(result).to.be.eq(6);
    });

    it('should return 7', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [1, 0, 1, 0],
        ]);

        expect(result).to.be.eq(7);
    });

    it('should return 8', () => {
        const result: number = getNumberOfNeighbours(1, 1, [
            [1, 1, 1, 0],
            [1, 1, 1, 0],
            [1, 1, 1, 0],
        ]);

        expect(result).to.be.eq(8);
    });
});
