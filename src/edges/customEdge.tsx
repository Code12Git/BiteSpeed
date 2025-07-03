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
    console.log(sourceX,sourceY,targetX,targetY)
    const [edgePath, labelX, labelY] = getBezierPath({
        sourceX,
        sourceY,
        targetX,
        targetY,
      });
    return (
      <>
        {/* Arrow marker definition */}

  
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
  