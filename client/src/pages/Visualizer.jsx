// import { useState, useEffect } from "react";
// import { useNavigate } from "react-router-dom";
// import { PSEUDOCODE } from "../utils/pseudocode";
// import { createGrid } from "../utils/createGrid";
// import ArrayBars from "../components/visualizer/ArrayBars";
// import CodePanel from "../components/visualizer/CodePanel";
// import ControlPanel from "../components/controls/ControlPanel";
// import Grid from "../components/graphs/Grid";
// import useAnimation from "../hooks/useAnimation";

// function Visualizer() {
//     const navigate = useNavigate();
//     const [array, setArray] = useState([50, 120, 80, 30, 160, 90, 200]);
//     const [active, setActive] = useState([]);
//     const [foundIndex, setFoundIndex] = useState(null);
//     const [currentLine, setCurrentLine] = useState(null);
//     const [algorithm, setAlgorithm] = useState("bubble");
//     const [mode, setMode] = useState("sorting");
//     const [grid, setGrid] = useState(createGrid(20, 40));
//     const [history, setHistory] = useState([]);

//     const code = PSEUDOCODE[algorithm];

//     const { play, pause, setSpeed, isPlaying } = useAnimation();

//     const fetchHistory = async () => {
//         try {
//             const res = await fetch("http://localhost:5000/api/session");
//             const data = await res.json();
//             setHistory(data);
//         } catch (err) {
//             console.error("Error fetching history:", err);
//         }
//     };

//     const generateArray = (size = 10) => {
//         const newArr = Array.from({ length: size }, () =>
//             Math.floor(Math.random() * 300) + 20
//         );
//         setArray(newArr);
//     };

//     useEffect(() => {
//         setCurrentLine(null);
//         setFoundIndex(null);
//         fetchHistory();
//     }, [algorithm]);

//     useEffect(() => {
//         if (mode === "sorting") {
//             setAlgorithm("bubble");
//         } else if (mode === "searching") {
//             setAlgorithm("linear");
//         } else if (mode === "graph") {
//             setAlgorithm("bfs");
//         }
//     }, [mode]);

//     const handleCellClick = (row, col) => {
//         const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
//         const node = newGrid[row][col];

//         // Toggle wall (basic behavior for now)
//         if (!node.isStart && !node.isEnd) {
//             node.isWall = !node.isWall;
//         }

//         setGrid(newGrid);
//     };

//     const handleWeightChange = (row, col) => {
//         const newGrid = grid.map(r => r.map(c => ({ ...c })));
//         const node = newGrid[row][col];

//         if (!node.isStart && !node.isEnd && !node.isWall) {
//             node.weight = node.weight === 1 ? 5 : 1; // toggle
//         }

//         setGrid(newGrid);
//     };

//     const resetGrid = () => {
//         setGrid(createGrid(20, 40));
//     };

//     return (
//         <div className="relative min-h-screen bg-slate-950 text-slate-50 overflow-hidden">
//             <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_top_left,_rgba(88,99,209,0.16),_transparent_20%)]" />
//             <div className="pointer-events-none fixed inset-0 bg-[radial-gradient(circle_at_bottom_right,_rgba(16,185,129,0.12),_transparent_18%)]" />
//             <div className="pointer-events-none fixed top-24 right-[-120px] h-72 w-72 rounded-full bg-[radial-gradient(circle,_rgba(124,58,237,0.14),_transparent_55%)] blur-3xl" />

//             <button
//                 onClick={() => navigate("/")}
//                 className="fixed top-6 right-6 z-50 text-sm px-4 py-2 border border-slate-700 text-slate-300 hover:text-slate-100 hover:border-slate-500 rounded-full transition-all"
//             >
//                 ← Back
//             </button>

