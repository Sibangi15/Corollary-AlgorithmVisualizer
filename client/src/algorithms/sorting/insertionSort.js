import { STEP_TYPES } from "../../utils/stepTypes";

export function insertionSort(arr) {
    const steps = [];
    const a = [...arr];

    for (let i = 1; i < a.length; i++) {
        let key = a[i];
        let j = i - 1;

        // highlight current key
        steps.push({ type: STEP_TYPES.HIGHLIGHT, index: i, line: 1 });

        steps.push({ line: 3 });

        while (j >= 0) {
            // compare
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: j,
                j: j + 1,
                line: 3,
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
                steps.push({ line: 5 });
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
            line: 6,
        });
    }

    return steps;
}