const generateUniqueId = () => {
    return `partition_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

export default generateUniqueId;
