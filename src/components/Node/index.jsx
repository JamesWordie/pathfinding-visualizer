// Styles
import { Wrapper } from "./Node";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
}) => {
  const nodeClass = () => {
    return isStart ? "node start-node" : isFinish ? "node finish-node" : "node";
  };

  return (
    <Wrapper
      id={`node-${row}-${col}`}
      className={nodeClass()}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    />
  );
};

export default Node;
