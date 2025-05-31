// hooks/useDeletableNode.ts

import { useReactFlow } from "@xyflow/react";
import CloseIcon from "../images/close.svg?react";

// FOCUSED TYPE: Props for the hook
export interface UseDeletableNodeProps {
  id: string;
}

// FOCUSED TYPE: Return type for better TypeScript support
export interface UseDeletableNodeReturn {
  handleDelete: () => void;
  DeleteButton: React.ComponentType;
}

// REACT CONCEPT: Focused Custom Hook
// Single responsibility: making nodes deletable
export function useDeletableNode({ id }: UseDeletableNodeProps): UseDeletableNodeReturn {
  // REACT FLOW CONCEPT: Access to flow operations
  const { deleteElements } = useReactFlow();

  // REACT CONCEPT: Memoized delete handler
  // Clean, focused function that deletes the specific node
  const handleDelete = () => {
    deleteElements({ nodes: [{ id }] });
  };

  // REACT CONCEPT: Clean component definition
  // Simplified delete button with better styling structure
  const DeleteButton = () => (
    <button
      onClick={handleDelete}
      className="deletable-node-button"
      aria-label="Delete node"
      type="button"
      style={{
        padding: "0",
        position: "absolute",
        top: "2px",
        right: "2px",
        width: "10px",
        height: "10px",
        borderRadius: "50%",
        border: "none",
        backgroundColor: "#ffffff",
        cursor: "pointer",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        transition: "opacity 0.2s ease",
        zIndex: 10,
      }}>
      <CloseIcon
        style={{
          fill: "#666",
        }}
      />
    </button>
  );

  return { handleDelete, DeleteButton };
}
