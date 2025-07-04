import { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, Controls, useEdgesState, type Connection, type NodeTypes, type EdgeTypes, Background, useReactFlow, type NodeProps } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import MessagePanel from './panels/MessagePanel';
import MessageNode from './node/MessageNode';
import CustomEdge from './edges/customEdge';
import SettingsPanel from './panels/SettingsPanel';
import { nodeCreation,  updateNodeData } from './redux/action/nodeAction';
import Navbar from './base/Navbar';

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
  const [selectedNode, setSelectedNode] = useState<NodeProps | null>(null);
  const dispatch = useAppDispatch();
  const reactFlowInstance = useReactFlow();

  console.log(nodesData)

  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData);
  }, []); 
  

  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `e${params.source}-${params.target}`, type: 'customEdge' };
      setEdges((eds) => {
        const updated = [...eds, newEdge];
        return updated;
      });
    },
    [setEdges]
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
        isClicked: false
      };
      console.log(newNode)
      setNodes((nds) => nds.concat(newNode));
      dispatch(nodeCreation(newNode))
    },
    [reactFlowInstance, setNodes]
  );

  const onNodeClick = useCallback(
    (event: React.MouseEvent, node: NodeProps) => {
      setSelectedNode(node);
    },
    []
  );

  const onSavedflow = () => {
    if (selectedNode) {
      const id = selectedNode.id;
      const text = selectedNode.data?.text || "Default";
      dispatch(updateNodeData(text, id));
    }
  };
  console.log(selectedNode?.data)
  

  return (
    <>
      <Navbar onSaveFlow={onSavedflow}  />
      <div style={{ display: 'flex', height: '80vh' }}>
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
        {selectedNode ? <SettingsPanel node={selectedNode} onMessageChange={onSavedflow} /> : <MessagePanel />}
      </div>
    </>
  );
}