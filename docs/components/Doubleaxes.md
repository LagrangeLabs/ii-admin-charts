---
title: Doubleaxes 双轴线图
order: 2
nav:
  title: 组件 
  path: /components
toc: menu
---

# Doubleaxes 双轴线

## 代码演示

```tsx
import React from 'react';
import { Doubleaxes } from 'ii-admin-charts';

const data = [
  {
    time: '2020-07-02 10:10',
    call: 4,
    waiting: 20,
    people: 2,
  },
  {
    time: '2020-07-02 10:15',
    call: 2,
    waiting: 30,
    people: 3,
  },
  {
    time: '2020-07-02 10:20',
    call: 13,
    waiting: 18,
    people: 5,
  },
  {
    time: '2020-07-02 10:25',
    call: 9,
    waiting: 19,
    people: 1,
  },
  {
    time: '2020-07-02 10:30',
    call: 5,
    waiting: 2,
    people: 3,
  },
  {
    time: '2020-07-02 10:35',
    call: 8,
    waiting: 2,
    people: 1,
  },
  {
    time: '2020-07-02 10:40',
    call: 13,
    waiting: 1,
    people: 2,
  },
];

const scale = {
  // tickCount控制双轴的对齐
  people: {
    alias: '进入次数',
    min: 0,
    max: 10,
    tickCount: 5,
  },
  waiting: {
    alias: '平均时长',
    min: 0,
    max: 40,
    tickCount: 5,
  },
  time: {
    alias: '时间（秒）',
  },
};

export default () => <Doubleaxes
          left_y_axis_field="waiting"
          left_y_axis_title="进入次数"
          right_y_axis_field="people"
          right_y_axis_title="平均时长"
          x_axis_field="time"
          data={data}
          scale={scale}
        />;
```
