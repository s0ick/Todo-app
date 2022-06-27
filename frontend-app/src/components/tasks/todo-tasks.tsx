import React, {FC, useCallback} from 'react';

import {IconArrow} from '../../common/ui-components/icons';
import {getCompletedListLength} from '../../utils/utils';
import {useNotification} from '../../common/ui-components/notifications/notifications-provider';
import {PageWrapperContent} from '../../common/styled/ui-components';

import {Actions, DateBlock, Task} from '../todo-page';

import {TodoTaskForm} from './form/todo-task-form';
import {TodoTasksItem} from './todo-tasks-item';
import {
  TodoTasksWrapper,
  TodoTasksDateBlock,
  TodoTasksPanelControl,
  TodoTasksDateTitle,
  TodoTasksArrow,
  TodoTasksStatus,
  TodoTasksList,
  TodoTasksListActive,
  TodoTasksListCompleted
} from './todo-tasks.styled';

interface TodoTasksProps {
  tasks: Array<DateBlock>,
  setTask: (task: Task) => void,
  hideDateBlock: (date: string) => void,
  actionsForTasks: (actions: Actions, date: string, task: Task, newMessage?: string) => void,
}

export enum TypesList {
  COMP = 'completed',
  ACT = 'active'
}

export const TodoTasks: FC<TodoTasksProps> = ({
  tasks, setTask, hideDateBlock, actionsForTasks
}) => {
  const notification = useNotification();

  const taskManagement = useCallback(
    (action: Actions, date: string, task: Task, newMessage?: string): void => {
      actionsForTasks(action, date, task, newMessage);

      switch (action) {
        case Actions.CHANGE_STATUS:
          notification({
            type: 'SUCCESS',
            title: `Task ${!task.completed ? 'returned' : 'completed'}`,
            message: `Task added to the list of ${!task.completed ? 'active' : 'completed'} tasks`,
            delay: 20
          });
          break;
        case Actions.DELETE:
          notification({
            type: 'SUCCESS',
            message: 'Task removed',
            delay: 20
          });
          break;
        case Actions.EDIT:
          notification({
            type: 'SUCCESS',
            message: 'Task updated',
            delay: 20
          });
          break;
        default: break;
      }
    }, [actionsForTasks, notification]
  );

  return (
    <PageWrapperContent>
      <TodoTaskForm handleTask={setTask}/>

      <TodoTasksWrapper>
        {tasks.map(dateBlock => (
          <TodoTasksDateBlock
            key={`date_block_${dateBlock.date}`}
            isHide={dateBlock.isHide}
          >

            <TodoTasksPanelControl onClick={() => hideDateBlock(dateBlock.date)}>
              <TodoTasksArrow isHide={dateBlock.isHide}>
                <IconArrow/>
              </TodoTasksArrow>

              <TodoTasksDateTitle>
                {dateBlock.date}
              </TodoTasksDateTitle>

              <TodoTasksStatus>
                {`${getCompletedListLength(dateBlock.tasks)} / ${dateBlock.tasks.length}`}
              </TodoTasksStatus>
            </TodoTasksPanelControl>

            <TodoTasksList>
              {!dateBlock.isHide && (
                <>
                  <TodoTasksListActive>
                    {dateBlock.tasks.map(task => {
                      if (!task.completed) {
                        return (
                          <TodoTasksItem
                            key={`date_${dateBlock.date}_id_${task.id}_${task.dateCreated}`}
                            taskManagement={taskManagement}
                            date={dateBlock.date}
                            task={task}
                            typeList={TypesList.ACT}
                          />
                        );
                      }
                      return <React.Fragment key={`date_${dateBlock.date}_id_${task.id}_plug`}/>;
                    })}
                  </TodoTasksListActive>

                  <TodoTasksListCompleted>
                    {dateBlock.tasks.map(task => {
                      if (task.completed) {
                        return (
                          <TodoTasksItem
                            key={`date_${dateBlock.date}_id_${task.id}_${task.dateCreated}`}
                            taskManagement={taskManagement}
                            date={dateBlock.date}
                            task={task}
                            typeList={TypesList.COMP}
                          />
                        );
                      }

                      return <React.Fragment key={`date_${dateBlock.date}_id_${task.id}_plug`}/>;
                    })}
                  </TodoTasksListCompleted>
                </>
              )}
            </TodoTasksList>
          </TodoTasksDateBlock>
        ))}
      </TodoTasksWrapper>
    </PageWrapperContent>
  );
}
