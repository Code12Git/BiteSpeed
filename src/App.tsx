import { useCallback, useEffect } from 'react';
import { ReactFlow, useNodesState,Controls, useEdgesState, addEdge, type Connection, type NodeTypes, type EdgeTypes, Background, applyNodeChanges, applyEdgeChanges } from '@xyflow/react';
 
import '@xyflow/react/dist/style.css';
import { useAppSelector } from './hooks/hooks';
import MessagePanel from './panels/MessagePanel';
import MessageNode from './node/MessageNode';
import CustomEdge from './edges/customEdge';
 
const nodeTypes:NodeTypes = {
  messageNode:MessageNode
}

const edgeTypes:EdgeTypes={
  customEdge:CustomEdge
}

 
export default function App() {
  const {nodesData,edgesData} = useAppSelector(state => state.nodes)
  const [nodes, setNodes, onNodesChange] = useNodesState(nodesData);
  const [edges, setEdges, onEdgesChange] = useEdgesState(edgesData);
 
  useEffect(() => {
    setNodes(nodesData);
    setEdges(edgesData)
  }, [nodesData,setNodes,setEdges,edgesData]);

  const onConnect = useCallback(
    (params:Connection) => setEdges((eds) => addEdge(params, eds)),
    [setEdges],
  );
 
  console.log("Nodes:",nodes,"Edges:",edges)

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
      >      
              <Background />

      <Controls />
      </ReactFlow>
      </div>
         <MessagePanel />
     </div>
  );
}