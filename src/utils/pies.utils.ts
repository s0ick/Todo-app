import {DateBlock, Task} from '../components/todo-page';

import {getTasksWithoutDateBlocks, getWeekly} from './utils';
import {Content} from './content-constants';
import {Languages} from './constants';

export interface Segment {
  label: string;
  value: number;
}

export const getFormattedPiesData = (tasks: Array<DateBlock>, lang: Languages) => {
  const outerActive: Segment = {label: Content.PIES.OUTER.ACT[lang], value: 0};
  const outerCompleted: Segment = {label: Content.PIES.OUTER.COMP[lang], value: 0};
  const innerActive: Segment = {label: Content.PIES.INNER.ACT[lang], value: 0};
  const innerCompleted: Segment = {label: Content.PIES.INNER.COMP[lang], value: 0};

  const linerTasks: Array<Task> = getTasksWithoutDateBlocks(tasks);

  const currentDate: Date = new Date();
  const currentWeekly: number = getWeekly();

  linerTasks.forEach((task: Task) => {
    const taskDateCreated = new Date(task.dateCreated);
    const taskWeekly: number = getWeekly(taskDateCreated);

    if (currentWeekly === taskWeekly && currentDate.getFullYear() === taskDateCreated.getFullYear()) {
      if (task.completed) {
        innerCompleted.value += 1;
      }

      if (!task.completed) {
        innerActive.value += 1;
      }
    }

    if (task.completed) {
      outerCompleted.value += 1;
    }

    if (!task.completed) {
      outerActive.value += 1;
    }
  });

  return {
    outer: [outerActive, outerCompleted],
    inner: [innerActive, innerCompleted]
  };
};
