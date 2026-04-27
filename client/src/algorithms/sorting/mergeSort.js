import { STEP_TYPES } from "../../utils/stepTypes";

export function mergeSort(arr) {
    const steps = [];
    const a = [...arr];

    function merge(l, m, r) {
        const left = a.slice(l, m + 1);
        const right = a.slice(m + 1, r + 1);

        let i = 0, j = 0, k = l;

        while (i < left.length && j < right.length) {
            // compare
            steps.push({
                type: STEP_TYPES.COMPARE,
                i: l + i,
                j: m + 1 + j,
                line: 7,
            });

            if (left[i] <= right[j]) {
                a[k] = left[i];

                steps.push({
                    type: STEP_TYPES.SET,
                    index: k,
                    value: left[i],
                    line: 9,
                });

                i++;
            } else {
                a[k] = right[j];

                steps.push({
                    type: STEP_TYPES.SET,
                    index: k,
                    value: right[j],
                    line: 11,
                });

                j++;
            }

            k++;
        }

        while (i < left.length) {
            a[k] = left[i];

            steps.push({
                type: STEP_TYPES.SET,
                index: k,
                value: left[i],
                line: 15,
            });

            i++; k++;
        }

        while (j < right.length) {
            a[k] = right[j];

            steps.push({
                type: STEP_TYPES.SET,
                index: k,
                value: right[j],
                line: 17,
            });

            j++; k++;
        }
    }

    function sort(l, r) {
        if (l >= r) return;

        const m = Math.floor((l + r) / 2);
        sort(l, m);
        sort(m + 1, r);
        merge(l, m, r);
    }

    sort(0, a.length - 1);

    return steps;
}