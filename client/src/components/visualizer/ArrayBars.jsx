function ArrayBars({ array, active, foundIndex }) {
    return (
        <div className="flex items-end justify-center h-100 gap-2 border border-gray-700 rounded-lg p-4">
            {array.map((value, index) => {
                let color = "bg-blue-500";

                if (foundIndex === index) {
                    color = "bg-green-500"; // FOUND
                } else if (active.includes(index)) {
                    color = "bg-yellow-500"; // CURRENT
                }

                return (
                    <div
                        key={index}
                        className={`w-8 rounded-t transition-all duration-200 ${color}`}
                        style={{ height: `${value}px` }}
                    ></div>
                );
            })}
        </div>
    );
}

export default ArrayBars;