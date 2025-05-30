import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { DeletableNode } from "./DeletableNode";
import { AppNode } from "./types";
import { DesktopIcon, PhoneIcon, ServerIcon } from "../images/images.tsx";
import { Position } from "@xyflow/react";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "deletable-node",
    position: { x: 0, y: 0 },
    data: {
      label: "Users",
      images: [
        {
          svg: <DesktopIcon style={{ height: "25px" }} />,
          alt: "Web App",
        },
        {
          svg: <PhoneIcon style={{ height: "25px" }} />,
          alt: "Mobile App",
        },
      ],
      handles: [
        {
          type: "source",
          position: Position.Bottom,
          offset: "-17%",
          id: "WebApp",
          edgeType: "labeled",
          label: "Web App",
          float: "left",
          animated: true,
        },
        {
          type: "source",
          position: Position.Bottom,
          offset: "17%",
          id: "MobileApp",
          edgeType: "labeled",
          label: "Mobile App",
          float: "right",
          animated: true,
        },
      ],
    },
  },
  {
    id: "b",
    type: "deletable-node",
    position: { x: 100, y: 100 },
    data: {
      label: "",
      images: [
        {
          svg: <ServerIcon style={{ height: "25px" }} />,
          alt: "Web Server",
        },
      ],
      handles: [{ type: "target", position: Position.Top, id: "WebServerConnection" }],
    },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "deletable-node": DeletableNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
