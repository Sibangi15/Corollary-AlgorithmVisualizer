import { useState, useEffect } from "react";
import { PSEUDOCODE } from "../utils/pseudocode";
import { createGrid } from "../utils/createGrid";
import ArrayBars from "../components/visualizer/ArrayBars";
import CodePanel from "../components/visualizer/CodePanel";
import ControlPanel from "../components/controls/ControlPanel";
import Grid from "../components/graphs/Grid";
import useAnimation from "../hooks/useAnimation";

function Visualizer() {
    const [array, setArray] = useState([50, 120, 80, 30, 160, 90, 200]);
    const [active, setActive] = useState([]);
    const [foundIndex, setFoundIndex] = useState(null);
    const [currentLine, setCurrentLine] = useState(null);
    const [algorithm, setAlgorithm] = useState("bubble");
    const [mode, setMode] = useState("sorting");
    const [grid, setGrid] = useState(createGrid(20, 40));
    const [history, setHistory] = useState([]);

    const code = PSEUDOCODE[algorithm];

    const { play, pause, setSpeed, isPlaying } = useAnimation();

    const fetchHistory = async () => {
        try {
            const res = await fetch("http://localhost:5000/api/session");
            const data = await res.json();
            setHistory(data);
        } catch (err) {
            console.error("Error fetching history:", err);
        }
    };

    const generateArray = (size = 10) => {
        const newArr = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 300) + 20
        );
        setArray(newArr);
    };

    useEffect(() => {
        setCurrentLine(null);
        setFoundIndex(null);
        fetchHistory();
    }, [algorithm]);

    useEffect(() => {
        if (mode === "sorting") {
            setAlgorithm("bubble");
        } else if (mode === "searching") {
            setAlgorithm("linear");
        } else if (mode === "graph") {
            setAlgorithm("bfs");
        }
    }, [mode]);

    const handleCellClick = (row, col) => {
        const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
        const node = newGrid[row][col];

        // Toggle wall (basic behavior for now)
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
        }

        setGrid(newGrid);
    };

    const handleWeightChange = (row, col) => {
        const newGrid = grid.map(r => r.map(c => ({ ...c })));
        const node = newGrid[row][col];

        if (!node.isStart && !node.isEnd && !node.isWall) {
            node.weight = node.weight === 1 ? 5 : 1; // toggle
        }

        setGrid(newGrid);
    };

    const resetGrid = () => {
        setGrid(createGrid(20, 40));
    };

    return (

        <div className="p-6 grid grid-rows-[auto_auto_1fr] gap-6 h-screen">
            <h2 className="text-2xl font-semibold">
                {mode === "graph" ? "Graph Visualizer" : "Array Visualizer"}
            </h2>

            <ControlPanel play={play}
                pause={pause}
                setSpeed={setSpeed}
                isPlaying={isPlaying}
                array={array}
                setArray={setArray}
                setActive={setActive}
                generateArray={generateArray}
                setFoundIndex={setFoundIndex}
                setCurrentLine={setCurrentLine}
                algorithm={algorithm}
                setAlgorithm={setAlgorithm}
                mode={mode}
                setMode={setMode}
                grid={grid}
                setGrid={setGrid}
                resetGrid={resetGrid}
            />

            <div className="flex-1">
                {mode === "graph" ? (
                    <div className="grid grid-cols-3 gap-6 h-full">
                        <div className="flex justify-center items-center h-full col-span-2">
                            <Grid grid={grid} handleCellClick={handleCellClick} handleWeightChange={handleWeightChange} />
                        </div>
                        <div className="col-span-1">
                            <CodePanel code={code} currentLine={currentLine} />
                        </div>
                    </div>
                ) : (
                    <div className="grid grid-cols-3 gap-6 h-full">

                        {/* Visualization */}
                        <div className="col-span-2">
                            <ArrayBars
                                array={array}
                                active={active}
                                foundIndex={foundIndex}
                            />
                        </div>

                        {/* Code Panel */}
                        <div className="col-span-1">
                            <CodePanel code={code} currentLine={currentLine} />
                        </div>

                    </div>
                )}
            </div>

            <div className="mt-6 border border-gray-700 rounded-lg p-4">
                <h3 className="text-lg font-semibold mb-3">Recent Runs</h3>

                {history.length === 0 ? (
                    <p className="text-gray-400">No data yet</p>
                ) : (
                    history.map((item) => (
                        <div
                            key={item._id}
                            className="flex justify-between items-center bg-gray-800 px-3 py-2 rounded mb-2"
                        >
                            <span className="font-medium">{item.algorithm}</span>
                            <span className="text-yellow-400">{item.inputSize}</span>
                            <span className="text-gray-400">{item.stepsCount} steps</span>
                            <span className="text-green-400">{item.timeTaken} ms</span>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
}

export default Visualizer;