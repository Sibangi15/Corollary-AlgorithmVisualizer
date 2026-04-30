// function Node({ node, onClick, onWeightChange }) {
//     let bgColor = "bg-slate-700";
//     let ring = "ring-0";

//     if (node.isStart) {
//         bgColor = "bg-emerald-400";
//         ring = "ring-2 ring-emerald-400/30";
//     } else if (node.isEnd) {
//         bgColor = "bg-rose-500";
//         ring = "ring-2 ring-rose-500/30";
//     } else if (node.isWall) {
//         bgColor = "bg-slate-600";
//     } else if (node.isPath) {
//         bgColor = "bg-amber-400";
//         ring = "ring-2 ring-amber-400/30";
//     } else if (node.isVisited) {
//         bgColor = "bg-sky-500";
//         ring = "ring-2 ring-sky-500/20";
//     }

//     return (
//         <div
//             onClick={() => onClick(node.row, node.col)}
//             onContextMenu={(e) => {
//                 e.preventDefault();
//                 onWeightChange(node.row, node.col);
//             }}
//             className={`w-6 h-6 border border-slate-700/50 ${bgColor} ${ring} flex items-center justify-center text-xs font-semibold text-white transition-all duration-100 cursor-pointer hover:opacity-80`}
//         >
//             {node.weight > 1 && node.weight}
//         </div>
//     );
// }

function Node({ node, onClick, onWeightChange }) {

    let base = "bg-[#1e2533]";

    if (node.isWall) base = "bg-[#0a0d14]";
    if (node.isVisited) base = "bg-[#ffedab]";
    if (node.isPath) base = "bg-[#026f90]";
    if (node.isStart) base = "bg-[#476815]";
    if (node.isEnd) base = "bg-[#75070c]";

    return (
        <div
            onClick={() => onClick(node.row, node.col)}
            onContextMenu={(e) => {
                e.preventDefault();
                onWeightChange(node.row, node.col);
            }}
            className={`w-5 h-5 ${base} border border-[#111827]`}
        />
    );
}

export default Node;