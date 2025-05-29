import { useState, useCallback, useRef } from "react";
import {
  ReactFlow,
  Background,
  Controls,
  MiniMap,
  addEdge,
  useNodesState,
  useEdgesState,
  type OnConnect,
  reconnectEdge,
  Panel,
  OnNodeDrag,
  BuiltInNode,
} from "@xyflow/react";
import "@xyflow/react/dist/style.css";

import { initialNodes, nodeTypes } from "./nodes/index.js";
import { initialEdges, edgeTypes } from "./edges";

export default function App() {
  const [nodes, , onNodesChange] = useNodesState(initialNodes);
  const [edges, setEdges, onEdgesChange] = useEdgesState(initialEdges);
  const onConnect: OnConnect = useCallback(
    (connection) => {
      let edge: any = { ...connection, type: "" };
      let newConnection = [connection.sourceHandle, connection.targetHandle];
      const sourceNode = nodes.find((n) => n.id === connection.source);

      // If the source node has handles, find the handle reference
      if (
        sourceNode &&
        sourceNode.data &&
        "handles" in sourceNode.data &&
        Array.isArray((sourceNode.data as any).handles)
      ) {
        const handles = (sourceNode.data as { handles: any[] }).handles;
        console.log(handles);

        const handleRef = handles.find((handle) => handle.id === newConnection[0]) || null;
        console.log("handleRef", handleRef);

        edge.type = handleRef?.edgeType || "";

        if (edge.type === "labeled") {
          edge = {
            ...edge,
            data: { label: handleRef?.label || "", float: handleRef?.float || "" },
          };
        }
        if (handleRef?.animated) {
          edge.animated = true;
        }
      }
      setEdges((eds) => addEdge(edge, eds));
      console.log(`== Connected ${newConnection[0]} to ${newConnection[1]} ==`);
      console.log("source node", sourceNode);
    },
    [setEdges]
  );

  const edgeReconnectSuccessful = useRef(true);

  const onReconnectStart = useCallback(() => {
    edgeReconnectSuccessful.current = false;
  }, []);

  const onReconnect = useCallback((oldEdge: any, newConnection: any) => {
    edgeReconnectSuccessful.current = true;
    setEdges((els) => reconnectEdge(oldEdge, newConnection, els));
  }, []);

  const onReconnectEnd = useCallback((_: any, edge: { id: string }) => {
    if (!edgeReconnectSuccessful.current) {
      setEdges((eds) => eds.filter((e) => e.id !== edge.id));
    }

    edgeReconnectSuccessful.current = true;
  }, []);

  return (
    <>
      <ReactFlow
        nodes={nodes}
        edges={edges}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onReconnect={onReconnect}
        onReconnectStart={onReconnectStart}
        onReconnectEnd={onReconnectEnd}
        onConnect={onConnect}
        deleteKeyCode={["Delete"]}
        fitView>
        <Background />
        <MiniMap />

        <Panel position="top-left" className="customPanel">
          <h1>DB Schema</h1>
          <h2>Control Panel</h2>
          <h3>Control Panel</h3>
          <h4>Control Panel</h4>
          <h5>Control Panel</h5>
          <h6>Control Panel</h6>
          <p>Hi!</p>
          <Controls orientation="horizontal" />
        </Panel>
      </ReactFlow>
    </>
  );
}
