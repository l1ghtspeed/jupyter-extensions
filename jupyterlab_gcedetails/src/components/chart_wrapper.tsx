import * as React from 'react';
import { stylesheet } from 'typestyle';
import { AreaChart, Area, Tooltip, CartesianGrid, YAxis } from 'recharts';
import { VictoryArea } from 'victory';

interface ChartProps {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  data: any[];
  dataKey: string;
  title: string;
  titleClass: string;
  chartColor: {
    stroke: string;
    fill: string;
  };
  areaChartProps: {};
  areaProps: {};
  cartesianGridProps: {};
  yAxisProps: {};
}

const STYLES = stylesheet({
  chartContainer: {
    paddingBottom: '5px',
    paddingTop: '5px',
  },
});

export function AreaChartWrapper(props: ChartProps) {
  const {
    data,
    dataKey,
    title,
    titleClass,
    chartColor,
    areaChartProps,
    areaProps,
    cartesianGridProps,
    yAxisProps,
  } = props;
  const victoryData = [];
  for (let i = 0; i < data.length; i++) {
    victoryData.push({ x: i, y: data[i][dataKey] });
  }
  return (
    <div className={STYLES.chartContainer}>
      <h1 className={titleClass}>{`${title} - ${
        data[data.length - 1][dataKey]
      }%`}</h1>
      <AreaChart {...areaChartProps} data={data}>
        <Area {...areaProps} {...chartColor} dataKey={dataKey} />
        <Tooltip />
        <CartesianGrid {...cartesianGridProps} />
        <YAxis {...yAxisProps} />
      </AreaChart>
      <VictoryArea data={victoryData} />
    </div>
  );
}