//             <main className="relative z-10 mx-auto flex min-h-screen max-w-[1480px] flex-col px-6 py-8">
//                 <section className="rounded-[32px] border border-slate-800/60 bg-slate-900/85 shadow-[0_30px_90px_-45px_rgba(15,23,42,0.9)] backdrop-blur-md px-6 py-6">
//                     <div className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
//                         <div className="max-w-3xl">
//                             <p className="text-xs uppercase tracking-[0.26em] text-slate-500">Live algorithm workspace</p>
//                             <h1 className="mt-4 text-4xl font-semibold text-slate-100 sm:text-5xl">
//                                 {mode === "graph" ? "Graph Visualizer" : "Array Visualizer"}
//                             </h1>
//                             <p className="mt-4 max-w-2xl text-sm leading-7 text-slate-400">
//                                 Interactively explore algorithm behavior with clear visualization, elegant state feedback, and purposeful interface structure.
//                             </p>
//                         </div>
//                         <div className="inline-flex items-center gap-3 rounded-full border border-slate-700/60 bg-slate-950/70 px-4 py-2 text-sm text-slate-300">
//                             <span className="h-2.5 w-2.5 rounded-full bg-cyan-400 shadow-[0_0_20px_rgba(56,189,248,0.25)]" />
//                             {isPlaying ? "Running" : "Idle"}
//                         </div>
//                     </div>
//                 </section>

//                 <section className="mt-6">
//                     <ControlPanel
//                         play={play}
//                         pause={pause}
//                         setSpeed={setSpeed}
//                         isPlaying={isPlaying}
//                         array={array}
//                         setArray={setArray}
//                         setActive={setActive}
//                         setFoundIndex={setFoundIndex}
//                         setCurrentLine={setCurrentLine}
//                         algorithm={algorithm}
//                         setAlgorithm={setAlgorithm}
//                         mode={mode}
//                         setMode={setMode}
//                         grid={grid}
//                         setGrid={setGrid}
//                         resetGrid={resetGrid}
//                     />
//                 </section>

//                 <section className="mt-6 flex-1 min-h-0">
//                     <div className="grid min-h-0 gap-6 xl:grid-cols-[1.45fr_1.25fr]">
//                         <div className="rounded-[32px] border border-slate-800/60 bg-slate-900/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-md min-h-[520px] flex flex-col">
//                             <div className="mb-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                                 <div>
//                                     <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Visualization</p>
//                                     <h2 className="mt-3 text-2xl font-semibold text-slate-100">Focused viewport</h2>
//                                 </div>
//                                 <div className="inline-flex items-center gap-2 rounded-full border border-slate-700/60 bg-slate-950/75 px-4 py-2 text-xs text-slate-300">
//                                     <span className="inline-flex h-2.5 w-2.5 rounded-full bg-indigo-400" />
//                                     {mode === "graph" ? "Graph mode" : "Array mode"}
//                                 </div>
//                             </div>

//                             <div className="flex-1 overflow-hidden rounded-[28px] border border-slate-800/70 bg-slate-950/75 p-4 shadow-inner shadow-slate-950/20">
//                                 {mode === "graph" ? (
//                                     <div className="h-full overflow-auto rounded-[22px] bg-slate-950/80 p-3">
//                                         <Grid grid={grid} handleCellClick={handleCellClick} handleWeightChange={handleWeightChange} />
//                                     </div>
//                                 ) : (
//                                     <div className="h-full overflow-hidden rounded-[22px] bg-slate-950/80 p-3">
//                                         <ArrayBars array={array} active={active} foundIndex={foundIndex} />
//                                     </div>
//                                 )}
//                             </div>
//                         </div>

//                         <div className="space-y-6">
//                             <div className="rounded-[32px] border border-slate-800/60 bg-slate-900/90 p-6 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-md min-h-[520px]">
//                                 <div className="mb-5 flex items-center justify-between gap-3">
//                                     <div>
//                                         <p className="text-xs uppercase tracking-[0.28em] text-slate-500">Code view</p>
//                                         <h2 className="mt-2 text-xl font-semibold text-slate-100">Pseudocode</h2>
//                                     </div>
//                                     <span className="rounded-full bg-slate-950/60 px-3 py-1 text-xs text-slate-300 border border-slate-700/60">
//                                         Line {currentLine !== null ? currentLine + 1 : "—"}
//                                     </span>
//                                 </div>
//                                 <div className="h-[calc(100%-4rem)] min-h-[380px] overflow-auto">
//                                     <CodePanel code={code} currentLine={currentLine} />
//                                 </div>
//                             </div>
//                         </div>
//                     </div>
//                 </section>

