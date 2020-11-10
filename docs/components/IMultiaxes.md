---
title: IMultiaxes 多轴线图
order: 10
nav:
  title: 组件
  path: /components
toc: menu
---

# IMultiaxes 多轴线图

## 代码演示

```tsx
/**
 * title: 双 Y 轴
 * desc: 当两个图层的横轴数据维度相同，纵轴维度不同时，即可绘制双 Y 轴。
 */

import React from 'react';
import { IMultiaxes } from 'ii-admin-charts';

const data = [
  {
    time: '2020-07-02 10:10',
    enter: 20,
    averageRate: 60,
  },
  {
    time: '2020-07-02 10:15',
    enter: 30,
    averageRate: 30,
  },
  {
    time: '2020-07-02 10:20',
    enter: 18,
    averageRate: 50,
  },
  {
    time: '2020-07-02 10:25',
    enter: 19,
    averageRate: 10,
  },
  {
    time: '2020-07-02 10:30',
    enter: 2,
    averageRate: 80,
  },
  {
    time: '2020-07-02 10:35',
    enter: 2,
    averageRate: 10,
  },
  {
    time: '2020-07-02 10:40',
    enter: 1,
    averageRate: 20,
  },
];

const scale = {
  enter: {
    min: 0,
    max: 40,
  },
  averageRate: {
    min: 0,
    max: 100,
  },
  time: {},
};

const CHART_CONFIG = {
  xAxisField: 'time',
  xAxisTitle: '时间(秒)',
  yAxisCfgList: [
    {
      color: '#249efa',
      yAxisField: 'enter',
      yAxisTitle: '进入次数',
    },
    {
      color: '#ff6600',
      yAxisField: 'averageRate',
      yAxisTitle: '平均使用率(%)',
      yAxisConfig: {},
      lineConfig: {
        tooltip: [
          `time*averageRate`,
          (xValue, yValue) => {
            return {
              name: '平均使用率(%)',
              value: `${yValue} %`,
              title: xValue,
            };
          },
        ],
      },
    },
  ],
};

export default () => (
  <IMultiaxes chartCfg={{ scale }} data={data} {...CHART_CONFIG} />
);
```

```tsx
/**
 * title: 多 Y 轴
 * desc: 当多个图层的横轴数据维度相同，纵轴维度不同时，即可绘制多 Y 轴。
 */
import React from 'react';
import { IMultiaxes } from 'ii-admin-charts';

const data = [
  {
    time: '2020-07-02 10:10',
    call: 24,
    enter: 80,
    averageRate: 30,
  },
  {
    time: '2020-07-02 10:15',
    call: 12,
    enter: 30,
    averageRate: 40,
  },
  {
    time: '2020-07-02 10:20',
    call: 30,
    enter: 20,
    averageRate: 50,
  },
  {
    time: '2020-07-02 10:25',
    call: 9,
    enter: 19,
    averageRate: 10,
  },
  {
    time: '2020-07-02 10:30',
    call: 15,
    enter: 21,
    averageRate: 30,
  },
  {
    time: '2020-07-02 10:35',
    call: 28,
    enter: 12,
    averageRate: 10,
  },
  {
    time: '2020-07-02 10:40',
    call: 13,
    enter: 5,
    averageRate: 90,
  },
];

const scale = {
  call: {
    min: 0,
    max: 100,
  },
  averageRate: {
    min: 0,
    max: 100,
  },
  enter: {
    min: 0,
    max: 100,
  },
  time: {
    type: 'timeCat',
    mask: 'YYYY-MM-DD', // 数据格式
  },
};

const CHART_CONFIG = {
  xAxisField: 'time',
  xAxisTitle: '时间(秒)',
  yAxisCfgList: [
    {
      color: '#112235',
      yAxisField: 'call',
      yAxisTitle: '呼叫次数',
      yAxisConfig: {
        title: false,
      },
    },
    {
      color: '#249efa',
      yAxisField: 'enter',
      yAxisTitle: '进入次数',
      yAxisConfig: {
        title: false,
      },
    },
    {
      color: '#ff6600',
      yAxisField: 'averageRate',
      yAxisTitle: '平均使用率(%)',
      yAxisConfig: {},
      lineConfig: {
        tooltip: [
          `time*averageRate`,
          (xValue, yValue) => {
            return {
              name: '平均使用率(%)',
              value: `${yValue} %`,
              title: xValue,
            };
          },
        ],
      },
    },
  ],
};

export default () => (
  <IMultiaxes chartCfg={{ scale }} data={data} {...CHART_CONFIG} />
);
```

## API

#### IMultiaxes

| 属性         | 说明                                                                                                                                     | 类型                 | 默认值 | 是否必须 |
| ------------ | ---------------------------------------------------------------------------------------------------------------------------------------- | -------------------- | ------ | -------- |
| data         | 数据源                                                                                                                                   | array                | []     | 是       |
| chartCfg     | Chart 组件(最外层画布)配置，与 bizcharts 的 [Chart 图表的 API](https://bizcharts.net/product/BizCharts4/category/62/page/77#api)保持一致 | object               | {}     | 否       |
| xAxisField   | X 坐标轴字段                                                                                                                             | string               |        | 是       |
| xAxisTitle   | X 坐标轴标题                                                                                                                             | string               |        | 是       |
| yAxisCfgList | Y 坐标轴配置列表                                                                                                                         | Array<yAxisCfgItem\> | []     | 是       |

#### yAxisCfgItem

| 属性        | 说明                                                                                                                | 类型   | 默认值 | 是否必须 |
| ----------- | ------------------------------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
| color       | Y 坐标轴线条颜色                                                                                                    | string |        | 是       |
| yAxisField  | Y 坐标轴字段                                                                                                        | string |        | 是       |
| yAxisTitle  | Y 坐标轴标题                                                                                                        | string |        | 是       |
| yAxisConfig | Y 坐标轴配置属性，与 bizcharts 的 [Axis 坐标轴的 API](https://bizcharts.net/product/BizCharts4/category/62/page/79) | object |        | 否       |
| lineConfig  | 线条配置，与 bizcharts 的 [Line 图表的 API](https://bizcharts.net/product/BizCharts4/category/62/page/83)保持一致   | object | {}     | 否       |
