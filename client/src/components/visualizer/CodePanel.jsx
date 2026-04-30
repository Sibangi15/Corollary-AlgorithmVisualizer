// function CodePanel({ code, currentLine }) {
//     return (
//         <div className="w-full h-full rounded p-6 bg-slate-900/30 border border-slate-800/50 backdrop-blur-sm overflow-auto font-mono text-xs leading-relaxed">
//             <div className="space-y-1">
//                 {(code || []).map((line, index) => (
//                     <div
//                         key={index}
//                         className={`px-3 py-1 rounded transition-colors ${
//                             currentLine === index
//                                 ? "bg-amber-500/30 text-amber-200"
//                                 : "text-slate-400 hover:text-slate-300"
//                         }`}
//                     >
//                         <span className="inline-block w-5 text-slate-600 text-right mr-2 select-none">{index + 1}</span>
//                         <span className="break-all">{line}</span>
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default CodePanel;

function CodePanel({ code, currentLine }) {
    return (
        <div className="h-full overflow-auto font-mono text-[11px] text-slate-300">

            {code.map((line, i) => (
                <div
                    key={i}
                    className={`px-2 py-1 ${currentLine === i
                            ? "bg-amber-500/20 text-amber-300"
                            : ""
                        }`}
                >
                    <span className="text-slate-600 mr-2">{i + 1}</span>
                    {line}
                </div>
            ))}

        </div>
    );
}

export default CodePanel;