import { Sketch } from "@uiw/react-color";
import React from "react";

const ColorPicker: React.FC<{
  color: string;
  onChange: (color: string) => void;
}> = ({ color, onChange }) => {
  const handleChange = (color: any) => {
    onChange(color.hex);
  };

  return (
    <div>
      <Sketch color={color} onChange={handleChange} disableAlpha />
    </div>
  );
};

export default ColorPicker;
