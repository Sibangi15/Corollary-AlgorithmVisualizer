import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="flex flex-col items-center justify-center h-screen gap-6">
            <h1 className="text-4xl font-bold">
                Algorithm Visualizer
            </h1>

            <button
                onClick={() => navigate("/visualizer")}
                className="px-6 py-3 bg-blue-500 rounded-lg hover:bg-blue-600"
            >
                Start Visualizing
            </button>
        </div>
    );
}

export default Home;