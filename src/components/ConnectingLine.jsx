/* eslint-disable react/prop-types */
import { useState, useEffect, useCallback } from "react";

const ConnectingLine = ({ startBlock, endBlock }) => {
  const [coordinates, setCoordinates] = useState({
    x1: 0,
    y1: 0,
    x2: 0,
    y2: 0,
  });

  const updateLinePosition = useCallback(() => {
    if (!startBlock || !endBlock) return;

    const startRect = startBlock.getBoundingClientRect();
    const endRect = endBlock.getBoundingClientRect();

    setCoordinates({
      x1: startRect.left + startRect.width / 2,
      y1: startRect.top + startRect.height / 2,
      x2: endRect.left + endRect.width / 2,
      y2: endRect.top + endRect.height / 2,
    });
  }, [startBlock, endBlock]);

  useEffect(() => {
    updateLinePosition();

    const observer = new MutationObserver(updateLinePosition);
    const resizeObserver = new ResizeObserver(updateLinePosition);

    if (startBlock && endBlock) {
      observer.observe(startBlock, { attributes: true });
      observer.observe(endBlock, { attributes: true });
      resizeObserver.observe(startBlock);
      resizeObserver.observe(endBlock);

      window.addEventListener("scroll", updateLinePosition);
      window.addEventListener("resize", updateLinePosition);

      const animationFrame = requestAnimationFrame(function animate() {
        updateLinePosition();
        requestAnimationFrame(animate);
      });

      return () => {
        observer.disconnect();
        resizeObserver.disconnect();
        window.removeEventListener("scroll", updateLinePosition);
        window.removeEventListener("resize", updateLinePosition);
        cancelAnimationFrame(animationFrame);
      };
    }
  }, [startBlock, endBlock, updateLinePosition]);

  return (
    <svg
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        pointerEvents: "none",
        zIndex: 0,
      }}
    >
      <line
        {...coordinates}
        stroke="black"
        strokeWidth="2"
        strokeDasharray="5,5"
      />
    </svg>
  );
};

export default ConnectingLine;
