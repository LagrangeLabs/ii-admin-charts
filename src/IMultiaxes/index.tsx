/**
 * 双轴线
 */
import React from 'react';
import { Chart, Axis, Tooltip, Legend, Line } from 'bizcharts';
import { IEvent, AxisCfg, ScaleOption } from 'bizcharts/lib/interface';

export interface IDoubleaxesProps {
  /** 高度 */
  height: number;
  /** 数据 */
  data: Array<any>;
  /** 左Y坐标轴的字段 */
  left_y_axis_field: string;
  /** 左Y坐标轴的标题 */
  left_y_axis_title: string;
  /** 左Y坐标轴配置属性 */
  left_y_axis_config: AxisCfg;
  /** 右Y坐标轴的字段 */
  right_y_axis_field: string;
  /** 右Y坐标轴的标题 */
  right_y_axis_title: string;
  /** 右Y左标轴配置属性 */
  right_y_axis_config: AxisCfg;
  /** X坐标轴的字段 */
  x_axis_field: string;
  /** X坐标轴的标题 */
  x_axis_title: string;
  /** X坐标轴配置属性 */
  x_axis_config: AxisCfg;
  /** 列定义配置，用于配置数值的类型等，以 data 中的数据属性为key。 */
  scale?: {
    [field: string]: ScaleOption;
  };
  /** 折线颜色 */
  colors: Array<string>;
}

const Doubleaxes = (props: IDoubleaxesProps) => {
  const {
    height = 400,
    colors = ['#249efa', '#ff6600'],
    data = [],
    left_y_axis_field,
    left_y_axis_title = '',
    left_y_axis_config = {},
    right_y_axis_field,
    right_y_axis_title = '',
    right_y_axis_config = {},
    x_axis_field,
    x_axis_title = '',
    x_axis_config = {},
    scale,
  } = props;

  let chartIns: import('@antv/g2/lib/chart/chart').default | null = null;

  const newScale = scale || {
    // tickCount控制双轴的对齐
    people: {
      alias: left_y_axis_title,
    },
    waiting: {
      alias: right_y_axis_title,
    },
    time: {
      alias: x_axis_title,
    },
  };

  return (
    <Chart
      forceFit
      scale={newScale}
      height={height}
      data={data}
      onGetG2Instance={(chart: import('@antv/g2/lib/chart/chart').default) => {
        chartIns = chart;
      }}
    >
      <Axis name={left_y_axis_field} title {...left_y_axis_config} />
      <Axis name={right_y_axis_field} title {...right_y_axis_config} />
      <Axis name={x_axis_field} title {...x_axis_config} />

      <Legend
        custom={true}
        allowAllCanceled={true}
        items={[
          {
            value: left_y_axis_field,
            name: left_y_axis_title,
            marker: {
              symbol: 'hyphen',
              style: { stroke: colors[0], r: 5, lineWidth: 3 },
            },
          },
          {
            value: right_y_axis_field,
            name: right_y_axis_title,
            marker: {
              symbol: 'hyphen',
              style: { stroke: colors[1], r: 5, lineWidth: 3 },
            },
          },
        ]}
        onChange={(ev: IEvent | undefined) => {
          if (!ev || !chartIns) return;

          const item = ev.item;
          const value = item.value;
          const checked = !item.unchecked;
          const geoms = chartIns.geometries;

          for (let i = 0; i < geoms.length; i++) {
            const geom = geoms[i];

            if (geom.getYScale().field === value) {
              if (checked) {
                geom.show();
              } else {
                geom.hide();
              }
            }
          }
        }}
      />

      <Tooltip shared showCrosshairs />

      <Line
        position={`${x_axis_field}*${left_y_axis_field}`}
        color={colors[0]}
        tooltip={[
          `${x_axis_field}*${left_y_axis_field}`,
          (x_value, left_y_value) => {
            return {
              name: left_y_axis_title,
              value: left_y_value,
              title: x_value,
            };
          },
        ]}
      />

      <Line
        position={`${x_axis_field}*${right_y_axis_field}`}
        color={colors[1]}
        tooltip={[
          `${x_axis_field}*${right_y_axis_field}`,
          (x_value, right_y_value) => {
            return {
              name: right_y_axis_title,
              value: right_y_value,
              title: x_value,
            };
          },
        ]}
      />
    </Chart>
  );
};

export default Doubleaxes;
