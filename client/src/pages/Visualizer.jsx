import { useState } from "react";
import ArrayBars from "../components/visualizer/ArrayBars";
import ControlPanel from "../components/controls/ControlPanel";
import useAnimation from "../hooks/useAnimation";

function Visualizer() {
    const [array, setArray] = useState([50, 120, 80, 30, 160, 90, 200]);
    const [active, setActive] = useState([]);
    const [foundIndex, setFoundIndex] = useState(null);

    const { play, pause, setSpeed, isPlaying } = useAnimation();

    const generateArray = (size = 10) => {
        const newArr = Array.from({ length: size }, () =>
            Math.floor(Math.random() * 300) + 20
        );
        setArray(newArr);
    };

    return (
        <div className="p-6 grid grid-rows-[auto_auto_1fr] gap-6 h-screen">
            <h2 className="text-2xl font-semibold">Sorting Visualizer</h2>

            <ControlPanel play={play}
                pause={pause}
                setSpeed={setSpeed}
                isPlaying={isPlaying}
                array={array}
                setArray={setArray}
                setActive={setActive}
                generateArray={generateArray}
                setFoundIndex={setFoundIndex}
            />

            <ArrayBars array={array} active={active} foundIndex={foundIndex} />
        </div>
    );
}

export default Visualizer;