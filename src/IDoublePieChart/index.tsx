import React from 'react';
import {
  Chart,
  Interval,
  Tooltip,
  Legend,
  View,
  Axis,
  Coordinate,
} from 'bizcharts';
import DataSet from '@antv/data-set';
import { IChartProps, IBaseGemoProps } from 'bizcharts/lib/interface';

export interface IDoublePieChartProps {
  /** 数据源配置 */
  data: Array<any>;
  /** Chart组件(最外层画布)配置 */
  chartCfg: IChartProps;
  /** 扇形切片大小(弧度)所对应的数据字段名 */
  dataField: string;
  /** 第一层扇形颜色对应的数据字段名 */
  firstLayerField: string;
  /** 第二层扇形颜色对应的数据字段名 */
  secondLayerField: string;
  /** 第一层区间配置 */
  firstIntervalCfg?: IBaseGemoProps;
  /** 第二层区间配置 */
  secondIntervalCfg?: IBaseGemoProps;
}

const IDoublePieChart = (props: IDoublePieChartProps) => {
  const {
    data = [],
    chartCfg = {},
    dataField,
    firstLayerField,
    secondLayerField,
    firstIntervalCfg = {},
    secondIntervalCfg = {},
  } = props;

  const parentDv = new DataSet.DataView(); // 创建并返回数据视图实例

  // dv.source: 载入数据;
  // dv.transform: 执行数据处理
  // dv.rows: 存储处理后的数据
  parentDv.source(data).transform({
    type: 'percent', //'percent': 统计某个维度下某个字段的值和占总和的比例
    field: dataField, // field: 统计发生的字段
    dimension: firstLayerField, //dimension: 统计的维度字段
    as: 'percent', // as: 结果存储在 percent 字段
  });

  const subDv = new DataSet.DataView();
  subDv.source(data).transform({
    type: 'percent',
    field: dataField,
    dimension: secondLayerField,
    as: 'percent',
  });

  return (
    <Chart
      autoFit
      height={400}
      data={parentDv.rows}
      scale={{
        percent: {
          formatter: (value: number) => {
            const percent = (value * 100).toFixed(2) + '%';

            return percent;
          },
        },
      }}
      {...chartCfg}
    >
      <Coordinate type="theta" radius={0.5} />
      <Axis visible={false} />
      <Legend visible={true} />
      <Tooltip showTitle={false} />

      <Interval
        element-highlight
        position="percent"
        adjust="stack"
        color={firstLayerField}
        style={{ lineWidth: 1, stroke: '#fff' }}
        label={[
          firstLayerField,
          {
            offset: -15,
          },
        ]}
        {...firstIntervalCfg}
      />

      <View data={subDv.rows}>
        <Coordinate type="theta" radius={0.75} innerRadius={0.5 / 0.75} />
        <Interval
          element-highlight
          position="percent"
          adjust="stack"
          label={secondLayerField}
          style={{ lineWidth: 1, stroke: '#fff' }}
          color={[
            secondLayerField,
            ['#BAE7FF', '#7FC9FE', '#71E3E3', '#ABF5F5', '#8EE0A1', '#BAF5C4'],
          ]}
          {...secondIntervalCfg}
        />
      </View>
    </Chart>
  );
};

export default IDoublePieChart;
