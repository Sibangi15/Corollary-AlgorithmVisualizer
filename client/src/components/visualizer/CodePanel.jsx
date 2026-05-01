function CodePanel({ code, currentLine }) {
    return (
        <div className="h-full overflow-auto font-mono text-[11px] text-[#bc9891]">

            {code.map((line, i) => (
                <div
                    key={i}
                    className={`px-2 py-1 ${currentLine === i
                        ? "bg-[#e57744]/20 text-[#e57744]"
                        : ""
                        }`}
                >
                    <span className="text-[#09b7b4]/50 mr-2">{i + 1}</span>
                    {line}
                </div>
            ))}

        </div>
    );
}

export default CodePanel;