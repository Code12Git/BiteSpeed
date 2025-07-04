import { useCallback, useEffect, useState } from 'react';
import { ReactFlow, useNodesState, Controls, useEdgesState, type Connection, type NodeTypes, type EdgeTypes, Background, useReactFlow, type Node } from '@xyflow/react';
import '@xyflow/react/dist/style.css';
import { useAppDispatch, useAppSelector } from './hooks/hooks';
import MessagePanel from './panels/MessagePanel';
import MessageNode from './node/MessageNode';
import CustomEdge from './edges/customEdge';
import SettingsPanel from './panels/SettingsPanel';
import { addEdge, nodeCreation, updateNodeData } from './redux/action/nodeAction';
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
  const [selectedNode, setSelectedNode] = useState<(Node & { data: { text: string } }) | null>(null);
  const [selectedNodeText, setSelectedNodeText] = useState<string>('');
  const dispatch = useAppDispatch();
  const reactFlowInstance = useReactFlow();



  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData);
  }, [nodesData, edgesData, setEdges, setNodes]);



  useEffect(() => {
    if (selectedNode) {
      const updatedNode = nodes.find(n => n.id === selectedNode.id) as (Node & { data: { text: string } }) | undefined;
      if (updatedNode) {
        setSelectedNode(updatedNode);
        setSelectedNodeText(updatedNode.data.text || '');
      }
    }
  }, [nodes, selectedNode]);







  // We are using redux for storing the edges  because we want to sync the Redux edge state to React Flow.
  const onConnect = useCallback(
    (params: Connection) => {
      const newEdge = { ...params, id: `e${params.source}-${params.target}`, type: 'customEdge' };
      dispatch(addEdge(newEdge));
    },
    [dispatch]
  );



  // We are using useCallback to memoize the onDragOver and onDrop functions

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
      // We are creating a new node with the type and position and isClicked set to false
      const newNode = {
        id: `${Date.now()}`,
        type,
        position,
        data: { text: `textNode` },
        isClicked: false
      };
      dispatch(nodeCreation(newNode))
    },
    [reactFlowInstance, dispatch]
  );

  const onNodeClick = useCallback(
    (_event: React.MouseEvent, node: Node) => {
      setSelectedNode(node as Node & { data: { text: string } });
    },
    []
  );


  // We are lifting the state up to edit the text of the node in the settings panel
  const onMessageChange = (text: string) => {
    setSelectedNodeText(text);
  };
  
  const nodesWithoutTarget = nodes.filter(node => 
    edges.every(edge =>  edge.target !== node.id)
  );
    const onSavedflow = useCallback(() => {
    if (selectedNode) {
      dispatch(updateNodeData(selectedNodeText, selectedNode.id));
    }
  }, [selectedNode, selectedNodeText, dispatch]);


  return (
    <>
      <Navbar nodesWithoutTarget={nodesWithoutTarget} nodes={nodes}  onSaveFlow={onSavedflow} />
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
        {selectedNode ? <SettingsPanel node={selectedNode}
          message={selectedNodeText}
          onMessageChange={onMessageChange}
        /> : <MessagePanel />}
      </div>
    </>
  );
}