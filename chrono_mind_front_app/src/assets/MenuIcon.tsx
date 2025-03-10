import { FC } from "react";

const MenuIcon: FC<{ className?: string }> = ({ className }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 120 80"
    className={className}
  >
    <style>
      {`
        .menu-text {
          font: 500 28px 'Segoe UI', sans-serif;
          fill: currentColor;
          opacity: 0;
          transition: opacity 0.3s;
        }
        .arrow-group {
          transition: transform 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        }
        .hover-trigger:hover .menu-text {
          opacity: 1;
        }
        .hover-trigger:hover .arrow-group {
          transform: translateX(8px);
        }
      `}
    </style>

    <g className="arrow-group" transform="translate(30 20)">
      {/* Стрелки */}
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M20 10L40 30M40 30L20 50"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M40 10L60 30M60 30L40 50"
      />
      <path
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        d="M60 10L80 30M80 30L60 50"
      />
    </g>

    <text className="menu-text" x="50%" y="70" textAnchor="middle">
      menu
    </text>
  </svg>
);

export default MenuIcon;
