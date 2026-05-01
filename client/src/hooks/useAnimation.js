import { useState, useRef } from "react";

export default function useAnimation() {
    const [isPlaying, setIsPlaying] = useState(false);
    const [steps, setSteps] = useState([]);
    const [currentStep, setCurrentStep] = useState(0);

    const speedRef = useRef(50);
    const stopRef = useRef(false);

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    // APPLY STEP (used by both play + scrubber)
    const applyStep = (step, context) => {
        const {
            array,
            setArray,
            setActive,
            setFoundIndex,
            setCurrentLine,
            setGrid
        } = context;

        if (!step) return array;

        if (step.line !== undefined) {
            setCurrentLine?.(step.line);
        }

        switch (step.type) {
            case "compare":
                setActive?.([step.i, step.j]);
                return array;

            case "swap":
                if (array) {
                    const newArr = [...array];
                    [newArr[step.i], newArr[step.j]] =
                        [newArr[step.j], newArr[step.i]];
                    setArray?.(newArr);
                    setActive?.([step.i, step.j]);
                    return newArr;
                }
                return array;

            case "set":
                if (array) {
                    const newArr = [...array];
                    newArr[step.index] = step.value;
                    setArray?.(newArr);
                    setActive?.([step.index]);
                    return newArr;
                }
                return array;

            case "highlight":
                setActive?.([step.index]);
                return array;

            case "found":
                setFoundIndex?.(step.index);
                setActive?.([]);
                return array;

            case "visit_node":
                setGrid?.((prev) => {
                    const newGrid = prev.map(r => r.map(c => ({ ...c })));
                    newGrid[step.row][step.col].isVisited = true;
                    return newGrid;
                });
                return array;

            case "path_node":
                setGrid?.((prev) => {
                    const newGrid = prev.map(r => r.map(c => ({ ...c })));
                    newGrid[step.row][step.col].isPath = true;
                    return newGrid;
                });
                return array;

            default:
                return array;
        }
    };

    const play = async (
        stepsInput,
        array,
        setArray,
        setActive,
        setFoundIndex,
        setCurrentLine,
        setGrid
    ) => {
        setIsPlaying(true);
        stopRef.current = false;

        setSteps(stepsInput);
        setCurrentStep(0);

        let arr = Array.isArray(array) ? [...array] : null;

        for (let i = 0; i < stepsInput.length; i++) {
            if (stopRef.current) break;

            const step = stepsInput[i];
            setCurrentStep(i);

            // CAPTURE updated array
            arr = applyStep(step, {
                array: arr,
                setArray,
                setActive,
                setFoundIndex,
                setCurrentLine,
                setGrid
            });

            await sleep(speedRef.current);
        }

        setActive?.([]);
        setIsPlaying(false);
    };

    const pause = () => {
        stopRef.current = true;
        setIsPlaying(false);
    };

    const setSpeed = (value) => {
        speedRef.current = value;
    };

    return {
        play,
        pause,
        setSpeed,
        isPlaying,
        steps,
        currentStep,
        setCurrentStep,
        applyStep
    };
}