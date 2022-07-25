import {scaleLinear, scaleTime} from '@visx/scale';

import {DateBlock} from '../components/todo-page';

import {binarySearch} from './utils';

export interface ITimeline {
  x: Date;
  active: number;
  completed: number;
}

export interface IMargin {
  top: number;
  left: number;
  right: number;
  bottom: number;
}

interface TimelineOptions {
  getDate: (d: ITimeline) => number;
  data: Array<ITimeline>;
  margin: IMargin;
  width: number;
  height: number;
}

export const getFormattedTimelineData = (tasks: Array<DateBlock>) => {
  const data: Array<ITimeline> = [];
  const reverseTasks = [...tasks].reverse();
  let date: Date = new Date(reverseTasks[0].date);

  while (date <= new Date()) {
    const segment: ITimeline = {
      x: new Date(date),
      active: 0,
      completed: 0
    };

    const dateBlock: DateBlock | null = binarySearch(reverseTasks, date);

    if (dateBlock) {
      dateBlock.tasks.forEach(task => {
        if (task.completed) {
          segment.completed += 1;
        }

        if (!task.completed) {
          segment.active += 1;
        }
      });
    }

    data.push(segment);
    date.setDate(date.getDate() + 1);
  }

  return data;
};

export const getTimelineOptions = ({getDate, data, width, height, margin}: TimelineOptions) => {
  const xMax = width - margin.left - margin.right;
  const yMax = height - margin.top - margin.bottom;
  const domains = data.map(getDate);

  const xScale = scaleTime<number>({
    range: [0, xMax],
    domain: [
      Math.min(...domains),
      Math.max(...domains)
    ]
  });

  const yScale = scaleLinear<number>({
    range: [yMax, 0],
    domain: [
      Math.min(...data.map(d => Math.min(d.active, d.completed))),
      Math.max(...data.map(d => Math.max(d.active, d.completed)))
    ],
    nice: true
  });

  return {
    xMax, yMax,
    xScale, yScale
  };
};
