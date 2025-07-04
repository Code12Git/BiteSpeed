import {
    BaseEdge,
     getBezierPath,
     type EdgeProps,
  } from '@xyflow/react';
  
  export default function CustomEdge({
    id,
    sourceX,
    sourceY,
    targetX,
    targetY,
    markerEnd,
    markerStart,
    style,
    interactionWidth,
  }: EdgeProps) {
    const [edgePath] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
    return (
      <>
        <BaseEdge
         id={id}
         path={edgePath}
         style={style as React.CSSProperties | undefined}
         markerEnd={markerEnd}
         markerStart={markerStart}
         interactionWidth={interactionWidth}
        />
      </>
    );
  }
  