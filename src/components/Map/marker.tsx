import React from 'react';

const MySvgComponent = () => {
  return (
    <svg width="100" height="100">
      {/* Create an SVG "a" (anchor) element */}
      <a href="http://www.w3.org/2000/svg" target="_blank" rel="noopener noreferrer">
        {/* Create an SVG "circle" element */}
        <rect width="11" height="11" rx="2" fill="#0016DB"/>
      </a>
    </svg>
  );
};

export default MySvgComponent;

