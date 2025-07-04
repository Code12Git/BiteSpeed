import { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, Controls, useEdgesState, addEdge, type Connection, type NodeTypes, type EdgeTypes, Background, useReactFlow } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppSelector } from './hooks/hooks';
import MessagePanel from './panels/MessagePanel';
import MessageNode from './node/MessageNode';
import CustomEdge from './edges/customEdge';
import SettingsPanel from './panels/SettingsPanel';

const nodeTypes: NodeTypes = {
  messageNode: MessageNode
};

const edgeTypes: EdgeTypes = {
  customEdge: CustomEdge
};

export default function App() {
  const { nodesData, edgesData } = useAppSelector(state => state.nodes);
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);
  const [selectedNode, setSelectedNode] = useState<Node | null>(null);

  const reactFlowInstance = useReactFlow();

  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData);
  }, [nodesData, setNodes, setEdges, edgesData]);

  const onConnect = useCallback(
    (params: Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );

  const onDragOver = useCallback((event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.dataTransfer.dropEffect = 'move';
  }, []);

  const onDrop = useCallback(
    (event: React.DragEvent<HTMLDivElement>) => {
      event.preventDefault();

      const type = event.dataTransfer.getData('application/reactflow');
      if (typeof type === 'undefined' || !type) return;

      const position = reactFlowInstance.screenToFlowPosition({
        x: event.clientX,
        y: event.clientY,
      });

      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: { text: `textNode` },
      };

      setNodes((nds) => nds.concat(newNode));
    },
    [reactFlowInstance, setNodes]
  );
  
  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: Node) => {
      setSelectedNode(node);
    },
    []
  );


  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{ flex: 1, background: 'white' }}>
        <ReactFlow
          nodes={nodes}
          edges={edges}
          nodeTypes={nodeTypes}
          edgeTypes={edgeTypes}
          onNodesChange={onNodesChange}
          onEdgesChange={onEdgesChange}
          onConnect={onConnect}
          onDragOver={onDragOver}
          onDrop={onDrop}
          onNodeClick={onNodeClick}
        >
          <Background />
          <Controls />
        </ReactFlow>
      </div>
      {selectedNode ? <SettingsPanel node={selectedNode} /> : <MessagePanel />}
    </div>
  );
}