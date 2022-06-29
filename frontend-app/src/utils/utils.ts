import {DateBlock, Task} from '../components/todo-page';

import {MS_IN_DAY} from './constants';

export const uuid = () => {
  const mask = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx';
  let dt = new Date().getTime();

  return mask.replace(/[xy]/g, c => {
      const r = (dt + Math.random() * 16) % 16 | 0;
      dt = Math.floor(dt / 16);
      return (c === 'x' ? r : (r & 0x3) | 0x8).toString(16);
    }
  );
};

export const getFormattedDate = (date: Date) => {
  const formatDate = date.toLocaleDateString('en-US', {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).split(',');

  return `${formatDate[0]}.${formatDate[1]} ${formatDate[2]}`;
};

export const getCompletedListLength = (tasks: Array<Task>): number => {
  let counter = 0;

  tasks.forEach(task => {
    if (task.completed) {
      counter += 1;
    }
  })

  return counter;
};

export const getTasksWithoutDateBlocks = (tasks: Array<DateBlock>) => {
  const linerTasks: Array<Task> = [];
  tasks.forEach(dateBlock => dateBlock.tasks.forEach(task => linerTasks.push(task)));
  return linerTasks;
};

export const getWeekly = (currentDate: Date = new Date()) => {
  const oneJan: Date = new Date(currentDate.getFullYear(), 0, 1);
  return Math.ceil((((+currentDate - (+oneJan)) / MS_IN_DAY) + oneJan.getDay() + 1) / 7) - 1;
};
