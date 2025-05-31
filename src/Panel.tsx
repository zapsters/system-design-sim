import { Panel } from "@xyflow/react";
import { AppNode } from "./nodes/types.ts";
import { userImages } from "./nodes/UserNode.tsx";
import { serverImages } from "./nodes/ServerNode.tsx";

export const initialNodes: AppNode[] = [
  {
    id: "a",
    type: "user-node",
    position: { x: 0, y: 0 },
    data: {
      previewImages: userImages,
      label: "Users",
    },
  },
  {
    id: "b",
    type: "server-node",
    position: { x: 20, y: 100 },
    data: {
      previewImages: serverImages,
      label: "",
    },
  },
];

export default function PanelElement() {
  const onDragStart = (event: React.DragEvent, nodeType: string, nodeData: any) => {
    event.dataTransfer.setData("application/reactflow", JSON.stringify({ nodeType, nodeData }));
    event.dataTransfer.effectAllowed = "move";
  };

  return (
    <Panel position="bottom-left" className="customPanel">
      {initialNodes.map((node: AppNode) => {
        // Only render user nodes with previewImages
        if (node.data && Array.isArray((node.data as { previewImages?: any[] }).previewImages)) {
          const previewImages = (node.data as { previewImages: any[] }).previewImages;
          return (
            <div
              key={node.id}
              className="react-flow__node-default user-node"
              draggable
              onDragStart={(event) => onDragStart(event, node.type ?? "", node.data)}
              style={{ cursor: "grab", marginBottom: "10px" }}>
              <h1 className="title">{String(node.data.label)}</h1>
              <div className="NodeImageContainer">
                {previewImages.map((imageData, index) => (
                  <div className="NodeImage" key={index}>
                    {imageData.svg}
                    <span
                      style={{
                        display: "inline-block",
                        width: "fit-content",
                        lineHeight: "1em",
                        fontSize: "6px",
                        textAlign: "right",
                      }}>
                      {imageData.alt}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          );
        }

        // Render other node types differently or return null
        return (
          <div
            key={node.id}
            className={`react-flow__node-default ${node.type}`}
            draggable
            onDragStart={(event) => onDragStart(event, node.type ?? "", node.data)}
            style={{ cursor: "grab", marginBottom: "10px" }}>
            <h1 className="title">{node.type === "server-node" ? "Server" : "Node"}</h1>
            <p>
              {typeof node.data.label === "string" && node.data.label.trim() !== ""
                ? node.data.label
                : "Untitled"}
            </p>
          </div>
        );
      })}
    </Panel>
  );
}
