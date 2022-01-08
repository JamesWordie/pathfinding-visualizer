// External Imports
import { useEffect, useState } from "react";
import Grid from "../../components/Grid";
// Hooks
import { useInitialGrid } from "../../customHooks/useInitialGrid";
import { useUpdateGrid } from "../../customHooks/useUpdateGrid";
// Style
import "./Visualizer.scss";

const Visualizer = () => {
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(40);
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 0, col: 0 });
  const [finishNode, setFinishNode] = useState({ row: 24, col: 39 });
  const [mouseDown, setMouseDown] = useState(false);
  const [isMoving, setIsMoving] = useState({ moving: false, type: "" });

  const [getInitialGrid] = useInitialGrid();

  const [updateGrid, updateGridStart, updateGridFinish, updateMovingNode] =
    useUpdateGrid(startNode, finishNode);

  /**
   * @function useEffect to render the grid on page load
   */
  useEffect(() => {
    const ininitalGrid = getInitialGrid(
      rows,
      cols,
      startNode,
      finishNode,
      isMoving
    );
    setGrid(ininitalGrid);
  }, []);

  /**
   * @function useEffect to set the start and finish node locations on page load
   */
  useEffect(() => {
    setStartNode({ row: 0, col: 0 });
    setFinishNode({ row: rows - 1, col: cols - 1 });
  }, []);

  /**
   * @function handleMouseDown mouse event for down-click on a node
   * @returns updated grid, for moving start, finish and setting wall nodes
   */
  const handleMouseDown = (row, col) => {
    if (isMoving.moving) return;
    let currentNode = grid[row][col];

    if (currentNode.isStart) {
      setMovingGrid("start");
      return;
    } else if (currentNode.isFinish) {
      setMovingGrid("finish");
      return;
    }
    const newGrid = updateGrid(grid, row, col);
    setMouseDown(true);
    setGrid(newGrid);
  };

  /**
   * @function handleMouseUp mouse event for up-click on a node
   * @returns updated grid, for changing the start or finish and setting wall nodes
   */
  const handleMouseUp = (row, col) => {
    let newGrid;
    const { moving, type } = isMoving;

    if (moving && type === "start") {
      newGrid = updateGridStart(grid, row, col);
      setStartNode({ row, col });
      setGrid(newGrid);
    } else if (moving && type === "finish") {
      newGrid = updateGridFinish(grid, row, col);
      setFinishNode({ row, col });
      setGrid(newGrid);
    }

    setIsMoving({ moving: false, type: "" });
    setMouseDown(false);
  };

  /**
   * @function handleMouseEnter mouse event for entering a node while clicked down, ie dragging a wall
   * @returns updated grid, setting wall nodes
   */
  const handleMouseEnter = (row, col) => {
    if (grid[row][col].nodeType === "wall" || !mouseDown) return;
    const newGrid = updateGrid(grid, row, col);
    setGrid(newGrid);
  };

  const setMovingGrid = (movingType) => {
    setIsMoving({ moving: true, type: movingType });
    const newGrid = updateMovingNode(grid, {
      moving: true,
      type: movingType,
    });
    setGrid(newGrid);
  };

  return (
    <div className="grid-wrapper">
      <Grid
        grid={grid}
        handleMouseDown={handleMouseDown}
        handleMouseUp={handleMouseUp}
        handleMouseEnter={handleMouseEnter}
      />
    </div>
  );
};

export default Visualizer;
