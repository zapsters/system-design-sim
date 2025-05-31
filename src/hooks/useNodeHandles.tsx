// Updated useNodeHandles.ts - returning a render function that accepts handle data

import { Handle, Position } from "@xyflow/react";
import { NodeHandle } from "../nodes/types.tsx";

export interface UseNodeHandlesProps {
  handles?: NodeHandle[];
}

export function useNodeHandles({ handles }: UseNodeHandlesProps) {
  // Function that accepts handle data and returns JSX
  const renderHandles = (handleData?: NodeHandle[]) => {
    // Use passed handleData or fallback to hook's handles
    const handlesToRender = handleData || handles;

    // Early return for empty handles
    if (!handlesToRender || handlesToRender.length === 0) return null;

    return handlesToRender.map((handle, index) => {
      const style: React.CSSProperties = {};

      // Handle offset calculation
      const offsetValue =
        typeof handle.offset === "string" ? parseInt(handle.offset) : handle.offset || 0;
      const realOffset = `${offsetValue + 50}%`;

      // Position-based styling
      switch (handle.position) {
        case Position.Top:
        case Position.Bottom:
          style.left = realOffset;
          break;
        case Position.Left:
        case Position.Right:
          style.top = realOffset;
          break;
      }

      // Generate consistent key and id
      const handleKey = handle.id ?? `${handle.type}-${handle.position}-${index}`;

      return (
        <Handle
          key={handleKey}
          id={handleKey}
          type={handle.type}
          position={handle.position}
          style={style}
          className={handle.animated ? "animated-handle" : undefined}
        />
      );
    });
  };

  return { renderHandles };
}
