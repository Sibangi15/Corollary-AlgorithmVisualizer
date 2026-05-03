import { STEP_TYPES } from "../../utils/stepTypes";
import { getNeighbors } from "../../utils/graphUtils";

export function dijkstra(grid) {
    const steps = [];

    let startNode, endNode;

    for (let row of grid) {
        for (let node of row) {
            if (node.isStart) startNode = node;
            if (node.isEnd) endNode = node;
        }
    }

    startNode.distance = 0;

    const unvisited = [];
    for (let row of grid) {
        for (let node of row) {
            unvisited.push(node);
        }
    }

    while (unvisited.length) {
        // sort by distance (simple PQ)
        unvisited.sort((a, b) => a.distance - b.distance);

        const current = unvisited.shift();

        if (current.isWall) continue;
        if (current.distance === Infinity) break;

        steps.push({
            type: STEP_TYPES.VISIT_NODE,
            row: current.row,
            col: current.col,
            line: 3
        });

        if (current === endNode) break;

        for (let neighbor of getNeighbors(current, grid)) {
            steps.push({ line: 4 });
            const newDist = current.distance + neighbor.weight;

            if (newDist < neighbor.distance) {
                neighbor.distance = newDist;
                neighbor.previous = current;
            }
            steps.push({ line: 5 });
        }
    }

    // reconstruct path
    let cur = endNode;
    while (cur) {
        steps.push({
            type: STEP_TYPES.PATH_NODE,
            row: cur.row,
            col: cur.col,
            line: 6
        });
        cur = cur.previous;
    }

    return steps;
}