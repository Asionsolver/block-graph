// Get the total count of blocks
export const getTotalBlockCount = (blocks) => blocks.length - 1;

// Get the count for a specific block based on creation order
export const getBlockCount = (blocks, blockId) => {
    if (blockId === 'root') return 0;
    const index = blocks.findIndex(block => block.id === blockId);
    return index;
};