//                 <section className="mt-6">
//                     <div className="rounded-[32px] border border-slate-800/60 bg-slate-900/85 p-5 shadow-[0_20px_60px_-40px_rgba(15,23,42,0.8)] backdrop-blur-md">
//                         <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
//                             <div>
//                                 <p className="text-xs uppercase tracking-[0.28em] text-slate-500">History</p>
//                                 <h2 className="mt-2 text-xl font-semibold text-slate-100">Recent runs</h2>
//                             </div>
//                             <span className="inline-flex rounded-full bg-slate-950/60 px-3 py-1 text-xs text-slate-300 border border-slate-700/60">
//                                 Latest activity
//                             </span>
//                         </div>
//                         {history.length === 0 ? (
//                             <p className="text-sm text-slate-500">No data yet</p>
//                         ) : (
//                             <div className="space-y-3">
//                                 {history.slice(0, 5).map((item) => (
//                                     <div
//                                         key={item._id}
//                                         className="grid grid-cols-2 gap-4 rounded-3xl border border-slate-800/50 bg-slate-950/70 px-4 py-3 text-sm text-slate-300"
//                                     >
//                                         <div className="space-y-1">
//                                             <p className="font-medium text-slate-100">{item.algorithm}</p>
//                                             <p className="text-slate-500">Size: {item.inputSize}</p>
//                                         </div>
//                                         <div className="flex items-center justify-between gap-4 text-slate-400">
//                                             <span>{item.stepsCount} steps</span>
//                                             <span className="text-emerald-300">{item.timeTaken}ms</span>
//                                         </div>
//                                     </div>
//                                 ))}
//                             </div>
//                         )}
//                     </div>
//                 </section>
//             </main>
//         </div>
//     );
// }

// export default Visualizer;

import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { PSEUDOCODE } from "../utils/pseudocode";
import { createGrid } from "../utils/createGrid";
import { COMPLEXITY } from "../utils/complexity";

import ArrayBars from "../components/visualizer/ArrayBars";
import CodePanel from "../components/visualizer/CodePanel";
import ControlPanel from "../components/controls/ControlPanel";
import Grid from "../components/graphs/Grid";

import useAnimation from "../hooks/useAnimation";

