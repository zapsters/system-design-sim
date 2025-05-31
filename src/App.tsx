import { useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  reconnectEdge,
  type OnConnect,
  type Edge,
  type Connection,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import PanelElement from "./Panel";
import { initialNodes, nodeTypes } from "./nodes";
import { initialEdges, edgeTypes } from "./edges";
import type { CustomNode } from "./nodes/types";

// HELPER: Extract edge creation logic for better readability
function createEdgeFromConnection(connection: Connection, sourceNode: any): Edge {
  let edge: any = { ...connection, type: "" };

  // TYPE GUARD: Check if node has handles
  if (!sourceNode?.data || !("handles" in sourceNode.data)) {
    return edge;
  }

  const nodeData = sourceNode.data as CustomNode["data"];
  const handles = nodeData.handles;

  if (!Array.isArray(handles)) {
    return edge;
  }

  // FIND: Get the source handle configuration
  const sourceHandle = handles.find((handle) => handle.id === connection.sourceHandle);

  if (!sourceHandle) {
    return edge;
  }

  // CONFIGURE: Set edge properties based on handle configuration
  edge.type = sourceHandle.edgeType || "";

  if (edge.type === "labeled") {
    edge.data = {
      label: sourceHandle.label || "",
      float: sourceHandle.float || "left",
    };
  }

  if (sourceHandle.animated) {
    edge.animated = true;
  }

  return edge;
}

export default function App() {
  // STATE: React Flow state management
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);

  // REF: Track edge reconnection state
  const edgeReconnectSuccessful = useRef(true);

  // HANDLER: Create new connections with proper edge configuration
  const onConnect: OnConnect = useCallback(
    (connection) => {
      const sourceNode = nodes.find((node) => node.id === connection.source);
      const newEdge = createEdgeFromConnection(connection, sourceNode);

      setEdges((currentEdges) => addEdge(newEdge, currentEdges));

      // DEVELOPMENT: Logging for debugging
      if (process.env.NODE_ENV === "development") {
        console.log(`Connected ${connection.sourceHandle} to ${connection.targetHandle}`);
        console.log("Source node:", sourceNode);
        console.log("Created edge:", newEdge);
      }
    },
    [nodes, setEdges]
  );

  // HANDLER: Edge reconnection start
  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  // HANDLER: Edge reconnection success
  const onReconnect = useCallback(
    (oldEdge: Edge, newConnection: Connection) => {
      edgeReconnectSuccessful.current = true;
      setEdges((currentEdges) => reconnectEdge(oldEdge, newConnection, currentEdges));
    },
    [setEdges]
  );

  // HANDLER: Edge reconnection end (cleanup failed reconnections)
  const onReconnectEnd = useCallback(
    (_: any, edge: Edge) => {
      if (!edgeReconnectSuccessful.current) {
        setEdges((currentEdges) => currentEdges.filter((e) => e.id !== edge.id));
      }
      edgeReconnectSuccessful.current = true;
    },
    [setEdges]
  );

  return (
    <ReactFlow
      nodes={nodes}
      edges={edges}
      nodeTypes={nodeTypes}
      edgeTypes={edgeTypes}
      onNodesChange={onNodesChange}
      onEdgesChange={onEdgesChange}
      onConnect={onConnect}
      onReconnect={onReconnect}
      onReconnectStart={onReconnectStart}
      onReconnectEnd={onReconnectEnd}
      deleteKeyCode={["Delete"]}
      fitView>
      <Background />
      <MiniMap position="top-right" />
      <Controls position="bottom-right" orientation="horizontal" />
      <PanelElement />
    </ReactFlow>
  );
}
