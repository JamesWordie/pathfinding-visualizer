// Components
import Node from "../Node";
// Styles
import "./Grid.scss";
// Config
// import { NodeType, GridType } from "../../config/types";

const Grid = ({ grid, handleMouseDown, handleMouseUp, handleMouseEnter }) => {
  return (
    <div className="grid">
      {grid.map((row, rowIndex) => {
        return (
          <div key={rowIndex * Math.random()}>
            {row.map((node) => {
              const { row, col, isStart, isFinish, nodeType, isMoving } = node;
              return (
                <Node
                  key={`node-${row}-${col}`}
                  row={row}
                  col={col}
                  isStart={isStart}
                  isFinish={isFinish}
                  handleMouseDown={handleMouseDown}
                  handleMouseUp={handleMouseUp}
                  handleMouseEnter={handleMouseEnter}
                  nodeType={nodeType}
                  isMoving={isMoving}
                />
              );
            })}
          </div>
        );
      })}
    </div>
  );
};

export default Grid;
