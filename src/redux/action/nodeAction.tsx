import type { Dispatch } from "react";
import { ADD_EDGE, ADD_NODE, IS_NODE_CLICKED, UPDATE_NODE } from "../actionType/actionTypes";
import type { Edge, Node } from "@xyflow/react";



// This action creator is used to update the clicked state of a node
export const updateNode = (payload: { id: string; isClicked: boolean }) => (dispatch: Dispatch<{ type: string; payload: { id: string; isClicked: boolean } }>) => {
  dispatch({ type: IS_NODE_CLICKED, payload });
};

// This action creator is used to create a new node and add it to the Redux store
export const nodeCreation = (payload: Node) => (dispatch: Dispatch<{ type: string; payload: Node }>) => {
  dispatch({ type: ADD_NODE, payload });
}

// This action creator is used to update the data of a node, such as its text content
export const updateNodeData = (text: string, id: string) => (dispatch: Dispatch<{ type: string; payload: {text:string,id:string} }>) => {
  dispatch({
    type: UPDATE_NODE,
    payload: { text, id },
  });
};

// This action creator is used to add a new edge to the Redux store
export const addEdge = (edge:Edge) => (dispatch:Dispatch<{ type: string; payload: Edge }>) => {
  dispatch({ type: ADD_EDGE, payload: edge });
};
