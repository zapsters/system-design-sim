import { type FC } from "react";
import {
  getBezierPath,
  EdgeLabelRenderer,
  BaseEdge,
  type EdgeProps,
  type Edge,
} from "@xyflow/react";

const LabeledEdge: FC<EdgeProps<Edge<{ label?: string; float?: string }>>> = ({
  id,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  data,
}) => {
  const [edgePath, labelX, labelY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
  });

  let transformValues = ["50%", "-50%"];
  let xShift = 0;
  if (data?.float === "left") {
    transformValues[0] = "-100%";
    xShift = -14;
  } else if (data?.float === "right") {
    transformValues[0] = "0%";
    xShift = 14;
  }

  return (
    <>
      <BaseEdge id={id} path={edgePath} />
      <EdgeLabelRenderer>
        <div
          style={{
            position: "absolute",
            transform: `translate(${transformValues[0]}, ${transformValues[1]}) translate(${labelX}px, ${labelY}px)  translate(${xShift}px, 0px)`,
            pointerEvents: "none",
            fontSize: "10px",
          }}
          className="edge-label-renderer__custom-edge nodrag nopan">
          {data?.label}
        </div>
      </EdgeLabelRenderer>
    </>
  );
};

export default LabeledEdge;
