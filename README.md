# ⚡ Corollary — Algorithm Visualizer

An interactive **Algorithm Visualizer** built using the **MERN stack + React + Tailwind CSS**, designed to help users understand how algorithms work through real-time animations, pseudocode synchronization, and performance insights.

---

## 🚀 Live Demo

> *(Will be added shortly)*

---

## 📌 Features

### 🔢 Sorting Algorithms

* Bubble Sort
* Selection Sort
* Insertion Sort
* Merge Sort
* Quick Sort

### 🔍 Searching Algorithms

* Linear Search
* Binary Search

### 🌐 Graph Algorithms

* Breadth First Search (BFS)
* Depth First Search (DFS)
* Dijkstra’s Algorithm (Weighted Graph)

---

## 🎯 Key Highlights (Resume Boosters)

* 🎬 **Step-based Animation Engine**

  * Custom `useAnimation` hook
  * Smooth async execution using `await sleep()`

* 🧠 **Pseudocode Synchronization**

  * Real-time line highlighting during execution

* ⚡ **Execution Timeline (Scrubber)**

  * Jump to any step in the algorithm

* 📊 **Complexity Display**

  * Time & space complexity shown dynamically

* 🗂️ **Session History (MERN Integration)**

  * Stores:

    * Algorithm used
    * Input size
    * Step count
    * Execution time

* 🎨 **Interactive UI**

  * Dynamic array generation
  * Adjustable speed & size
  * Graph grid with walls & weights
  * Responsive design

---

## 🏗️ Tech Stack

### Frontend

* React (Vite)
* Tailwind CSS
* Custom Hooks

### Backend

* Node.js
* Express.js
* MongoDB Atlas

---

## 🧩 Core Architecture

### 🔹 Step-Based Execution Model

All algorithms return **steps instead of direct UI updates**:

```js
{ type: "compare", i: 1, j: 2 }
{ type: "swap", i: 1, j: 2 }
{ type: "visit_node", row: 3, col: 5 }
```

These steps are consumed by the animation engine.

---

### 🔹 Animation Engine

Custom hook:

```js
useAnimation()
```

Handles:

* Play / Pause
* Speed control
* Timeline scrubbing
* Step execution

---

### 🔹 Graph System

Each node contains:

```js
{
  row,
  col,
  isStart,
  isEnd,
  isWall,
  isVisited,
  isPath,
  weight
}
```

---

## 📸 Screenshots

> *(Screenshots will be added shortly)*

---

## 📈 Future Improvements

* A* Algorithm
* Maze Generation
* Drag & drop start/end nodes
* Code editor integration
* Multi-algorithm comparison mode

---

## 🤝 Contributing

Contributions are welcome! Feel free to fork this repo and submit a PR.

---

## 📜 License

This project is open-source and available under the MIT License.

---

## 👨‍💻 Author

**Sibangi Chakraborty**

* GitHub: https://github.com/Sibangi15
* LinkedIn: https://linkedin.com/in/sibangi-chakraborty-1162ab380

---

## ⭐ If you like this project

Give it a star ⭐ — it helps a lot!
