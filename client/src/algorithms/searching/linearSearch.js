import { STEP_TYPES } from "../../utils/stepTypes";

export function linearSearch(arr, target) {
    const steps = [];

    for (let i = 0; i < arr.length; i++) {
        // visiting index
        steps.push({
            type: STEP_TYPES.VISIT,
            index: i,
            line: 1,
        });

        // compare
        steps.push({
            type: STEP_TYPES.COMPARE,
            i: i,
            j: -1,
            line: 2,
        });

        if (arr[i] === target) {
            steps.push({
                type: STEP_TYPES.FOUND,
                index: i,
                line: 3,
            });
            return steps;
        }
    }

    return steps;
}