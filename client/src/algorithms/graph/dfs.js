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

    steps.push({ line: 0 }); // push start
    visited.add(`${startNode.row}-${startNode.col}`);
    steps.push({ line: 1 }); // mark visited

    while (stack.length) {
        steps.push({ line: 2 }); // while

        const current = stack.pop();

        steps.push({
            type: STEP_TYPES.VISIT_NODE,
            row: current.row,
            col: current.col,
            line: 3, // pop
        });

        if (current === endNode) break;

        for (let neighbor of getNeighbors(current, grid)) {
            steps.push({ line: 4 }); // for loop

            const key = `${neighbor.row}-${neighbor.col}`;

            steps.push({ line: 5 }); // if check

            if (!visited.has(key)) {
                visited.add(key);
                steps.push({ line: 6 }); // mark visited

                neighbor.previous = current;
                stack.push(neighbor);
                steps.push({ line: 7 }); // push
            }
        }
    }

    // path reconstruction (optional to map separately)
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