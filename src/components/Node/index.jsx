// Styles
import "./Node.scss";

const Node = ({
  row,
  col,
  isStart,
  isFinish,
  handleMouseDown,
  handleMouseUp,
  handleMouseEnter,
  nodeType,
  isMoving,
}) => {
  const nodeClass = () => {
    let nodeClass = "node ";

    switch (isMoving.type) {
      case "start":
        nodeClass += "moving-start";
        break;
      case "finish":
        nodeClass += "moving-finish";
        break;
      default:
        nodeClass += "";
        break;
    }

    // Adds className for start or finish nodes
    if (isStart) {
      return (nodeClass += "start-node");
    } else if (isFinish) {
      return (nodeClass += "finish-node");
    }

    // Adds className for wall, visited, path (shortest), or empty node
    switch (nodeType) {
      case "wall":
        return (nodeClass += "wall-node");
      case "visited":
        return (nodeClass += "visited-node");
      case "path":
        return (nodeClass += "path-node");
      default:
        return (nodeClass += "empty-node");
    }
  };

  return (
    <div
      id={`node-${row}-${col}`}
      className={nodeClass()}
      onMouseDown={() => handleMouseDown(row, col)}
      onMouseUp={() => handleMouseUp(row, col)}
      onMouseEnter={() => handleMouseEnter(row, col)}
    ></div>
  );
};

export default Node;
