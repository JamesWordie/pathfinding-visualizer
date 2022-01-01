export const useInitialGrid = () => {
  const getInitialGrid = (rows, cols, startNode, finishNode) => {
    let grid = [];
    for (let row = 0; row < rows; row++) {
      let currentRow = [];
      for (let col = 0; col < cols; col++) {
        currentRow.push(renderNode(row, col, startNode, finishNode));
      }
      grid.push(currentRow);
    }
    return grid;
  };

  const renderNode = (row, col, startNode, finishNode) => {
    return {
      row,
      col,
      isStart: startNode.row === row && startNode.col === col,
      isFinish: finishNode.row === row && finishNode.col === col,
      distance: Infinity,
      totalDistance: Infinity,
    };
  };

  return [getInitialGrid];
};
