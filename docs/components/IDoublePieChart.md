---
title: IDoublePieChart 双层饼图
order: 2
nav:
  title: 组件
  path: /components
toc: menu
---

# IDoublePieChart 双层饼图

饼图主要用于表示不同分类的占比情况。饼图中的每个扇形切片表现一个分类，扇形切片的弧度表示该分类在整体中的占比，所有切片构成一个整体，即 100%。

双层饼图主要是在百分比展示内容过多的情况下，通过适当的分类能够增加阅读清晰度和辨识度

## 代码演示

```tsx
import React from 'react';
import { IDoublePieChart } from 'ii-admin-charts';

const data = [
  { value: 648, type: '通知成功', name: '成功原因' },
  { value: 251, type: '通知失败', name: '失败原因一' },
  { value: 610, type: '通知失败', name: '失败原因二' },
  { value: 434, type: '通知失败', name: '失败原因三' },
  { value: 335, type: '通知失败', name: '失败原因四' },
];

export default () => (
  <IDoublePieChart
    data={data}
    chartCfg={{ height: 400 }}
    dataField="value"
    firstLayerField="type"
    firstIntervalCfg={{
      color: ['type', ['#5AD8A6', '#FF766D']],
    }}
    secondLayerField="name"
    secondIntervalCfg={{
      color: ['name', ['#5AD8A6', '#FF766D', '#FF9442', '#FFB882', '#CED3D8']],
    }}
  />
);
```

## API

IDoublePieChart 的属性说明如下：

| 属性              | 说明                                                                                                                                    | 类型   | 默认值 | 是否必须 |
| ----------------- | --------------------------------------------------------------------------------------------------------------------------------------- | ------ | ------ | -------- |
| data              | 数据源配置                                                                                                                              | array  | []     | 是       |
| chartCfg          | Chart 组件(最外层画布)配置，与 bizcharts 的[Chart 图表的 API](https://bizcharts.net/product/BizCharts4/category/62/page/77#api)保持一致 | object | {}     | 否       |
| dataField         | 扇形切片大小(弧度)所对应的数据字段名                                                                                                    | string | 无     | 是       |
| firstLayerField   | 第一层扇形颜色对应的数据字段名                                                                                                          | string | 无     | 是       |
| secondLayerField  | 第二层扇形颜色对应的数据字段名                                                                                                          | string | 无     | 是       |
| firstIntervalCfg  | 第一层区间配置，与 bizcharts 的[Interval 区间的 API](https://bizcharts.net/product/BizCharts4/category/62/page/84#api)保持一致          | object | 无     | 否       |
| secondIntervalCfg | 第二层区间配置，与 bizcharts 的[Interval 区间的 API](https://bizcharts.net/product/BizCharts4/category/62/page/84#api)保持一致          | object | 无     | 否       |
