import React, { useState } from 'react';
import { VictoryPie, VictoryAnimation } from 'victory';

const data = [
  { x: 'A', y: 40 },
  { x: 'B', y: 20 },
  { x: 'C', y: 30 },
  { x: 'D', y: 10 },
];

const MyPieChart = () => {
  const [hovered, setHovered] = useState(false);

  const handleMouseEnter = () => {
    setHovered(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
  };

  return (
    <div className="pie-chart-container">
      <VictoryPie
        data={data}
        innerRadius={50}
        labelRadius={70}
        style={{
          labels: {
            fontSize: 15,
            fill: 'white',
          },
          data: {
            fillOpacity: hovered ? 0.7 : 1,
            stroke: hovered ? 'black' : 'none',
            strokeWidth: hovered ? 2 : 0,
          },
        }}
        animate={{
          duration: 1000,
          onLoad: { duration: 1000 },
        }}
        colorScale={['#FF5722', '#FFC107', '#9C27B0', '#03A9F4']}
        events={[
          {
            target: 'data',
            eventHandlers: {
              onMouseEnter: handleMouseEnter,
              onMouseLeave: handleMouseLeave,
            },
          },
        ]}
      />
      <VictoryAnimation duration={1000} data={{ opacity: hovered ? 1 : 0 }}>
        {(style) => (
          <div
            className="pie-chart-tooltip"
            style={{ ...style, pointerEvents: 'none' }}
          >
            Hovered
          </div>
        )}
      </VictoryAnimation>
    </div>
  );
};

export default MyPieChart;
