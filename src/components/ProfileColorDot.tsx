import React from "react";

interface ProfileColorDotProps {
  color: string;
  size: number;
}

const ProfileColorDot: React.FC<ProfileColorDotProps> = ({ color, size }) => {
  return (
    <div
      className={`flex-none rounded-full border-2 border-gray-300 w-${size} h-${size}`}
      style={{
        backgroundColor: color,
      }}
    />
  );
};

export default ProfileColorDot;
