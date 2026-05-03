function Node({ node, onClick, onWeightChange }) {

    let base = "bg-[#143542]";

    if (node.isWall) base = "bg-[#00030a]";
    if (node.isVisited) base = "bg-[#09b7b4]";
    if (node.isPath) base = "bg-[#e57744]";
    if (node.isStart) base = "bg-[#ac4b3e]";
    if (node.isEnd) base = "bg-[#bc9891]";

    return (
        <div
            onClick={() => onClick(node.row, node.col)}
            onContextMenu={(e) => {
                e.preventDefault();
                onWeightChange(node.row, node.col);
            }}
            className={`w-5 h-5 ${base} border border-[#09b7b4]/20`}
        />
    );
}

export default Node;