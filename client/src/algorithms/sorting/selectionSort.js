import { STEP_TYPES } from "../../utils/stepTypes";

export function selectionSort(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 0; i < a.length; i++) {
        let minIndex = i;

        for (let j = i + 1; j < a.length; j++) {

            // compare
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: minIndex,
                j: j,
                line: 2,
            });

            if (a[j] < a[minIndex]) {
                minIndex = j;
            }
        }

        if (minIndex !== i) {
            [a[i], a[minIndex]] = [a[minIndex], a[i]];

            steps.push({
                type: STEP_TYPES.SWAP,
                i: i,
                j: minIndex,
                line: 5,
            });
        }
    }

    return steps;
}