// Components
import Node from "../Node";
// Styles
import { Wrapper, Content } from "./Grid";
// Config
// import { NodeType, GridType } from "../../config/types";

const Grid = ({ grid, handleMouseDown, handleMouseUp, handleMouseEnter }) => {
  return (
    <Wrapper>
      {grid.map((row, rowIndex) => {
        return (
          <Content key={rowIndex * Math.random()}>
            {row.map((node) => {
              const { row, col, isStart, isFinish } = node;
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
                />
              );
            })}
          </Content>
        );
      })}
    </Wrapper>
  );
};

export default Grid;
