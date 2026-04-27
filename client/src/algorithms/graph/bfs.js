import { STEP_TYPES } from "../../utils/stepTypes";
import { getNeighbors } from "../../utils/graphUtils";

export function bfs(grid) {
    const steps = [];

    let startNode, endNode;

    // find start & end
    for (let row of grid) {
        for (let node of row) {
            if (node.isStart) startNode = node;
            if (node.isEnd) endNode = node;
        }
    }

    const queue = [startNode];
    const visited = new Set();

    visited.add(`${startNode.row}-${startNode.col}`);

    while (queue.length) {
        const current = queue.shift();

        steps.push({
            type: STEP_TYPES.VISIT_NODE,
            row: current.row,
            col: current.col,
        });

        if (current === endNode) break;

        for (let neighbor of getNeighbors(current, grid)) {
            const key = `${neighbor.row}-${neighbor.col}`;

            if (!visited.has(key)) {
                visited.add(key);
                neighbor.previous = current;
                queue.push(neighbor);
            }
        }
    }

    // reconstruct path
    let cur = endNode;
    while (cur) {
        steps.push({
            type: STEP_TYPES.PATH_NODE,
            row: cur.row,
            col: cur.col,
        });
        cur = cur.previous;
    }

    return steps;
}