// import { useState } from "react";

// import { bubbleSort } from "../../algorithms/sorting/bubbleSort";
// import { selectionSort } from "../../algorithms/sorting/selectionSort";
// import { insertionSort } from "../../algorithms/sorting/insertionSort";
// import { mergeSort } from "../../algorithms/sorting/mergeSort";
// import { quickSort } from "../../algorithms/sorting/quickSort";

// import { linearSearch } from "../../algorithms/searching/linearSearch";
// import { binarySearch } from "../../algorithms/searching/binarySearch";

// import { bfs } from "../../algorithms/graph/bfs";
// import { dfs } from "../../algorithms/graph/dfs";
// import { dijkstra } from "../../algorithms/graph/dijkstra";

// function ControlPanel({
//     play,
//     pause,
//     setSpeed,
//     isPlaying,
//     array,
//     setArray,
//     setActive,
//     setFoundIndex,
//     setCurrentLine,
//     algorithm,
//     setAlgorithm,
//     mode,
//     setMode,
//     grid,
//     setGrid,
//     resetGrid,
// }) {
//     const [size, setSize] = useState(10);
//     const [target, setTarget] = useState("");

//     const saveSession = async (data) => {
//         try {
//             await fetch("http://localhost:5000/api/session", {
//                 method: "POST",
//                 headers: {
//                     "Content-Type": "application/json",
//                 },
//                 body: JSON.stringify(data),
//             });
//         } catch (err) {
//             console.error("Error saving session:", err);
//         }
//     };

//     const generateArray = (customSize = size) => {
//         const newArr = Array.from({ length: customSize }, () =>
//             Math.floor(Math.random() * 300) + 20
//         );

//         setArray(newArr);
//         setActive([]);
//         setFoundIndex(null);
//         setCurrentLine(null);
//     };

//     const handleStart = async () => {
//         setActive([]);
//         setFoundIndex(null);
//         setCurrentLine(null);

//         let steps = [];

//         if (mode === "sorting") {
//             if (algorithm === "bubble") steps = bubbleSort(array);
//             if (algorithm === "selection") steps = selectionSort(array);
//             if (algorithm === "insertion") steps = insertionSort(array);
//             if (algorithm === "merge") steps = mergeSort(array);
//             if (algorithm === "quick") steps = quickSort(array);
//         }

//         if (mode === "searching") {
//             const parsedTarget = Number(target);
//             if (Number.isNaN(parsedTarget)) {
//                 return;
//             }
//             if (algorithm === "linear") steps = linearSearch(array, parsedTarget);
//             if (algorithm === "binary") steps = binarySearch(array, parsedTarget);
//         }

//         if (mode === "graph") {
//             if (algorithm === "bfs") steps = bfs(grid);
//             if (algorithm === "dfs") steps = dfs(grid);
//             if (algorithm === "dijkstra") steps = dijkstra(grid);
//         }

//         if (!steps.length) return;

//         saveSession({
//             algorithm,
//             mode,
//             inputSize: mode === "graph" ? grid.flat().length : array.length,
//             stepsCount: steps.length,
//             timeTaken: 0,
//         });

//         await play(
//             steps,
//             mode === "graph" ? grid : array,
//             setArray,
//             setActive,
//             setFoundIndex,
//             setCurrentLine,
//             setGrid
//         );
//     };

//     const handleReset = () => {
//         setActive([]);
//         setFoundIndex(null);
//         setCurrentLine(null);

//         if (mode === "graph") {
//             resetGrid();
//         } else {
//             generateArray(size);
//         }
//     };

