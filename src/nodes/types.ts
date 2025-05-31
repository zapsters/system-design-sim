import type { Node, BuiltInNode, Position } from "@xyflow/react";

// DEDICATED TYPE: Handle-specific interface
// This type focuses only on what we need for rendering handles
export interface NodeHandle {
  type: "source" | "target";
  position: Position;
  offset?: string | number;
  id?: string;
  edgeType?: string;
  label?: string;
  float?: "left" | "right";
  animated?: boolean;
}

// Base interface for all custom nodes
interface BaseCustomNodeData {
  handles?: NodeHandle[];
  [key: string]: unknown;
}

// Specific node type data interfaces
export interface UserNodeData extends BaseCustomNodeData {
  // Users node can have additional user-specific properties
  userCount?: number;
  activeUsers?: number;
}

export interface ServerNodeData extends BaseCustomNodeData {
  images?: { svg?: React.ReactNode; alt?: string }[];
  description?: string;
  serverType?: "web" | "api" | "database";
  status?: "online" | "offline" | "maintenance";
}

export interface DatabaseNodeData extends BaseCustomNodeData {
  connectionString?: string;
  tableCount?: number;
  size?: string;
}

// Define your custom node types
export type UserNode = Node<UserNodeData, "user-node">;
export type ServerNode = Node<ServerNodeData, "server-node">;
export type DatabaseNode = Node<DatabaseNodeData, "database-node">;

// Legacy CustomNode for backward compatibility
export type CustomNode = Node<
  {
    label?: string;
    images?: { svg?: React.ReactNode; alt?: string }[];
    description?: string;
    handles?: NodeHandle[];
  },
  "custom-node"
>;

export type PositionLoggerNode = Node<{ label: string }, "position-logger">;

// Union of all possible node types
export type AppNode =
  | BuiltInNode
  | PositionLoggerNode
  | CustomNode
  | UserNode
  | ServerNode
  | DatabaseNode;
