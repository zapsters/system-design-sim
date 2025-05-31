import { Handle, type NodeProps, Position } from "@xyflow/react";

import { ServerIcon } from "../images/images";
import { useDeletableNode } from "../hooks/useDeletableNode";
import { type ServerNode } from "./types";

// Array of user device/connection images that can be cycled through
export const serverImages = [
  {
    svg: <ServerIcon />,
    alt: "Server",
  },
];

export function ServerNode({ id }: NodeProps<ServerNode>) {
  const { DeleteButton } = useDeletableNode({ id });

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default user-node">
      <h1 className="title"></h1>
      <div className="NodeImageContainer">
        {serverImages.map((imageData, index) => (
          <div className="NodeImage" key={index}>
            {imageData.svg}
            <span
              style={{
                display: "inline-block",
                width: "fit",
                lineHeight: "1em",
                fontSize: "6px",
                flex: "right",
              }}>
              {imageData.alt}
            </span>
          </div>
        ))}
      </div>
      {/* Delete Button */}
      <DeleteButton />
      {/* Handles */}
      <Handle type="target" position={Position.Top} />
      <Handle type="source" position={Position.Bottom} />
    </div>
  );
}
