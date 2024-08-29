import React from 'react';

const ProgressCircle = ({ percentage }) => {
  const radius = 45; // Radius of the circle
  const circumference = 2 * Math.PI * radius;
  const strokeDashoffset = circumference - (percentage / 100) * circumference;

  return (
    <div className="progress-circle-container">
      <svg className="progress-circle-svg" viewBox="0 0 100 100">
        <circle
          className="progress-circle-background"
          cx="50"
          cy="50"
          r={radius}
        ></circle>
        <circle
          className="progress-circle-foreground"
          cx="50"
          cy="50"
          r={radius}
          style={{ strokeDasharray: circumference, strokeDashoffset }}
        ></circle>
      </svg>
      <div className="progress-info">
        <div className="progress-percentage">{percentage.toFixed(2)}%</div>
      </div>
    </div>
  );
};

export default ProgressCircle;
