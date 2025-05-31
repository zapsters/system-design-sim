import type { Edge, EdgeTypes } from "@xyflow/react";
import LabeledEdge from "./LabeledEdge.tsx";

export const initialEdges: Edge[] = [
  {
    id: "a->c:WebApp",
    type: "labeled",
    source: "a",
    target: "b",
    sourceHandle: "WebApp",
    animated: true,
  },
  {
    id: "a->c:MobileApp",
    type: "labeled",
    source: "a",
    target: "b",
    sourceHandle: "MobileApp",
    animated: true,
  },
  { id: "b->d", source: "b", target: "d" },
  { id: "c->d", source: "c", target: "d", animated: true },
];

export const edgeTypes = {
  // Add your custom edge types here!
  labeled: LabeledEdge,
} satisfies EdgeTypes;
