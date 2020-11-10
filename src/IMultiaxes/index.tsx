/**
 * 多轴折线图
 */
import React from 'react';
import _ from 'lodash';
import { Chart, Axis, Tooltip, Legend, Line } from 'bizcharts';
import { ILineProps } from 'bizcharts/lib/g-components/Line';
import {
  IEvent,
  AxisCfg,
  IChartProps,
  IBaseGemoProps,
  ScaleOption,
} from 'bizcharts/lib/interface';
import { LegendItem } from '@antv/g2/lib/interface';

export interface IYAxisCfgItemProps {
  /** Y坐标轴线条颜色 */
  color: string;
  /** Y坐标轴字段 */
  yAxisField: string;
  /** Y坐标轴标题 */
  yAxisTitle: string;
  /** Y坐标轴配置属性 */
  yAxisConfig?: {};
  /** 线条配置  */
  lineConfig: IBaseGemoProps;
}

export interface IMultiaxesProps {
  /** 数据 */
  data: Array<any>;
  /** Chart组件(最外层画布)配置 */
  chartCfg?: IChartProps;
  /** X坐标轴字段 */
  xAxisField: string;
  /** X坐标轴标题 */
  xAxisTitle?: string;
  /** X坐标轴配置属性 */
  xAxisConfig?: AxisCfg;
  /** Y坐标轴配置列表 */
  yAxisCfgList: Array<IYAxisCfgItemProps>;
}

const IMultiaxes = (props: IMultiaxesProps) => {
  const {
    data = [],
    chartCfg = {},
    xAxisField,
    xAxisTitle = '',
    xAxisConfig = {},
    yAxisCfgList = [],
  } = props;
  const { scale = {}, ...restCfg } = chartCfg;

  let newScale: { [field: string]: ScaleOption } = {};
  let chartIns: import('@antv/g2/lib/chart/chart').default | null = null;
  const legendItems: Array<LegendItem> = [];

  newScale[`${xAxisField}`] = {
    alias: xAxisTitle,
  };

  yAxisCfgList.map(item => {
    if (item.yAxisField) {
      newScale[`${item.yAxisField}`] = {
        alias: item.yAxisTitle,
      };
    }

    legendItems.push({
      value: item.yAxisField,
      name: item.yAxisTitle,
      marker: {
        symbol: 'hyphen',
        style: { stroke: item.color, r: 5, lineWidth: 3 },
      },
    });
  });

  return (
    <Chart
      forceFit
      height={400}
      data={data}
      onGetG2Instance={(chart: import('@antv/g2/lib/chart/chart').default) => {
        chartIns = chart;
      }}
      scale={_.merge(scale, newScale)}
      {...restCfg}
    >
      <Tooltip shared showCrosshairs />

      {yAxisCfgList.map((item, index: number) => {
        return (
          <Line
            key={`line_${index}`}
            position={`${xAxisField}*${item.yAxisField}`}
            color={item.color}
            tooltip={[
              `${xAxisField}*${item.yAxisField}`,
              (xValue, yValue) => {
                return {
                  name: item.yAxisTitle,
                  value: yValue,
                  title: xValue,
                };
              },
            ]}
            {...(item.lineConfig as Omit<ILineProps, 'position'>)}
          />
        );
      })}

      <Axis name={xAxisField} title {...xAxisConfig} />

      {yAxisCfgList.map((item, index: number) => {
        return (
          <Axis
            title
            key={`axis_${index}`}
            name={item.yAxisField}
            {...item.yAxisConfig}
          />
        );
      })}

      <Legend
        custom={true}
        allowAllCanceled={true}
        items={legendItems}
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
    </Chart>
  );
};

export default IMultiaxes;
