# 💬 BiteSpeed Frontend Task: Chatbot Flow Builder

This project is a simple yet extensible **Chatbot Flow Builder** built using **React** and **React Flow**. It allows users to create conversational flows by adding, connecting, and updating message nodes visually.

## 🚀  Live Demo

🔗 [Click here to view the deployed app](https://bite-speed-topaz.vercel.app/)

---

## 📁 Project Overview

A chatbot flow is a sequence of message nodes connected to determine the order of message delivery. This flow builder supports drag-and-drop node creation, customizable message text, and flow validation on save.

---

## 🛠️ Tech Stack

- ⚛️ React (Functional Components & Hooks)
- 🔀 Redux (for state management)
- 🧠 [React Flow](https://reactflow.dev/) (for building flow diagrams)
- 🎨 Tailwind CSS (for styling)
- 🧪 TypeScript (strict type checking)

---

## 🔧 Features

### ✅ Text Node
- Only **Text Message Nodes** are currently supported.
- Can be added via **drag and drop** from the Nodes Panel.
- Each node holds editable **text content**.

### ✅ Nodes Panel
- Displays all available node types.
- Currently includes only `Message Node` but designed for future extensibility.

### ✅ Edges
- Visual connections between nodes.
- Represents the **flow of conversation**.

### ✅ Source Handle
- Can initiate only **one edge** from each source.

### ✅ Target Handle
- Can **accept multiple** incoming edges.

### ✅ Settings Panel
- Replaces the Nodes Panel when a node is selected.
- Allows editing the text of the selected node.

### ✅ Save Button & Validation
- **Validates the flow before saving.**
- ✅ Save is allowed when:
  - There's only **one** unconnected node (considering the starting point).
- ❌ Save is blocked when:
  - There are **more than one unconnected nodes** (i.e., nodes without incoming edges).
  - There is at least one node in the flow.
- Displays success or error using `toast` notifications.

---

## 🧠 Project Structure

```
src/
├── base/
│ └── Navbar.tsx # Save button & validation logic
├── hooks/
│ └── hooks.ts # Typed redux hooks
├── node/
│ └── MessageNode.tsx # Custom node UI
├── panels/
│ ├── MessagePanel.tsx # Default panel
│ └── SettingsPanel.tsx # Node editing panel
├── edges/
│ └── customEdge.tsx # Edge customization
├── redux/
│   ├── action/ # Action creators (addNode, updateNode, etc.)
│   ├── actionType/ # Action type constants (e.g. ADD_NODE, ADD_EDGE)
│   ├── reducer/ # Nodes reducer logic
│   └── store.ts 
├── App.tsx # Main component
└── main.tsx # App entry point

```

## 🧪 Validation Logic

The following condition is enforced on save:

```ts
if (nodes.length > 1 && nodesWithoutTarget.length > 1) {
  toast.error("Cannot save flow. Multiple nodes are unconnected!");
  return;
}
```
This ensures the flow has a single valid entry point.
## 💻 Running Locally

```bash
Copy
Edit
git clone https://github.com/your-username/bitespeed-chatbot-flow.git
cd bitespeed-chatbot-flow
npm install
npm run dev
```
## 📦 Deployment
The app is deployed on Vercel and the repo is hosted on GitHub.

🔗 Live Link: https://bite-speed-topaz.vercel.app/

🔗 GitHub Repo: https://github.com/Code12Git/BiteSpeed


## 📄 License
This project is created for evaluation purposes for the BiteSpeed Frontend Assignment.

If you have any questions or issues, feel free to reach out via GitHub issues.
