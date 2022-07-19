import {DateBlock} from '../components/todo-page';

import {binarySearch} from './utils';

export interface ITimeline {
  x: Date;
  active: number;
  completed: number;
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
