import React, { useState } from "react";

const NewspaperButton = ({ onClick }) => {
  const [selected, setSelected] = useState(false);
  const [hover, setHover] = useState(false);

  const handleClick = () => {
    setSelected(!selected);
    onClick();
  };

  const handleMouseEnter = () => {
    setHover(true);
  };

  const handleMouseLeave = () => {
    setHover(false);
  };

  return (
    <div
      className="border border-success col-6 d-flex justify-content-center align-items-center"
      role="button"
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      style={{
        backgroundColor: selected || hover ? "green" : "white",
        cursor: "pointer",
      }}
    >
      <h3
        style={{
          fontSize: selected ? 55 : 30,
          color: selected || hover ? "white" : "black",
          cursor: "pointer",
        }}
      >
        <i className="bi bi-newspaper"></i> Newspapers
      </h3>
    </div>
  );
};

export default NewspaperButton;
