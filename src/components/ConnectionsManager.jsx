/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import ConnectingLine from "./ConnectingLine";

const ConnectionsManager = ({ connections, blockRefs }) => {
  const [renderedConnections, setRenderedConnections] = useState([]);

  useEffect(() => {
    // Only render connections when both blocks exist
    const validConnections = connections.filter(
      (conn) => blockRefs.get(conn.startId) && blockRefs.get(conn.endId)
    );
    setRenderedConnections(validConnections);
  }, [connections, blockRefs]);

  return (
    <>
      {renderedConnections.map(({ startId, endId }) => (
        <ConnectingLine
          key={`${startId}-${endId}`}
          startBlock={blockRefs.get(startId)}
          endBlock={blockRefs.get(endId)}
        />
      ))}
    </>
  );
};

export default ConnectionsManager;