//     return (
//         <div className="w-full rounded-3xl border border-slate-800/60 bg-slate-950/85 backdrop-blur-md px-4 py-4 shadow-[0_30px_80px_-50px_rgba(15,23,42,0.8)]">
//             <div className="flex flex-wrap items-center gap-3">
//                 <div className="flex flex-wrap items-center gap-3">
//                     <div className="text-xs uppercase tracking-[0.3em] text-slate-500">Mode</div>
//                     <select
//                         value={mode}
//                         onChange={(e) => setMode(e.target.value)}
//                         className="rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-200 outline-none transition hover:border-slate-600"
//                     >
//                         <option value="sorting">Sorting</option>
//                         <option value="searching">Searching</option>
//                         <option value="graph">Graph</option>
//                     </select>
//                     <select
//                         value={algorithm}
//                         onChange={(e) => setAlgorithm(e.target.value)}
//                         className="rounded-2xl border border-slate-700 bg-slate-900/90 px-3 py-2 text-sm text-slate-200 outline-none transition hover:border-slate-600"
//                     >
//                         {mode === "sorting" && (
//                             <>
//                                 <option value="bubble">Bubble Sort</option>
//                                 <option value="selection">Selection Sort</option>
//                                 <option value="insertion">Insertion Sort</option>
//                                 <option value="merge">Merge Sort</option>
//                                 <option value="quick">Quick Sort</option>
//                             </>
//                         )}
//                         {mode === "searching" && (
//                             <>
//                                 <option value="linear">Linear Search</option>
//                                 <option value="binary">Binary Search</option>
//                             </>
//                         )}
//                         {mode === "graph" && (
//                             <>
//                                 <option value="bfs">BFS</option>
//                                 <option value="dfs">DFS</option>
//                                 <option value="dijkstra">Dijkstra</option>
//                             </>
//                         )}
//                     </select>
//                 </div>

//                 <div className="flex flex-wrap items-center gap-2">
//                     <button
//                         onClick={handleStart}
//                         className="rounded-2xl bg-cyan-500 px-4 py-2 text-sm font-medium text-slate-950 shadow-lg shadow-cyan-500/20 transition hover:bg-cyan-400"
//                     >
//                         Start
//                     </button>
//                     <button
//                         onClick={pause}
//                         className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600"
//                     >
//                         Pause
//                     </button>
//                     <button
//                         onClick={handleReset}
//                         className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600"
//                     >
//                         Reset
//                     </button>
//                     {mode !== "graph" && (
//                         <button
//                             onClick={() => generateArray(size)}
//                             className="rounded-2xl border border-slate-700 bg-slate-900/90 px-4 py-2 text-sm text-slate-100 transition hover:border-slate-600"
//                         >
//                             Generate
//                         </button>
//                     )}
//                 </div>

//                 <div className="ml-auto inline-flex items-center gap-2 rounded-full border border-slate-700/70 bg-slate-900/80 px-3 py-2 text-xs text-slate-200 shadow-inner">
//                     <span className={`h-2.5 w-2.5 rounded-full ${isPlaying ? "bg-emerald-400" : "bg-slate-600"}`} />
//                     {isPlaying ? "Running" : "Ready"}
//                 </div>
//             </div>

//             <div className="mt-4 grid gap-3 sm:grid-cols-3 xl:grid-cols-[1.1fr_1.1fr_0.8fr]">
//                 {mode !== "graph" && (
//                     <div className="rounded-2xl border border-slate-800/60 bg-slate-900/90 p-3 shadow-[0_14px_35px_-20px_rgba(15,23,42,0.6)]">
//                         <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Size</div>
//                         <div className="mt-2 flex items-center gap-3">
//                             <input
//                                 type="range"
//                                 min="5"
//                                 max="50"
//                                 value={size}
//                                 onChange={(e) => {
//                                     const newSize = Number(e.target.value);
//                                     setSize(newSize);
//                                     generateArray(newSize);
//                                 }}
//                                 className="w-full accent-cyan-400"
//                             />
//                             <span className="min-w-8 text-sm text-slate-300">{size}</span>
//                         </div>
//                     </div>
//                 )}

//                 <div className="rounded-2xl border border-slate-800/60 bg-slate-900/90 p-3 shadow-[0_14px_35px_-20px_rgba(15,23,42,0.6)]">
//                     <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Speed</div>
//                     <input
//                         type="range"
//                         min="10"
//                         max="300"
//                         defaultValue="50"
//                         onChange={(e) => setSpeed(Number(e.target.value))}
//                         className="mt-2 w-full accent-cyan-400"
//                     />
//                 </div>

//                 {mode === "searching" && (
//                     <div className="rounded-2xl border border-slate-800/60 bg-slate-900/90 p-3 shadow-[0_14px_35px_-20px_rgba(15,23,42,0.6)]">
//                         <div className="text-xs uppercase tracking-[0.28em] text-slate-500">Target</div>
//                         <input
//                             type="number"
//                             placeholder="Target"
//                             value={target}
//                             onChange={(e) => setTarget(e.target.value)}
//                             className="mt-2 w-full rounded-2xl border border-slate-700 bg-slate-950/70 px-3 py-2 text-sm text-slate-200 outline-none transition hover:border-slate-600"
//                         />
//                     </div>
//                 )}
//             </div>
//         </div>
//     );
// }

