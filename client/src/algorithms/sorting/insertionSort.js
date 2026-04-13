import { STEP_TYPES } from "../../utils/stepTypes";

export function insertionSort(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        // highlight current key
        steps.push({
            type: STEP_TYPES.HIGHLIGHT,
            index: i,
        });

        while (j >= 0) {
            // compare
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: j,
                j: j + 1,
            });

            if (a[j] > key) {
                // shift right
                a[j + 1] = a[j];

                steps.push({
                    type: STEP_TYPES.SET,
                    index: j + 1,
                    value: a[j],
                    line: 4,
                });

                j--;
            } else {
                break;
            }
        }

        // place key
        a[j + 1] = key;

        steps.push({
            type: STEP_TYPES.SET,
            index: j + 1,
            value: key,
        });
    }

    return steps;
}