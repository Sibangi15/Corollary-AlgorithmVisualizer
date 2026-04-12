import { STEP_TYPES } from "../../utils/stepTypes";

export function quickSort(arr) {
    const steps = [];
    const a = [...arr];

    function partition(low, high) {
        const pivot = a[high];

        // highlight pivot
        steps.push({
            type: STEP_TYPES.HIGHLIGHT,
            index: high,
        });

        let i = low;

        for (let j = low; j < high; j++) {
            // compare with pivot
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: j,
                j: high,
            });

            if (a[j] < pivot) {
                [a[i], a[j]] = [a[j], a[i]];

                steps.push({
                    type: STEP_TYPES.SWAP,
                    i: i,
                    j: j,
                });

                i++;
            }
        }

        // place pivot correctly
        [a[i], a[high]] = [a[high], a[i]];

        steps.push({
            type: STEP_TYPES.SWAP,
            i: i,
            j: high,
        });

        return i;
    }

    function sort(low, high) {
        if (low < high) {
            const pi = partition(low, high);
            sort(low, pi - 1);
            sort(pi + 1, high);
        }
    }

    sort(0, a.length - 1);

    return steps;
}