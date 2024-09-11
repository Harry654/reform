import React from "react";

interface DownArrowIconProps {
  size?: number;
  color?: string;
  className?: string;
  onClick?: (event: React.MouseEvent<SVGSVGElement, MouseEvent>) => void;
}

export default function DownArrowIcon({
  size = 24,
  color = "currentColor",
  className = "",
  onClick,
}: DownArrowIconProps = {}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke={color}
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      className={`feather feather-chevron-down ${className}`}
      onClick={onClick}
      style={{ cursor: onClick ? "pointer" : "default" }}
    >
      <polyline points="6 9 12 15 18 9"></polyline>
    </svg>
  );
}
