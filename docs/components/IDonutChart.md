---
title: IDonutChart 环图
order: 1
nav:
  title: 组件
  path: /components
toc: menu
---

# IDonutChart 环图

环图，甜甜圈图

环图与饼图基本功能类似，用于比较整体和部分的关系，每个弧形切片表示整体中的一个分类。由饼图挖空中心部分构成，通常在中心部分会放置解释性文本。

## 代码演示

```tsx
import React from 'react';
import { IDonutChart } from 'ii-admin-charts';

const data = [
  {
    type: '分类一',
    value: 27,
  },
  {
    type: '分类二',
    value: 25,
  },
  {
    type: '分类三',
    value: 18,
  },
  {
    type: '分类四',
    value: 15,
  },
  {
    type: '分类五',
    value: 10,
  },
  {
    type: '其它',
    value: 5,
  },
];

export default () => <IDonutChart
          data={data}
          angleField="value"
          colorField="type" 
        />
```

## API

IDonutChart 的属性说明如下：

| 属性 | 说明 | 类型 | 默认值 | 版本 |
| --- | --- | --- | --- | --- |
| angleField | 扇形切片大小（弧度）所对应的数据字段名 | string | 无 |  |
| colorField | 扇形颜色映射对应的数据字段名 | string | 无 |  |

支持 bizcharts 原生 [DonutChart](https://bizcharts.net/product/BizCharts4/category/77/page/131) 的其他所有属性。
