import { STEP_TYPES } from "../../utils/stepTypes";
import { getNeighbors } from "../../utils/graphUtils";

export function dfs(grid) {
    const steps = [];

    let startNode, endNode;

    for (let row of grid) {
        for (let node of row) {
            if (node.isStart) startNode = node;
            if (node.isEnd) endNode = node;
        }
    }

    const stack = [startNode];
    const visited = new Set();

    visited.add(`${startNode.row}-${startNode.col}`);

    while (stack.length) {
        const current = stack.pop();

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
                stack.push(neighbor);
            }
        }
    }

    // path reconstruction
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