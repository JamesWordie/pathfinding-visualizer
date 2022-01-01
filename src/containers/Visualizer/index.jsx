// External Imports
import { useEffect, useState } from "react";
import Grid from "../../components/Grid";
// Hooks
import { useInitialGrid } from "../../customHooks/useInitialGrid";
// Style
import { Wrapper } from "./Visualizer";

const Visualizer = () => {
  const [rows, setRows] = useState(25);
  const [cols, setCols] = useState(40);
  const [grid, setGrid] = useState([]);
  const [startNode, setStartNode] = useState({ row: 10, col: 10 });
  const [finishNode, setFinishNode] = useState({ row: 10, col: 30 });

  const [getInitialGrid] = useInitialGrid();
  console.log(grid);

  useEffect(() => {
    const ininitalGrid = getInitialGrid(rows, cols, startNode, finishNode);
    setGrid(ininitalGrid);
  }, []);

  return (
    <Wrapper>
      <Grid grid={grid} />
    </Wrapper>
  );
};

export default Visualizer;
