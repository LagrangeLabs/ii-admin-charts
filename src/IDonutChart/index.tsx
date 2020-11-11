import React from 'react';
import { DonutChart } from 'bizcharts';
import { DonutConfig } from '@antv/g2plot/lib/plots/donut';

export interface IDonutChartProps extends DonutConfig {
  /** 扇形切片大小（弧度）所对应的数据字段名 */
  angleField: string;
  /** 扇形颜色映射对应的数据字段名 */
  colorField?: string;
}

const IDonutChart = (props: IDonutChartProps) => {
  const { data = [], angleField, colorField = '', ...extraProps } = props;

  return (
    <DonutChart
      angleField={angleField}
      colorField={colorField}
      innerRadius={0.55}
      legend={{ position: 'bottom-center' }}
      statistic={{ visible: false }}
      tooltip={{ visible: false }}
      data={data || []}
      label={{
        visible: true,
        type: 'outer',
        formatter: (text, item) => {
          return `${item._origin[`${colorField}`]}: ${(
            item.percent * 100
          ).toFixed(2)} %`;
        },
      }}
      {...extraProps}
    />
  );
};

export default IDonutChart;
