// import { useState } from "react";

// function ArrayBars({ array, active, foundIndex }) {
//     const [hoveredIndex, setHoveredIndex] = useState(null);
//     return (
//         <div className="w-full h-full flex items-end justify-center gap-1 border border-slate-800/50 rounded p-6 bg-slate-900/30 backdrop-blur-sm overflow-auto">
//             {array.map((value, index) => {
//                 let bgColor = "bg-slate-700";
//                 let opacity = "opacity-80";
//                 let shadow = "shadow-none";

//                 if (foundIndex === index) {
//                     bgColor = "bg-emerald-400";
//                     opacity = "opacity-100";
//                     shadow = "shadow-[0_0_20px_rgba(52,211,153,0.18)]";
//                 } else if (active.includes(index)) {
//                     bgColor = "bg-sky-500";
//                     opacity = "opacity-100";
//                     shadow = "shadow-[0_0_20px_rgba(56,189,248,0.16)]";
//                 }

//                 return (
//                     <div key={index} className="relative flex-1 min-w-0.5">
//                         <div
//                             className={`absolute -top-8 left-1/2 transform -translate-x-1/2 rounded-md px-2 py-1 text-[10px] font-medium text-slate-100 bg-slate-950/95 border border-slate-700 shadow-sm transition-opacity duration-150 ${
//                                 hoveredIndex === index ? "opacity-100" : "opacity-0"
//                             }`}
//                             style={{ pointerEvents: "none" }}
//                         >
//                             {value}
//                         </div>
//                         <div
//                             onMouseEnter={() => setHoveredIndex(index)}
//                             onMouseLeave={() => setHoveredIndex(null)}
//                             className={`h-full rounded-t transition-all duration-150 ${bgColor} ${opacity} ${shadow} hover:opacity-100`}
//                             style={{ height: `${value}px` }}
//                         />
//                     </div>
//                 );
//             })}
//         </div>
//     );
// }

// export default ArrayBars;

// function ArrayBars({ array, active, foundIndex }) {
//     return (
//         <div className="flex items-end justify-center h-full gap-2">

//             {array.map((v, i) => {

//                 let style = "bg-gradient-to-t from-[#2a2f3a] to-[#6b7280]";

//                 if (active.includes(i)) {
//                     style = "bg-gradient-to-t from-amber-500 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.5)]";
//                 }

//                 if (foundIndex === i) {
//                     style = "bg-gradient-to-t from-green-500 to-green-200";
//                 }

//                 return (
//                     <div
//                         key={i}
//                         style={{ height: `${v}px` }}
//                         className={`w-3 rounded ${style} transition-all`}
//                     />
//                 );
//             })}
//         </div>
//     );
// }

// export default ArrayBars;

import { useState } from "react";

function ArrayBars({ array, active, foundIndex }) {
    const [hovered, setHovered] = useState(null);
    const barWidth = Math.max(4, Math.floor(600 / array.length));
    return (
        <div className="w-full h-full flex items-end justify-center overflow-hidden px-2">

            <div className="flex items-end justify-center h-full"
                style={{ gap: `${Math.max(2, 12 / array.length)}px` }}>

                {array.map((v, i) => {

                    let style = "bg-gradient-to-t from-[#2a2f3a] to-[#6b7280]";

                    if (active.includes(i)) {
                        style = "bg-gradient-to-t from-amber-500 to-amber-200 shadow-[0_0_20px_rgba(251,191,36,0.5)]";
                    }

                    if (foundIndex === i) {
                        style = "bg-gradient-to-t from-green-500 to-green-200";
                    }

                    return (
                        <div
                            key={i}
                            className="relative flex flex-col items-center justify-end"
                            onMouseEnter={() => setHovered(i)}
                            onMouseLeave={() => setHovered(null)}
                        >
                            {/* Tooltip */}
                            <div
                                className={`absolute -top-7 text-[11px] px-2 py-0.5 rounded-md border border-[#2a3142] bg-[#0b0f17] text-slate-300 transition-all duration-150 ${hovered === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
                                    }`}
                            >
                                {v}
                            </div>

                            {/* Bar */}
                            <div
                                style={{
                                    height: `${v}px`,
                                    width: `${barWidth}px`,
                                }}
                                className={`
                                    ${style}
                                    transition-all duration-200
                                    hover:scale-[1.05]
                                    rounded-xs
                                `}
                            />
                        </div>
                    );
                })}
            </div>
        </div>
    );
}

export default ArrayBars;