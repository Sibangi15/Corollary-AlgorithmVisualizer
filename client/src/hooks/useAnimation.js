import { useState, useRef } from "react";

export default function useAnimation() {
    const [isPlaying, setIsPlaying] = useState(false);
    const speedRef = useRef(50); // ms delay
    const stopRef = useRef(false);

    const sleep = (ms) =>
        new Promise((resolve) => setTimeout(resolve, ms));

    const play = async (steps, array, setArray, setActive, setFoundIndex, setCurrentLine, setGrid) => {
        setIsPlaying(true);
        stopRef.current = false;

        const isArrayMode = Array.isArray(array);
        let arr = Array.isArray(array) ? [...array] : null;

        for (let step of steps) {
            if (stopRef.current) break;

            if (step.line !== undefined) {
                setCurrentLine(step.line);
            }

            switch (step.type) {
                case "compare":
                    setActive([step.i, step.j]);
                    break;

                case "swap":
                    if (isArrayMode) {
                        [arr[step.i], arr[step.j]] = [arr[step.j], arr[step.i]];
                        setArray([...arr]);
                        setActive?.([step.i, step.j]);
                    }
                    break;

                case "set":
                    if (isArrayMode) {
                        arr[step.index] = step.value;
                        setArray([...arr]);
                        setActive?.([step.index]);
                    }
                    break;

                case "highlight":
                    setActive([step.index]);
                    break;

                case "visit":
                    setActive?.([step.index]);
                    break;

                case "found":
                    setFoundIndex?.(step.index);
                    setActive?.([]);
                    break;

                case "visit_node":
                    setGrid(prev => {
                        const newGrid = prev.map(r => r.map(c => ({ ...c })));
                        newGrid[step.row][step.col].isVisited = true;
                        return newGrid;
                    });
                    break;

                case "path_node":
                    setGrid(prev => {
                        const newGrid = prev.map(r => r.map(c => ({ ...c })));
                        newGrid[step.row][step.col].isPath = true;
                        return newGrid;
                    });
                    break;

                default:
                    break;
            }

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
    };
}