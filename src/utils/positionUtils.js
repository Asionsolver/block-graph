export const generateRandomPosition = () => ({
    x: Math.random() * (window.innerWidth - 100) + 50,
    y: Math.random() * (window.innerHeight - 100) + 50,
});

export const createNewBlock = (id, parentId) => ({
    id,
    position: generateRandomPosition(),
    parentId,
});