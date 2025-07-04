import type { Dispatch } from "react";
import { ADD_NODE, IS_NODE_CLICKED, UPDATE_NODE } from "../actionType/actionTypes";
import type { Node } from "@xyflow/react";

export const updateNode = (payload: { id: string; isClicked: boolean }) => (dispatch: Dispatch<{ type: string; payload: { id: string; isClicked: boolean } }>) => {
  dispatch({ type: IS_NODE_CLICKED, payload });
};

export const nodeCreation = (payload: Node) => (dispatch: Dispatch<{ type: string; payload: Node }>) => {
  dispatch({ type: ADD_NODE, payload });
}

export const updateNodeData = (text: string, id: string) => (dispatch: Dispatch<{ type: string; payload: {text:string,id:string} }>) => {
  dispatch({
    type: UPDATE_NODE,
    payload: { text, id },
  });
};