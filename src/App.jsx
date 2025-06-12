import { useState, useRef, useEffect } from "react";
import Block from "./components/Block";

import ConnectionsManager from "./components/ConnectionsManager";

import { generateRandomPosition } from "./utils/positionUtils";
import { getBlockCount } from "./utils/blockUtils";

function App() {
  const [blocks, setBlocks] = useState([
    {
      id: 1,
      position: generateRandomPosition(),
      parentId: null,
    },
  ]);

  const [connections, setConnections] = useState([]);
  const blockRefs = useRef(new Map());

  const handleAddBlock = (parentId) => {
    const newBlock = {
      id: blocks.length + 1,
      position: generateRandomPosition(),
      parentId,
    };
    setBlocks((prevBlocks) => [...prevBlocks, newBlock]);
  };

  useEffect(() => {
    // Update connections whenever blocks change
    const newConnections = blocks
      .filter((block) => block.parentId)
      .map((block) => ({
        startId: block.parentId,
        endId: block.id,
      }));
    setConnections(newConnections);
  }, [blocks]);

  return (
    <div className="w-full h-screen bg-gray-100 relative overflow-hidden">
      {blocks.map((block) => (
        <Block
          key={block.id}
          id={block.id}
          position={block.position}
          onAddBlock={handleAddBlock}
          count={getBlockCount(blocks, block.id)}
          ref={(el) => {
            if (el) {
              blockRefs.current.set(block.id, el);
            } else {
              blockRefs.current.delete(block.id);
            }
          }}
        />
      ))}
      <ConnectionsManager
        connections={connections}
        blockRefs={blockRefs.current}
      />
    </div>
  );
}

export default App;
