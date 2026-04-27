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
}) {

    const handleStart = () => {
        let steps = [];

        if (mode === "graph") {
            const cleanGrid = grid.map(row =>
                row.map(node => ({
                    ...node,
                    isVisited: false,
                    isPath: false,
                    previous: null
                }))
            );

            setGrid(cleanGrid);

            if (algorithm === "bfs") {
                steps = bfs(cleanGrid);
            } else if (algorithm === "dfs") {
                steps = dfs(cleanGrid);
            }

            play(steps, null, null, null, null, null, setGrid);
            return;
        }

        // Sorting & Searching
        const numTarget = Number(target);

        if (algorithm === "linear") {
            steps = linearSearch(array, numTarget);
        } else if (algorithm === "binary") {
            const sorted = [...array].sort((a, b) => a - b);
            setArray(sorted);
            steps = binarySearch(sorted, numTarget);
        } else if (algorithm === "bubble") {
            steps = bubbleSort(array);
        } else if (algorithm === "selection") {
            steps = selectionSort(array);
        } else if (algorithm === "insertion") {
            steps = insertionSort(array);
        } else if (algorithm === "merge") {
            steps = mergeSort(array);
        } else if (algorithm === "quick") {
            steps = quickSort(array);
        }

        play(steps, array, setArray, setActive, setFoundIndex, setCurrentLine);
    };

    const [size, setSize] = useState(10);
    const [target, setTarget] = useState("");

    const generateArray = (customSize = size) => {
        const newArr = Array.from({ length: customSize }, () =>
            Math.floor(Math.random() * 200) + 20
        );
        setArray(newArr);
    };

    const handleReset = () => {
        setActive([]);
        setFoundIndex(null);
        generateArray(size);
        setCurrentLine(null);
    };

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 border border-gray-700 rounded-lg">

            <h2 className="text-xl font-medium">
                {algorithm.toUpperCase()} Visualization
            </h2>

            <button
                onClick={handleStart}
                className="px-4 py-2 bg-green-500 rounded hover:bg-green-600"
            >
                Start
            </button>

            <button
                onClick={pause}
                className="px-4 py-2 bg-yellow-500 rounded hover:bg-yellow-600"
            >
                Pause
            </button>

            <button
                onClick={handleReset}
                className="px-4 py-2 bg-red-500 rounded hover:bg-red-600"
            >
                Reset
            </button>

            <button
                onClick={generateArray}
                className="px-4 py-2 bg-blue-500 rounded hover:bg-blue-600"
            >
                Generate Array
            </button>

            <div className="flex items-center gap-2">
                <span>Size:</span>
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
                />
            </div>

            <div className="flex items-center gap-2">
                <span>Speed:</span>
                <input
                    type="range"
                    min="10"
                    max="300"
                    defaultValue="50"
                    onChange={(e) => setSpeed(Number(e.target.value))}
                    className="cursor-pointer"
                />
            </div>

            <select
                value={mode}
                onChange={(e) => setMode(e.target.value)}
                className="bg-gray-800 px-3 py-2 rounded"
            >
                <option value="sorting">Sorting</option>
                <option value="graph">Graph</option>
            </select>

            <input
                type="number"
                placeholder="Enter target"
                value={target}
                onChange={(e) => setTarget(e.target.value)}
                className="px-3 py-2 bg-gray-800 rounded"
            />

            <select
                value={algorithm}
                onChange={(e) => setAlgorithm(e.target.value)}
                className="bg-gray-800 px-3 py-2 rounded"
            >
                {mode === "sorting" && (
                    <>
                        <option value="bubble">Bubble Sort</option>
                        <option value="selection">Selection Sort</option>
                        <option value="insertion">Insertion Sort</option>
                        <option value="merge">Merge Sort</option>
                        <option value="quick">Quick Sort</option>
                        <option value="linear">Linear Search</option>
                        <option value="binary">Binary Search</option>
                    </>
                )}

                {mode === "graph" && (
                    <>
                        <option value="bfs">BFS</option>
                        <option value="dfs">DFS</option>
                    </>
                )}
            </select>

            {mode === "graph" && (
                <button
                    onClick={resetGrid}
                    className="px-4 py-2 bg-red-500 rounded"
                >
                    Reset Grid
                </button>
            )}

        </div>
    );
}

export default ControlPanel;