import { useNavigate } from "react-router-dom";

function Home() {
    const navigate = useNavigate();

    return (
        <div className="min-h-screen bg-slate-950 text-slate-50">
            {/* Subtle background gradient */}
            <div className="fixed inset-0 bg-linear-to-br from-slate-900 via-slate-950 to-slate-950 pointer-events-none" />

            {/* Minimal decorative line */}
            <div className="fixed top-0 left-0 right-0 h-px bg-linear-to-r from-transparent via-slate-700 to-transparent opacity-30 pointer-events-none" />

            <div className="relative z-10">
                {/* Header Navigation */}
                <header className="border-b border-slate-800/50 backdrop-blur-sm">
                    <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
                        <h1 className="text-lg font-medium tracking-tight">Algorithm Visualizer</h1>
                        <button
                            onClick={() => navigate("/visualizer")}
                            className="text-sm px-4 py-2 text-slate-400 hover:text-slate-200 border border-slate-700/50 rounded hover:border-amber-400 transition-all"
                        >
                            Open
                        </button>
                    </div>
                </header>

                {/* Hero Section */}
                <section className="min-h-[calc(100vh-80px)] flex items-center px-6 py-20">
                    <div className="max-w-3xl mx-auto text-center">
                        <p className="text-sm uppercase tracking-widest text-slate-500 mb-6">Interactive Learning Tool</p>

                        <h2 className="text-5xl md:text-6xl font-light mb-6 leading-tight">
                            Understand algorithms through visualization
                        </h2>

                        <p className="text-lg text-slate-400 mb-12 max-w-2xl mx-auto leading-relaxed">
                            Watch sorting, searching, and graph algorithms execute step by step. Learn how they work through interactive exploration.
                        </p>

                        <button
                            onClick={() => navigate("/visualizer")}
                            className="px-8 py-3 bg-slate-100 text-slate-950 font-medium rounded hover:bg-slate-200 transition-colors"
                        >
                            Start Exploring
                        </button>
                    </div>
                </section>

                {/* Features Section */}
                <section className="px-6 py-24 border-t border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                            {/* Feature 1 */}
                            <div>
                                <h3 className="text-sm font-medium tracking-widest text-slate-400 mb-3">INTERACTIVE</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Step through each execution. See exactly what happens at every stage of the algorithm.
                                </p>
                            </div>

                            {/* Feature 2 */}
                            <div>
                                <h3 className="text-sm font-medium tracking-widest text-slate-400 mb-3">COMPREHENSIVE</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    Multiple sorting, searching, and graph algorithms all in one place.
                                </p>
                            </div>

                            {/* Feature 3 */}
                            <div>
                                <h3 className="text-sm font-medium tracking-widest text-slate-400 mb-3">VISUAL</h3>
                                <p className="text-slate-300 leading-relaxed">
                                    See pseudocode and visualization side-by-side for complete understanding.
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Algorithms Overview */}
                <section className="px-6 py-24 border-t border-slate-800/50">
                    <div className="max-w-6xl mx-auto">
                        <h3 className="text-2xl font-light mb-16">What You Can Explore</h3>

                        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                            <div className="p-8 border border-slate-800/50 rounded bg-slate-900/30 backdrop-blur-sm">
                                <h4 className="font-medium mb-4">Sorting Algorithms</h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>Bubble Sort</li>
                                    <li>Selection Sort</li>
                                    <li>Insertion Sort</li>
                                    <li>Merge Sort</li>
                                    <li>Quick Sort</li>
                                </ul>
                            </div>

                            <div className="p-8 border border-slate-800/50 rounded bg-slate-900/30 backdrop-blur-sm">
                                <h4 className="font-medium mb-4">Search Algorithms</h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>Linear Search</li>
                                    <li>Binary Search</li>
                                </ul>
                            </div>

                            <div className="p-8 border border-slate-800/50 rounded bg-slate-900/30 backdrop-blur-sm">
                                <h4 className="font-medium mb-4">Graph Algorithms</h4>
                                <ul className="text-sm text-slate-400 space-y-2">
                                    <li>Breadth-First Search</li>
                                    <li>Depth-First Search</li>
                                    <li>Dijkstra's Algorithm</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Footer */}
                <footer className="border-t border-slate-800/50 px-6 py-12">
                    <div className="max-w-6xl mx-auto">
                        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8 mb-12">
                            <div className="max-w-sm">
                                <p className="text-sm text-slate-400">
                                    An educational tool designed to make algorithms more intuitive and accessible through interactive visualization.
                                </p>
                            </div>
                            <button
                                onClick={() => navigate("/visualizer")}
                                className="text-sm px-6 py-2 text-slate-100 border border-slate-600 rounded hover:border-amber-400 hover:bg-slate-800/50 transition-all"
                            >
                                Go to Visualizer
                            </button>
                        </div>
                        <div className="border-t border-slate-800/50 pt-8 text-xs text-slate-500 flex flex-col md:flex-row justify-between items-center gap-4">
                            <p className="text-center text-sm text-white/60">
                                © 2026 Algorithm Visualizer. All Rights Reserved.
                                <i>
                                    {" "}Designed & Developed by{" "}
                                    <a href="https://sibangi-portfolio-website.netlify.app/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white transition-colors">
                                        Sibangi Chakraborty
                                    </a>.
                                </i>
                            </p>
                        </div>
                    </div>
                </footer>
            </div>
        </div>
    );
}

export default Home;