import type { NodeTypes } from "@xyflow/react";

import { PositionLoggerNode } from "./PositionLoggerNode";
import { UserNode } from "./UserNode";
import { ServerNode } from "./ServerNode";
import { AppNode } from "./types";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "user-node",
    position: { x: 0, y: 0 },
    data: {
      // Add required fields for UserNodeData here, e.g. label: ""
      label: "",
    },
  },
  {
    id: "b",
    type: "server-node",
    position: { x: 20, y: 100 },
    data: {
      label: "",
    },
  },
];

export const nodeTypes = {
  "position-logger": PositionLoggerNode,
  "user-node": UserNode,
  "server-node": ServerNode,
  // Add any of your custom nodes here!
} satisfies NodeTypes;
