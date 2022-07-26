import {
  uuid,
  getFormattedDate,
  getCompletedListLength,
  getWeekly,
  getTasksWithoutDateBlocks,
  binarySearch
} from './utils';

describe('Common utils', () => {
  const date = new Date(2022, 6, 28);
  const testData = [
    {
      date: getFormattedDate(date),
      isHide: false,
      tasks: [
        {
          id: '1',
          dateCreated: new Date(),
          dateCompleted: new Date(),
          completed: true,
          message: 'Task 1'
        },
        {
          id: '2',
          dateCreated: new Date(),
          dateCompleted: null,
          completed: false,
          message: 'Task 2'
        },
        {
          id: '3',
          dateCreated: new Date(),
          dateCompleted: new Date(),
          completed: true,
          message: 'Task 3'
        }
      ]
    }
  ];

  it('Generate uuid', () => {
    const received = 36;
    const expected = uuid();

    expect(received).toBe(expected.length);
  });

  it('Formatted date', () => {
    const received = new Date();
    const expected = getFormattedDate();

    expect(received.getDay()).toBe(new Date(expected).getDay());
    expect(received.getMonth()).toBe(new Date(expected).getMonth());
    expect(received.getFullYear()).toBe(new Date(expected).getFullYear());
  });

  it('Formatted date (EN)', () => {
    const received = 'Thursday. July 28 2022';
    const expected = getFormattedDate(date);

    expect(received).toEqual(expected);
  });

  it('Formatted date (RU)', () => {
    const received = 'четверг. 28 июля 2022';
    const expected = getFormattedDate(date, 'ru');

    expect(received).toEqual(expected);
  });

  it('Must get a valid length completed tasks list', () => {
    const received = 2;
    const expected = getCompletedListLength(testData[0].tasks);

    expect(received).toEqual(expected);
  });

  it('Must get a valid task list', () => {
    const received = testData[0].tasks;
    const expected = getTasksWithoutDateBlocks(testData);

    expect(received).toEqual(expected);
  });

  it('Must get a valid week number', () => {
    const received = 30;
    const expected = getWeekly(date);

    expect(received).toEqual(expected);
  });

  it('Should working binary search', () => {
    const received = testData[0];
    const expected = binarySearch(testData, date);

    expect(received).toEqual(expected);
  });

  it('Binary search should not work', () => {
    const received = null;
    const expected = binarySearch(testData, new Date(2022, 7, 25));

    expect(received).toEqual(expected);
  });
});
