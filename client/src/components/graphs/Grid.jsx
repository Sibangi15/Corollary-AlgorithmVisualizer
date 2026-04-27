import Node from "./Node";

function Grid({ grid, handleCellClick }) {
    return (
        <div className="inline-block">
            {grid.map((row, rIdx) => (
                <div key={rIdx} className="flex">
                    {row.map((node, cIdx) => (
                        <Node
                            key={cIdx}
                            node={node}
                            onClick={handleCellClick}
                        />
                    ))}
                </div>
            ))}
        </div>
    );
}

export default Grid;