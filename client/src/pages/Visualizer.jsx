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

    const {
        play,
        pause,
        setSpeed,
        isPlaying,
        steps,
        currentStep,
        setCurrentStep,
        applyStep
    } = useAnimation();

    const fetchHistory = async () => {
        try {
            const res = await fetch("https://algorithmvisualizer-gzl3.onrender.com/api/session");
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
        <div className="min-h-screen bg-linear-to-br from-[#00030a] to-[#143542] text-[#bc9891] overflow-x-hidden">

            {/* ===== TOP SYSTEM BAR ===== */}
            <div className="px-4 sm:px-6 pt-4">
                <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-3 border border-[#09b7b4]/30 rounded-xl px-4 sm:px-5 py-3 bg-[#143542]/80">

                    <div className="flex flex-wrap items-center gap-4 text-xs">

                        <div className="text-lg sm:text-xl font-['Space_Grotesk'] text-[#bc9891] font-semibold">
                            Corollary
                        </div>

                        <div>
                            MODE: <span className="text-[#09b7b4]">{mode.toUpperCase()}</span>
                        </div>

                        <div>
                            ALGORITHM: <span className="text-[#e57744]">{algorithm.toUpperCase()}</span>
                        </div>

                        <div>
                            Time: <span className="text-[#09b7b4]">{complexity?.time}</span>
                        </div>

                        <div>
                            Space: <span className="text-[#e57744]">{complexity?.space}</span>
                        </div>
                    </div>

                    <button
                        onClick={() => navigate("/")}
                        className="text-xs border border-[#ac4b3e] px-4 py-1 rounded-md hover:text-[#09b7b4] hover:border-[#09b7b4] transition w-fit"
                    >
                        HOME
                    </button>
                </div>
            </div>

            {/* ===== CONTROL PANEL ===== */}
            <div className="px-4 sm:px-6 mt-4">
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

            {/* ===== MAIN VISUAL AREA ===== */}
            <div className="px-4 sm:px-6 mt-5 flex flex-col lg:flex-row gap-4 min-h-[60vh] lg:min-h-[70vh]">

                {/* VISUALIZER */}
                <div className="w-full lg:w-2/3 bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 rounded-xl p-4 sm:p-5 flex flex-col">

                    <div className="text-xs text-[#bc9891]/70 mb-2">
                        CURRENT ALGORITHM
                    </div>

                    <div className="text-[#e57744] text-sm mb-4">
                        {algorithm.toUpperCase()}
                    </div>

                    <div className="flex-1 flex items-center justify-center overflow-auto">
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
                <div className="w-full lg:w-1/3 bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 rounded-xl p-4 flex flex-col">

                    <div className="text-xs text-[#09b7b4] mb-2">
                        PSEUDOCODE
                    </div>

                    <div className="flex-1 overflow-auto">
                        <CodePanel code={code} currentLine={currentLine} />
                    </div>
                </div>
            </div>

            {/* ===== HISTORY ===== */}
            <section className="mt-6 px-4 sm:px-6 pb-6">
                <div className="rounded-2xl bg-linear-to-br from-[#143542] to-[#00030a] border border-[#09b7b4]/20 p-4 sm:p-5">

                    <div className="mb-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
                        <p className="text-xs uppercase tracking-[0.28em] text-[#e57744]">
                            Recent Runs
                        </p>

                        <span className="text-[10px] border border-[#09b7b4] px-3 py-1 rounded-full text-[#09b7b4] w-fit">
                            Latest Activity
                        </span>
                    </div>

                    {history.length === 0 ? (
                        <p className="text-sm text-[#bc9891]/60">No data yet</p>
                    ) : (
                        // horizontal scroll for mobile
                        <div className="overflow-x-auto">
                            <div className="min-w-125 rounded-lg border border-[#09b7b4]/20">

                                <div className="grid grid-cols-4 text-[11px] uppercase tracking-[0.2em] bg-[#00030a] border-b border-[#09b7b4]/20 px-4 py-2">
                                    <span>Algorithm</span>
                                    <span>Input Size</span>
                                    <span>Step Count</span>
                                    <span className="text-right">Runtime</span>
                                </div>

                                <div className="divide-y divide-[#09b7b4]/10">
                                    {history.slice(0, 5).map((item) => (
                                        <div
                                            key={item._id}
                                            className="grid grid-cols-4 px-4 py-3 text-sm hover:bg-[#143542]/50 transition"
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

                                            <span className="text-[#e57744] text-right">
                                                {item.timeTaken} ms
                                            </span>
                                        </div>
                                    ))}
                                </div>

                            </div>
                        </div>
                    )}
                </div>
            </section>
        </div>
    );
}

export default Visualizer;