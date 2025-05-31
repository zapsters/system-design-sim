import { type NodeProps, Position } from "@xyflow/react";

import { DesktopIcon, PhoneIcon } from "../images/images";
import { NodeHandle, type UserNode } from "./types";
import { useNodeHandles } from "../hooks/useNodeHandles";
import { useDeletableNode } from "../hooks/useDeletableNode";

// Array of user device/connection images that can be cycled through
export const userImages = [
  {
    svg: <DesktopIcon />,
    alt: "Desktop User",
  },
  {
    svg: <PhoneIcon />,
    alt: "Mobile User",
  },
];

const handleData = [
  {
    type: "source",
    position: Position.Bottom,
    offset: "-17%",
    id: "WebApp",
    edgeType: "labeled",
    label: "Web Requests",
    float: "left",
    animated: true,
  },
  {
    type: "source",
    position: Position.Bottom,
    offset: "17%",
    id: "MobileApp",
    edgeType: "labeled",
    label: "Mobile Services",
    float: "right",
    animated: true,
  },
] satisfies NodeHandle[];

export function UserNode({ id, data }: NodeProps<UserNode>) {
  data.handles = handleData;
  const { renderHandles } = useNodeHandles({ handles: data.handles });
  const { DeleteButton } = useDeletableNode({ id });

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default user-node">
      <h1 className="title">Users</h1>
      <div className="NodeImageContainer">
        {userImages.map((imageData, index) => (
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
      {renderHandles(handleData)}
    </div>
  );
}
