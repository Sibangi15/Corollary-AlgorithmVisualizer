function Node({ node, onClick }) {
    let baseColor = "bg-gray-800";

    if (node.isStart) baseColor = "bg-green-500";
    else if (node.isEnd) baseColor = "bg-red-500";
    else if (node.isWall) baseColor = "bg-gray-500";
    else if (node.isPath) baseColor = "bg-yellow-400";
    else if (node.isVisited) baseColor = "bg-blue-400";

    return (
        <div
            onClick={() => onClick(node.row, node.col)}
            className={`w-6 h-6 border border-gray-700 ${baseColor} transition`}
        />
    );
}

export default Node;