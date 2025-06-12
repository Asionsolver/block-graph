/* eslint-disable react/prop-types */
import { forwardRef, useRef } from "react";
import { useDraggable } from "../hooks/useDraggable";
import AddButton from "./AddButton";

const Block = forwardRef(({ id, position, onAddBlock, count }, ref) => {
  const blockRef = useRef(null);
  const { position: currentPosition, handleMouseDown } = useDraggable(position);

  return (
    <div
      ref={(el) => {
        blockRef.current = el;
        // If ref is a function (from parent's ref callback), call it
        if (typeof ref === "function") {
          ref(el);
        } else if (ref && "current" in ref) {
          ref.current = el;
        }
      }}
      data-block-id={id}
      className="absolute bg-[#F70076] rounded-lg p-4 cursor-move shadow-lg flex flex-col items-center gap-2"
      style={{
        left: `${currentPosition.x}px`,
        top: `${currentPosition.y}px`,
        zIndex: 1,
      }}
      onMouseDown={(e) => {
        handleMouseDown(e, blockRef.current);
      }}
    >
      <span className="text-lg font-bold text-white">{count}</span>
      <AddButton onClick={() => onAddBlock(id)} />
    </div>
  );
});

Block.displayName = "Block";
export default Block;
