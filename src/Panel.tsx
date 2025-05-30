import { Panel, Position } from "@xyflow/react";
import { DesktopIcon, PhoneIcon, ServerIcon } from "./images/images.tsx";
import { Deletable } from "./nodes/types.ts";

export const initialNodes: Deletable[] = [
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

export default function PanelElement() {
  return (
    <Panel position="top-left" className="customPanel">
      {initialNodes.map((node: Deletable) => (
        <div
          key={node.id}
          className="draggable-node-template"
          draggable
          onDragStart={(event) => {
            event.dataTransfer.setData("application/reactflow", JSON.stringify(node));
            event.dataTransfer.effectAllowed = "move";
          }}>
          <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
            {node.data.images?.map((imageData: any, index: number) => (
              <div
                key={index}
                style={{
                  display: "flex",
                  gap: "3px",
                  fill: "#343232",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}>
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
            <span>{node.data.label || "Unnamed"}</span>
          </div>
        </div>
      ))}
    </Panel>
  );
}
