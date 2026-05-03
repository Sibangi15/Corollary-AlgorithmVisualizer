import { useState } from "react";

import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
import { selectionSort } from "../../algorithms/sorting/selectionSort";
import { insertionSort } from "../../algorithms/sorting/insertionSort";
import { mergeSort } from "../../algorithms/sorting/mergeSort";
import { quickSort } from "../../algorithms/sorting/quickSort";

import { linearSearch } from "../../algorithms/searching/linearSearch";
import { binarySearch } from "../../algorithms/searching/binarySearch";

import { bfs } from "../../algorithms/graph/bfs";
import { dfs } from "../../algorithms/graph/dfs";
import { dijkstra } from "../../algorithms/graph/dijkstra";

function ControlPanel({
    play,
    pause,
    setSpeed,
    isPlaying,
    array,
    setArray,
    setActive,
    setFoundIndex,
    setCurrentLine,
    algorithm,
    setAlgorithm,
    mode,
    setMode,
    grid,
    setGrid,
    resetGrid,
    steps,
    currentStep,
    setCurrentStep,
    applyStep
}) {
    const [size, setSize] = useState(10);
    const [target, setTarget] = useState("");
    const [initialArray, setInitialArray] = useState([]);

    const saveSession = async (data) => {
        try {
            await fetch("http://localhost:5000/api/session", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });
        } catch (err) {
            console.error("Error saving session:", err);
        }
    };

    const generateArray = (customSize = size) => {
        const newArr = Array.from({ length: customSize }, () =>
            Math.floor(Math.random() * 200) + 20
        );

        setArray(newArr);
        setActive([]);
        setFoundIndex(null);
        setCurrentLine(null);
    };

    const handleStart = async () => {
        setActive([]);
        setFoundIndex(null);
        setCurrentLine(null);

        if (mode !== "graph") {
            setInitialArray([...array]);
        }

        let steps = [];

        if (mode === "sorting") {
            if (algorithm === "bubble") steps = bubbleSort(array);
            if (algorithm === "selection") steps = selectionSort(array);
            if (algorithm === "insertion") steps = insertionSort(array);
            if (algorithm === "merge") steps = mergeSort(array);
            if (algorithm === "quick") steps = quickSort(array);
        }

        if (mode === "searching") {
            const parsedTarget = Number(target);
            if (Number.isNaN(parsedTarget)) {
                return;
            }
            if (algorithm === "linear") steps = linearSearch(array, parsedTarget);
            if (algorithm === "binary") {
                const sorted = [...array].sort((a, b) => a - b);
                setArray(sorted);
                steps = binarySearch(sorted, parsedTarget);
            }
        }

        if (mode === "graph") {
            if (algorithm === "bfs") steps = bfs(grid);
            if (algorithm === "dfs") steps = dfs(grid);
            if (algorithm === "dijkstra") steps = dijkstra(grid);
        }

        if (!steps.length) return;

        saveSession({
            algorithm,
            mode,
            inputSize: mode === "graph" ? grid.flat().length : array.length,
            stepsCount: steps.length,
            timeTaken: 0,
        });

        await play(
            steps,
            mode === "graph" ? grid : array,
            setArray,
            setActive,
            setFoundIndex,
            setCurrentLine,
            setGrid
        );
    };

    const handleReset = () => {
        setActive([]);
        setFoundIndex(null);
        setCurrentLine(null);

        if (mode === "graph") {
            resetGrid();
        } else {
            setArray(initialArray.length ? initialArray : array);
        }
    };

    return (
        <div className="bg-[#143542] border border-[#09b7b4]/30 rounded-xl px-4 py-3 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-[#00030a] text-xs border border-[#09b7b4]/40 px-2 py-1 rounded text-[#bc9891]"
                >
                    <option value="sorting">Sorting</option>
                    <option value="searching">Searching</option>
                    <option value="graph">Graph</option>
                </select>

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="bg-[#00030a] text-xs border border-[#09b7b4]/40 px-2 py-1 rounded text-[#bc9891]"
                >
                    {mode === "sorting" && (
                        <>
                            <option value="bubble">Bubble Sort</option>
                            <option value="selection">Selection Sort</option>
                            <option value="insertion">Insertion Sort</option>
                            <option value="merge">Merge Sort</option>
                            <option value="quick">Quick Sort</option>
                        </>
                    )}
                    {mode === "searching" && (
                        <>
                            <option value="linear">Linear Search</option>
                            <option value="binary">Binary Search</option>
                        </>
                    )}
                    {mode === "graph" && (
                        <>
                            <option value="bfs">BFS</option>
                            <option value="dfs">DFS</option>
                            <option value="dijkstra">Dijkstra</option>
                        </>
                    )}
                </select>
            </div>

            {/* CENTER */}
            <div className="flex items-center gap-3">

                <button
                    onClick={handleStart}
                    className="bg-[#09b7b4] text-black px-4 py-1 rounded text-xs"
                >
                    INITIALIZE
                </button>

                <button
                    onClick={pause}
                    className="bg-[#e57744] text-black border border-[#e57744]/40 px-3 py-1 text-xs rounded"
                >
                    PAUSE
                </button>

                <button
                    onClick={handleReset}
                    className="bg-[#ac4b3e] text-black border border-[#ac4b3e]/40 px-3 py-1 text-xs rounded"
                >
                    RESET
                </button>

                {mode !== "graph" && (
                    <button
                        onClick={() => generateArray(size)}
                        className="bg-[#bc9891] text-black border border-[#bc9891]/40 px-3 py-1 text-xs rounded"
                    >
                        GENERATE
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3">

                {/* TARGET (only in searching) */}
                {mode === "searching" && (
                    <div className="h-14.5 w-40 flex flex-col justify-center border border-[#09b7b4]/20 bg-[#143542] px-3 rounded-lg">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#bc9891]/70">
                            Target
                        </span>
                        <input
                            type="number"
                            placeholder=" Value"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="mt-1 bg-[#00030a] rounded-sm text-sm text-[#bc9891] outline-none border border-[#09b7b4]/20"
                        />
                    </div>
                )}

                {/* SIZE */}
                {mode !== "graph" && (
                    <div className="h-14.5 w-40 flex flex-col justify-center border border-[#09b7b4]/20 bg-[#143542] px-3 rounded-lg">
                        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-[#bc9891]/70">
                            <span>Size</span>
                            <span className="text-[#bc9891] text-xs">{size}</span>
                        </div>
                        <input
                            type="range"
                            min="5"
                            max="50"
                            value={size}
                            onChange={(e) => {
                                const newSize = Number(e.target.value);
                                setSize(newSize);
                                generateArray(newSize);
                            }}
                            className="mt-1 w-full accent-[#09b7b4]"
                        />
                    </div>
                )}

                {/* SPEED */}
                <div className="h-14.5 w-40 flex flex-col justify-center border border-[#09b7b4]/20 bg-[#143542] px-3 rounded-lg">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-[#bc9891]/70">
                        Speed
                    </span>
                    <input
                        type="range"
                        min="10"
                        max="300"
                        defaultValue="50"
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="mt-1 w-full accent-[#09b7b4]"
                    />
                </div>

                {/* TIMELINE*/}
                {mode !== "graph" && (
                    <div className="h-14.5 w-40 flex flex-col justify-center border border-[#09b7b4]/20 bg-[#143542] px-3 rounded-lg">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-[#bc9891]/70">Timeline</span>

                        <input
                            type="range"
                            min="0"
                            max={steps.length > 0 ? steps.length - 1 : 0}
                            value={currentStep}
                            onChange={(e) => {
                                const stepIndex = Number(e.target.value);
                                setCurrentStep(stepIndex);

                                applyStep(steps[stepIndex], {
                                    array,
                                    setArray,
                                    setActive,
                                    setFoundIndex,
                                    setCurrentLine,
                                    setGrid
                                });
                            }}
                            className="w-full accent-[#e57744]"
                        />
                    </div>
                )}

            </div>


        </div>
    );
}

export default ControlPanel;
