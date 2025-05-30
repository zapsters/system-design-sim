import { Handle, Position, useReactFlow, type NodeProps } from "@xyflow/react";

import CloseIcon from "../images/close.svg?react";
import { type Deletable } from "./types";

export function DeletableNode({ id, data }: NodeProps<Deletable>) {
  const { deleteElements } = useReactFlow();

  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  return (
    // We add this class to use the same styles as React Flow's default nodes.
    <div className="react-flow__node-default deletable-node">
      {data.label && <h1>{data.label}</h1>}
      <div style={{ display: "flex", gap: "8px", justifyContent: "center" }}>
        {data.images?.map((imageData, index) => (
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
      </div>

      <svg
        xmlns="http://www.w3.org/2000/svg"
        onClick={handleDelete}
        className="deletable-node-button"
        width={10}
        style={{
          transform: "translate(-20%, 20%)",
          backgroundColor: "#ffffff",
          opacity: 0,
          cursor: "pointer",
          borderRadius: "50%",
          position: "absolute",
          scale: "1",
          top: "0px",
          right: "0px",
          overflow: "visible",
        }}
        viewBox="0 0 20 20">
        {/* <path
          fill="#000000ff"
          d="m13.537 12l3.855-3.855a1.091 1.091 0 0 0-1.542-1.541l.001-.001l-3.855 3.855l-3.855-3.855A1.091 1.091 0 0 0 6.6 8.145l-.001-.001l3.855 3.855l-3.855 3.855a1.091 1.091 0 1 0 1.541 1.542l.001-.001l3.855-3.855l3.855 3.855a1.091 1.091 0 1 0 1.542-1.541l-.001-.001z"
        /> */}
        <CloseIcon
          style={{
            width: "10px",
            height: "10px",
            fill: "#000000ff",
          }}
        />
      </svg>

      {data.handles?.map((handle, index) => {
        const style: React.CSSProperties = {};
        let realOffset = parseInt(handle.offset) + 50 + "%";
        if (handle.position === Position.Top) style.left = realOffset;
        if (handle.position === Position.Bottom) style.left = realOffset;
        if (handle.position === Position.Left) style.top = realOffset;
        if (handle.position === Position.Right) style.top = realOffset;

        return (
          <Handle
            key={handle.id ?? `${handle.type}-${handle.position}-${index}`}
            id={handle.id ?? `${handle.type}-${handle.position}-${index}`}
            type={handle.type}
            position={handle.position}
            style={style}
          />
        );
      })}
    </div>
  );
}
