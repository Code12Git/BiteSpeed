import type { Node,Edge } from "@xyflow/react";

export interface NodeState {
    nodesData: Node[];
    edgesData: Edge[]; 
  }

  export interface NodePayload {
    nodeId?:string;
    id?: string;
    position?: { x: number; y: number };
    type?: string;
    data?: unknown;
    text?:string;
  }
  
  export type NodeProps = {
    data: {
      text:string
    };
    dragging: boolean;
    id: string;
    isClicked: boolean;
    measured: {
      width:256,
      height:82
    },
    position: {
      x:number,
      y:number
    },
    selected: boolean;
    type: "messageNode";
  };
  