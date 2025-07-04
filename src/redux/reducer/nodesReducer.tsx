import type { NodePayload } from "../../types";
import { IS_NODE_CLICKED } from "../actionType/actionTypes";

const nodeState = {
  nodesData: [
    { id: '1', position: { x: 0, y: 0 }, type: 'messageNode', data: { text: 'text message 1' }, isClicked: false },
    { id: '2', position: { x: 100, y: 0 }, type: 'messageNode', data: { text: 'text message 2' }, isClicked: false }
  ],
  edgesData: [
    { id: 'e1-2', source: '1', target: '2', type: 'customEdge' }
  ],
};

const nodesReducer = (
  state = nodeState,
  action: { type: string; payload: NodePayload }
) => {
  switch (action.type) {
    case IS_NODE_CLICKED: {
      const updatedNodes = state.nodesData.map(node =>
        node.id === action.payload.id
          ? { ...node, isClicked: !node.isClicked }
          : { ...node, isClicked: false }
      );
      return {
        ...state,
        nodesData: updatedNodes,
      };
    }

    default:
      return state;
  }
};

export default nodesReducer;
