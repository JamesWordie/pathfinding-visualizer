// External Imports
import cloneDeep from "lodash.clonedeep";

/**
 * @customHook useUpdateGrid; custom hook for updating the grid, updating start & finish nodes
 * @param startNode the start node for the path
 * @param finishNode the finish node for the path
 * @returns an updated version of the grid
 */
export const useUpdateGrid = (startNode, finishNode) => {
  /**
   * @returns an updated version of the grid with new wall (or empty) location
   */
  const updateGrid = (grid, row, col) => {
    const gridCopy = cloneDeep(grid);
    const currentNode = gridCopy[row][col];
    if (!currentNode.isStart && !currentNode.isFinish) {
      currentNode.nodeType = currentNode.nodeType === "wall" ? "" : "wall";
      gridCopy[row][col] = currentNode;
    }
    return gridCopy;
  };

  /**
   * @returns an updated version of the grid with new start location
   */
  const updateGridStart = (grid, row, col) => {
    let gridCopy = cloneDeep(grid);
    const oldStartNode = gridCopy[startNode.row][startNode.col];
    const newStartNode = gridCopy[row][col];

    if (!newStartNode.isFinish) {
      oldStartNode.isStart = false;
      newStartNode.isStart = true;

      gridCopy[startNode.row][startNode.col] = oldStartNode;
      gridCopy[row][col] = newStartNode;
    }

    return updateMovingNode(gridCopy, {
      moving: false,
      type: "",
    });
  };

  /**
   * @returns an updated version of the grid with new finish location
   */
  const updateGridFinish = (grid, row, col) => {
    let gridCopy = cloneDeep(grid);
    const oldFinishNode = gridCopy[finishNode.row][finishNode.col];
    const newFinishNode = gridCopy[row][col];

    if (!newFinishNode.isStart) {
      oldFinishNode.isFinish = false;
      newFinishNode.isFinish = true;

      gridCopy[finishNode.row][finishNode.col] = oldFinishNode;
      gridCopy[row][col] = newFinishNode;
    }

    return updateMovingNode(gridCopy, {
      moving: false,
      type: "",
    });
  };

  /**
   * @function updateMovingNode sets all nodes with additional class for hovering while moving start/finish
   * @returns an updated grid with the isMoving properties set
   */
  const updateMovingNode = (grid, isMoving) => {
    return grid.map((row) => {
      return row.map((node) => {
        node.isMoving = isMoving;
        return node;
      });
    });
  };

  return [updateGrid, updateGridStart, updateGridFinish, updateMovingNode];
};
