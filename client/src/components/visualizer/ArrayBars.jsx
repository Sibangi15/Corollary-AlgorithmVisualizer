import { useState } from "react";

function ArrayBars({ array, active, foundIndex }) {
    const [hovered, setHovered] = useState(null);
    const barWidth = Math.max(4, Math.floor(600 / array.length));
    return (
        <div className="w-full h-full flex items-end justify-center overflow-hidden px-2">

            <div className="flex items-end justify-center h-full"
                style={{ gap: `${Math.max(2, 12 / array.length)}px` }}>

                {array.map((v, i) => {

                    let style = "bg-linear-to-t from-[#e57744] to-[#ac4b3e] ";

                    if (active.includes(i)) {
                        style = "bg-linear-to-t from-[#bc9891] to-[#bc9891] shadow-[0_0_20px_rgba(9,183,180,0.5)]";
                    }

                    if (foundIndex === i) {
                        style = "bg-linear-to-t from-[#09b7b4] to-[#09b7b4]";
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
                                className={`absolute -top-7 text-[11px] px-2 py-0.5 rounded-md border border-[#09b7b4]/30 bg-[#143542] text-[#bc9891] transition-all duration-150 ${hovered === i ? "opacity-100 translate-y-0" : "opacity-0 translate-y-1"
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