import {DateBlock, Task} from '../components/todo-page';

import {Languages, MS_IN_DAY} from './constants';

export const createUniqArray = (array: Array<any>) => Array.from(new Set(array));

export const hexToRgb = (hex: string) => {
  const rgbHex = hex.match(/.{1,2}/g);

  if (!rgbHex) {
    return 'Some Error';
  }

  return [
    parseInt(rgbHex[0], 16),
    parseInt(rgbHex[1], 16),
    parseInt(rgbHex[2], 16)
  ];
}

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

export const getFormattedDate = (date: Date, local: string = 'en-US') => {
  const formatDate = date.toLocaleDateString(local, {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  }).split(',');

  if (local === 'ru') {
    return `${formatDate[0]}.${formatDate[1].substring(0, formatDate[1].length - 3)}`;
  }

  return `${formatDate[0]}.${formatDate[1]}${formatDate[2]}`;
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

export const getTitleDate = (date: string, lang: Languages) => {
  const dateBlock = new Date(date);
  const currentWeekly = getWeekly();
  const currentYear = new Date().getFullYear();
  const local = lang === Languages.EN ? 'en-US' : 'ru';

  const formatDate = getFormattedDate(dateBlock, local);

  if (getWeekly(dateBlock) === currentWeekly) {
    return formatDate.split('.')[0];
  }

  if (dateBlock.getFullYear() === currentYear) {
    return formatDate.substring(0, formatDate.length - 4);
  }

  return date;
};
