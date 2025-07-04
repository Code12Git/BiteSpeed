import type { Dispatch } from "react";
import { IS_NODE_CLICKED } from "../actionType/actionTypes";

export const updateNode = (payload: { id: string; isClicked: boolean }) => (dispatch: Dispatch) => {
  dispatch({ type: IS_NODE_CLICKED, payload });
};
