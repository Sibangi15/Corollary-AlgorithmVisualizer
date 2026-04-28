import Node from "./Node";

function Grid({ grid, handleCellClick, handleWeightChange }) {
    return (
        <div className="inline-block">
            {grid.map((row, rIdx) => (
                <div key={rIdx} className="flex">
                    {row.map((node, cIdx) => (
                        <Node
                            key={cIdx}
                            node={node}
                            onClick={handleCellClick}
                            onWeightChange={handleWeightChange}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;