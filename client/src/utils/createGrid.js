export function createGrid(rows, cols) {
    const grid = [];

    for (let r = 0; r < rows; r++) {
        const currentRow = [];

        for (let c = 0; c < cols; c++) {
            currentRow.push({
                row: r,
                col: c,
                isStart: r === 5 && c === 5,
                isEnd: r === 10 && c === 20,
                isWall: false,
                isVisited: false,
                isPath: false,
                distance: Infinity,
                previous: null,
            });
        }

        grid.push(currentRow);
    }

    return grid;
}