// export default ControlPanel;

// function ControlPanel({
//     play, pause, setSpeed, isPlaying,
//     array, setArray, setActive, setFoundIndex, setCurrentLine,
//     algorithm, setAlgorithm, mode, setMode,
//     grid, setGrid, resetGrid
// }) {

//     const handleStart = async () => {
//         setActive([]);
//         setFoundIndex(null);
//         setCurrentLine(null);

//         let steps = [];

//         if (mode === "sorting") {
//             const { bubbleSort } = await import("../../algorithms/sorting/bubbleSort");
//             steps = bubbleSort(array);
//         }

//         if (!steps.length) return;

//         await play(steps, array, setArray, setActive, setFoundIndex, setCurrentLine, setGrid);
//     };

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
}) {
    const [size, setSize] = useState(10);
    const [target, setTarget] = useState("");

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
            generateArray(size);
        }
    };

    return (
        <div className="bg-[#0b0f17] border border-[#1a1f2b] rounded-xl px-4 py-3 flex items-center justify-between">

            {/* LEFT */}
            <div className="flex items-center gap-4">

                <select
                    value={mode}
                    onChange={(e) => setMode(e.target.value)}
                    className="bg-slate-900/90 text-xs border border-[#2a3142] px-2 py-1 rounded"
                >
                    <option value="sorting">Sorting</option>
                    <option value="searching">Searching</option>
                    <option value="graph">Graph</option>
                </select>

                <select
                    value={algorithm}
                    onChange={(e) => setAlgorithm(e.target.value)}
                    className="bg-slate-900/90 text-xs border border-[#2a3142] px-2 py-1 rounded"
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
                    className="bg-[#b5c447] text-black px-4 py-1 rounded text-xs"
                >
                    INITIALIZE
                </button>

                <button
                    onClick={pause}
                    className="bg-[#f3a26c] text-black border border-[#2a3142] px-3 py-1 text-xs rounded"
                >
                    PAUSE
                </button>

                <button
                    onClick={handleReset}
                    className="bg-[#e1bdd2] text-black border border-[#2a3142] px-3 py-1 text-xs rounded"
                >
                    RESET
                </button>

                {mode !== "graph" && (
                    <button
                        onClick={() => generateArray(size)}
                        className="bg-[#026f90] border border-[#2a3142] px-3 py-1 text-xs rounded"
                    >
                        GENERATE
                    </button>
                )}
            </div>

            <div className="flex items-center gap-3">

                {/* TARGET (only in searching) */}
                {mode === "searching" && (
                    <div className="h-14.5 w-40 flex flex-col justify-center border border-slate-800/60 bg-slate-900/90 px-3 rounded-lg">
                        <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                            Target
                        </span>
                        <input
                            type="number"
                            placeholder=" Value"
                            value={target}
                            onChange={(e) => setTarget(e.target.value)}
                            className="mt-1 bg-slate-700 rounded-sm text-sm text-slate-200 outline-none"
                        />
                    </div>
                )}

                {/* SIZE */}
                {mode !== "graph" && (
                    <div className="h-14.5 w-40 flex flex-col justify-center border border-slate-800/60 bg-slate-900/90 px-3 rounded-lg">
                        <div className="flex justify-between text-[10px] uppercase tracking-[0.25em] text-slate-500">
                            <span>Size</span>
                            <span className="text-slate-300 text-xs">{size}</span>
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
                            className="mt-1 w-full accent-amber-400"
                        />
                    </div>
                )}

                {/* SPEED */}
                <div className="h-14.5 w-40 flex flex-col justify-center border border-slate-800/60 bg-slate-900/90 px-3 rounded-lg">
                    <span className="text-[10px] uppercase tracking-[0.25em] text-slate-500">
                        Speed
                    </span>
                    <input
                        type="range"
                        min="10"
                        max="300"
                        defaultValue="50"
                        onChange={(e) => setSpeed(Number(e.target.value))}
                        className="mt-1 w-full accent-amber-400"
                    />
                </div>

            </div>


        </div>
    );
}

export default ControlPanel;
