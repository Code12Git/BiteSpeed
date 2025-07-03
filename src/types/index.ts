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
    originalNodeId?:string;
    hours?: number;
    minutes?: number;
      subject?: string;
      recipient?: string;
      body?:string;
  }
  