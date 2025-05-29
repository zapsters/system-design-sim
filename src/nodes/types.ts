import type { Node, BuiltInNode } from "@xyflow/react";

export type Deletable = Node<
  {
    label: string;
    images?: { svg?: React.ReactNode; alt?: string }[];
    description?: string;
    handles?: {
      type: "source" | "target";
      position: any;
      offset?: any;
      id?: string;
      edgeType?: string;
      label?: string;
      float?: "left" | "right";
      animated?: boolean;
    }[];
  },
  "deletable-node"
>;
export type PositionLoggerNode = Node<{ label: string }, "position-logger">;
export type AppNode = BuiltInNode | PositionLoggerNode | Deletable;
