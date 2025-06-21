import { useState, useRef } from 'react';

function Slider({ initialSize = 10, minSize = 1, maxSize = 50, onChange }) {
  const [brushSize, setBrushSize] = useState(initialSize);
  const svgRef = useRef(null);

  const handleMouse = (e) => {
    const svg = svgRef.current;
    if (!svg) return;

    const rect = svg.getBoundingClientRect();
    const x = e.clientX - rect.left;
    let ratio = x / 150;
    ratio = Math.max(0, Math.min(1, ratio)); // clamp to [0, 1]

    const newSize = Math.round(minSize + (maxSize - minSize) * ratio);
    setBrushSize(newSize);
    onChange?.(newSize);
  };

  const fillWidth = ((brushSize - minSize) / (maxSize - minSize)) * 150;

  return (
    <svg
      ref={svgRef}
      xmlns="http://www.w3.org/2000/svg"
      width="150"
      height="10"
      viewBox="0 0 150 10"
      fill="none"
      onMouseDown={handleMouse}
      onMouseMove={(e) => e.buttons === 1 && handleMouse(e)}
      style={{ cursor: 'pointer', display: 'block' }}
    >
      <g filter="url(#inner-shadow)">
        <rect width="150" height="10" rx="7.5" fill="#F5F5F5" />
      </g>
      <rect width={fillWidth} height="10" rx="7.5" fill="#0A1123" />
      <defs>
        <filter
          id="inner-shadow"
          x="0"
          y="0"
          width="202"
          height="17"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feOffset dx="2" dy="2" />
          <feGaussianBlur stdDeviation="1" />
          <feComposite in2="SourceAlpha" operator="arithmetic" k2="-1" k3="1" />
          <feColorMatrix
            type="matrix"
            values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
          />
          <feBlend in2="SourceGraphic" mode="normal" />
        </filter>
      </defs>
    </svg>
  );
}

export default Slider;
