import {DateBlock} from '../../components/todo-page';

import {Languages} from '../constants';
import {Content} from '../content-constants';
import {getWeekly} from '../utils';

export interface IBarStack {
  x: string;
  active: number;
  completed: number;
}

export const getFormattedBarStackData = (tasks: Array<DateBlock>, lang: Languages) => {
  const data: Array<IBarStack> = [
    {
      x: Content.BAR.DAYS.SUN[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.MON[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.TUES[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.WED[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.THU[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.FRI[lang],
      active: 0,
      completed: 0
    },
    {
      x: Content.BAR.DAYS.SAT[lang],
      active: 0,
      completed: 0
    }
  ];

  const currentDate: Date = new Date();
  const currentWeekly: number = getWeekly();
  let max = 0;

  tasks.forEach(dateBlock => {
    const targetDate = new Date(dateBlock.date);

    if (currentWeekly === getWeekly(targetDate) && currentDate.getFullYear() === targetDate.getFullYear()) {
      let activeCounter = 0;
      let completedCounter = 0;
      const day = targetDate.getDay();

      dateBlock.tasks.forEach(task => {
        activeCounter = task.completed ? activeCounter : activeCounter + 1;
        completedCounter = task.completed ? completedCounter + 1 : completedCounter;
      });

      data[day].active = activeCounter;
      data[day].completed = completedCounter;
      max = Math.max(max, activeCounter + completedCounter);
    }
  });

  return {data, max};
};
