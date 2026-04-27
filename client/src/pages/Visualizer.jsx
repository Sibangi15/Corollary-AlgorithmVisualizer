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

    const code = PSEUDOCODE[algorithm];

    const { play, pause, setSpeed, isPlaying } = useAnimation();

    const generateArray = (size = 10) => {
        const newArr = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 300) + 20
        );
        setArray(newArr);
    };

    useEffect(() => {
        setCurrentLine(null);
        setFoundIndex(null);
    }, [algorithm]);

    const handleCellClick = (row, col) => {
        const newGrid = grid.map((r) => r.map((cell) => ({ ...cell })));
        const node = newGrid[row][col];

        // Toggle wall (basic behavior for now)
        if (!node.isStart && !node.isEnd) {
            node.isWall = !node.isWall;
        }

        setGrid(newGrid);
    };

    const resetGrid = () => {
        setGrid(createGrid(20, 40));
    };

    return (

        <div className="p-6 grid grid-rows-[auto_auto_1fr] gap-6 h-screen">
            <h2 className="text-2xl font-semibold">
                {mode === "sorting" ? "Sorting Visualizer" : "Graph Visualizer"}
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
                {mode === "sorting" ? (
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
                ) : (
                    <div className="flex justify-center items-center h-full">
                        <Grid grid={grid} handleCellClick={handleCellClick} />
                    </div>
                )}
            </div>
        </div>
    );
}

export default Visualizer;