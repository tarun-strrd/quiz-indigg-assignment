import React, { useState } from "react";

const Option = ({ option }) => {
  const [selected, setSelected] = useState(false);

  const handleClick = () => {
    console.log("clicked" + option);
    setSelected(!selected);
  };

  const optionStyle = {
    backgroundColor: selected ? "green" : "white",
  };

  return (
    <div className="option" onClick={() => handleClick()} style={optionStyle}>
      {option}
    </div>
  );
};

export default Option;
