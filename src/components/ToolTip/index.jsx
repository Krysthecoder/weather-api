import React from 'react';

export default function ToolTip({ toolTipText }) {
  return (
    <div
      id="tooltip-default"
      role="tooltip"
      className="absolute z-10  inline-block px-3 py-2 text-sm text-white transition-opacity duration-300 bg-gray-900 rounded-lg shadow-sm opacity-0 hover:opacity-80 tooltip  dark:bg-gray-700"
    >
      {toolTipText}
      <div className="tooltip-arrow" data-popper-arrow></div>
    </div>
  );
}
