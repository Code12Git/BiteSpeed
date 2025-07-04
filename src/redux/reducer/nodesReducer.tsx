import type { NodePayload } from "../../types";
import { ADD_EDGE, ADD_NODE, IS_NODE_CLICKED, UPDATE_NODE } from "../actionType/actionTypes";

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
      // We need to update the isClicked property of the node with the given id
      return {
        ...state,
        nodesData: updatedNodes,
      };
    }

    case ADD_NODE: {
      const { payload } = action;
      // We need to add the new node to the nodesData array
      return {
        ...state,
        nodesData: [...state.nodesData, payload],
      };
    }

    case UPDATE_NODE: {
      const { text, id } = action.payload;
      // We need to update the node data with the new text we are spreading the existing node data and updating the text property
      const updatedNodes = state.nodesData.map(node=>  node.id === id ? {...node,data:{...node.data,text}} : node )
      return {
        ...state,
        nodesData: updatedNodes,
        edgesData: [...state.edgesData],
      };
    }
    
    case ADD_EDGE: {
      // We need to add the new edge to the edgesData array
      return {
        ...state,
        edgesData: [...state.edgesData, action.payload],
      };
    }
    

    default:
      return state;
  }
};

export default nodesReducer;