function Visualizer() {
    const navigate = useNavigate();

    const [array, setArray] = useState([50, 120, 80, 30, 160, 90, 200]);
    const [active, setActive] = useState([]);
    const [foundIndex, setFoundIndex] = useState(null);
    const [currentLine, setCurrentLine] = useState(null);

    const [algorithm, setAlgorithm] = useState("bubble");
    const [mode, setMode] = useState("sorting");
    const [history, setHistory] = useState([]);
    const [grid, setGrid] = useState(createGrid(20, 40));
    const complexity = COMPLEXITY[algorithm];

    const code = PSEUDOCODE[algorithm];
    const { play, pause, setSpeed, isPlaying, steps, currentStep, setCurrentStep, applyStep } = useAnimation();

    const fetchHistory = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/session");
            const data = await res.json();
            setHistory(data);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    useEffect(() => {
        setCurrentLine(null);
        setFoundIndex(null);
        fetchHistory();
    }, [algorithm]);

    useEffect(() => {
        if (mode === "sorting") setAlgorithm("bubble");
        if (mode === "searching") setAlgorithm("linear");
        if (mode === "graph") setAlgorithm("bfs");
    }, [mode]);

    const handleCellClick = (r, c) => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        const node = newGrid[r][c];
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
        }
        setGrid(newGrid);
    };

    const handleWeightChange = (r, c) => {
        const newGrid = grid.map(row => row.map(cell => ({ ...cell })));
        const node = newGrid[r][c];
        if (!node.isStart && !node.isEnd && !node.isWall) {
            node.weight = node.weight === 1 ? 5 : 1;
        }
        setGrid(newGrid);
    };

    const resetGrid = () => setGrid(createGrid(20, 40));

    return (
        <div className="min-h-screen bg-linear-to-br from-[#00030a] to-[#143542] text-[#bc9891]">

            {/* ===== TOP SYSTEM BAR ===== */}
            <div className="px-6 pt-5">
                <div className="flex items-center justify-between border border-[#09b7b4]/30 rounded-xl px-5 py-3 bg-[#143542]/80">

                    <div className="flex items-center gap-6">
                        <div className="text-2xl font-['Space_Grotesk'] tracking-[-0.02em] text-[#bc9891] font-semibold">
                            Corollary
                        </div>

                        <div className="text-xs text-[#bc9891]/80">
                            MODE: <span className="text-[#09b7b4]">{mode.toUpperCase()}</span>
                        </div>

                        <div className="text-xs text-[#bc9891]/80">
                            ALGORITHM: <span className="text-[#e57744]">{algorithm.toUpperCase()}</span>
                        </div>

                        <div className="text-xs text-[#bc9891]/80">
                            Time: <span className="text-[#09b7b4]">{complexity?.time}</span>
                        </div>

                        <div className="text-xs text-[#bc9891]/80">
                            Space: <span className="text-[#e57744]">{complexity?.space}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="text-xs border border-[#ac4b3e] px-4 py-1 rounded-md text-[#bc9891] hover:text-[#09b7b4] hover:border-[#09b7b4] transition"
                    >
                        HOME
                    </button>
                </div>
            </div>

            {/* ===== CONTROL PANEL ===== */}
            <div className="px-6 mt-4">
                <ControlPanel
                    play={play}
                    pause={pause}
                    setSpeed={setSpeed}
                    isPlaying={isPlaying}
                    array={array}
                    setArray={setArray}
                    setActive={setActive}
                    setFoundIndex={setFoundIndex}
                    setCurrentLine={setCurrentLine}
                    algorithm={algorithm}
                    setAlgorithm={setAlgorithm}
                    mode={mode}
                    setMode={setMode}
                    grid={grid}
                    setGrid={setGrid}
                    resetGrid={resetGrid}
                    steps={steps}
                    currentStep={currentStep}
                    setCurrentStep={setCurrentStep}
                    applyStep={applyStep}
                />
            </div>

            {/* ===== MAIN GRID ===== */}
            <div className="px-6 mt-5 grid grid-cols-[2fr_1fr] gap-5">

                {/* VISUALIZER */}
                <div className="bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 rounded-xl p-5 h-130">

                    <div className="text-xs text-[#bc9891]/70 mb-2">
                        CURRENT ALGORITHM
                    </div>

                    <div className="text-[#e57744] text-sm mb-4">
                        {algorithm.toUpperCase()}
                    </div>

                    <div className="h-110 flex items-center justify-center">
                        {mode === "graph" ? (
                            <Grid
                                grid={grid}
                                handleCellClick={handleCellClick}
                                handleWeightChange={handleWeightChange}
                            />
                        ) : (
                            <ArrayBars
                                array={array}
                                active={active}
                                foundIndex={foundIndex}
                            />
                        )}
                    </div>
                </div>

                {/* CODE PANEL */}
                <div className="bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 rounded-xl p-4 h-130">

                    <div className="text-xs text-[#09b7b4] mb-2">
                        PSEUDOCODE
                    </div>

                    <CodePanel code={code} currentLine={currentLine} />
                </div>
            </div>

            {/* ===== HISTORY ===== */}
            <section className="mt-4 px-6">
                <div className="rounded-2xl bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 p-5 shadow-[0_20px_60px_-40px_rgba(0,3,10,0.8)]">

                    {/* HEADER */}
                    <div className="mb-4 flex items-center justify-between">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#e57744]">
                            Recent Runs
                        </p>

                        <span className="text-[10px] border border-[#09b7b4] px-3 py-1 rounded-full text-[#09b7b4]">
                            Latest Activity
                        </span>
                    </div>

                    {/* EMPTY STATE */}
                    {history.length === 0 ? (
                        <p className="text-sm text-[#bc9891]/60">No data yet</p>
                    ) : (

                        <div className="overflow-hidden rounded-lg border border-[#09b7b4]/20">

                            {/* TABLE HEADER */}
                            <div className="grid grid-cols-4 text-[11px] uppercase tracking-[0.2em] text-[#bc9891]/70 bg-[#00030a] border-b border-[#09b7b4]/20 px-4 py-2">
                                <span>Algorithm</span>
                                <span>Input Size</span>
                                <span>Step Count</span>
                                <span className="text-right">Runtime</span>
                            </div>

                            {/* TABLE BODY */}
                            <div className="divide-y divide-[#09b7b4]/10">
                                {history.slice(0, 5).map((item) => (
                                    <div
                                        key={item._id}
                                        className="grid grid-cols-4 px-4 py-3 text-sm text-[#bc9891] hover:bg-[#143542]/50 transition"
                                    >
                                        <span className="text-[#e57744] font-medium">
                                            {item.algorithm.toUpperCase()}
                                        </span>

                                        <span className="text-[#09b7b4]">
                                            {item.inputSize}
                                        </span>

                                        <span className="text-[#ac4b3e]">
                                            {item.stepsCount} steps
                                        </span>

                                        <span className="text-[#e57744] text-right tabular-nums">
                                            {item.timeTaken} ms
                                        </span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Visualizer;