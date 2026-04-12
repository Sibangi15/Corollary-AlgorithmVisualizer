import { STEP_TYPES } from "../../utils/stepTypes";

export function linearSearch(arr, target) {
    const steps = [];

    for (let i = 0; i < arr.length; i++) {
        // visiting index
        steps.push({
            type: STEP_TYPES.VISIT,
            index: i,
        });

        // compare
        steps.push({
            type: STEP_TYPES.COMPARE,
            i: i,
            j: -1,
        });

        if (arr[i] === target) {
            steps.push({
                type: STEP_TYPES.FOUND,
                index: i,
            });
            return steps;
        }
    }

    return steps;
}