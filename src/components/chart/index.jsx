import React from 'react';
import ReactECharts from 'echarts-for-react';
function Chart({ score }) {
  const option = {
    series: [
      {
        type: 'gauge',
        startAngle: 180,
        endAngle: 0,
        center: ['50%', '75%'],
        radius: '90%',
        min: 0,
        max: 100,
        splitNumber: 5,
        axisLine: {
          lineStyle: {
            width: 6,
            color: [
              [0.25, '#f44b40'],
              [0.5, '#f4e47c'],
              [0.75, '#47b290'],
              [1, '#2677f4'],
            ],
          },
        },
        pointer: {
          icon: 'path://M12.8,0.7l12,40.1H0.7L12.8,0.7z',
          length: '12%',
          width: 20,
          offsetCenter: [0, '-60%'],
          itemStyle: {
            color: 'auto',
          },
        },
        title: {
          offsetCenter: [0, 0],
          fontSize: 20,
        },
        axisTick: {
          length: 12,
          lineStyle: {
            color: 'auto',
            width: 2,
          },
        },
        splitLine: {
          length: 20,
          lineStyle: {
            color: 'auto',
            width: 5,
          },
        },
        axisLabel: {
          color: '#464646',
          fontSize: 16,
          distance: -60,
          formatter: '{value}',
        },
        detail: {
          fontSize: 30,
          offsetCenter: [0, '-25%'],
          valueAnimation: true,
          formatter: '{value}점',
          color: 'inherit',
        },
        data: [
          {
            value: score,
            name: 'score',
          },
        ],
      },
    ],
  };

  return (
    <ReactECharts
      option={option}
      style={{ width: '100%', marginTop: '-100px', height: '500px' }}
    />
  );
}

export default Chart;
