import type { NodePayload } from "../../types";

const nodeState = {
  nodesData: [  { id: '1', position: { x: 0, y: 0 }, type:'messageNode' },
    { id: '2', position: { x: 100, y: 0 }, type:'messageNode' }
],
  edgesData: [{ id: 'e1-2', source: '1', target: '2',type:'customEdge' }],
};

const nodesReducer = (
  state = nodeState , action: { type: string; payload: NodePayload }) => { return state };

export default nodesReducer;
