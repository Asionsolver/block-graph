import { useState } from "react";
import Block from "./Block";
import { createNewBlock } from "../utils/positionUtils";
import { getBlockCount } from "../utils/blockUtils";

const BlockSystem = () => {
  const [blocks, setBlocks] = useState([createNewBlock("root", null)]);

  const handleAddBlock = (parentId) => {
    const newBlock = createNewBlock(`block-${blocks.length}`, parentId);
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  const handlePositionChange = (id, newPosition) => {
    setBlocks((prevBlocks) =>
      prevBlocks.map((block) =>
        block.id === id ? { ...block, position: newPosition } : block
      )
    );
  };

  return (
    <div className="w-screen h-screen bg-gray-100 overflow-hidden relative">
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          position={block.position}
          count={getBlockCount(blocks, block.id)}
          parentPosition={
            block.parentId
              ? blocks.find((b) => b.id === block.parentId)?.position
              : null
          }
          onAddBlock={handleAddBlock}
          onPositionChange={handlePositionChange}
        />
      ))}
    </div>
  );
};
export default BlockSystem;
