function CodePanel({ code, currentLine }) {
    return (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 w-full h-100 overflow-auto">
            {code.map((line, index) => (
                <div
                    key={index}
                    className={`px-2 py-1 rounded text-sm font-mono
            ${currentLine === index ? "bg-yellow-600" : ""}`}
                >
                    {line}
                </div>
            ))}
        </div>
    );
}

export default CodePanel;