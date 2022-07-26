import React, {
  FC, useCallback, useState, memo
} from 'react';

import {getCompletedListLength, getTitleDate} from '../../utils/utils';
import {IconArrow} from '../../common/ui-components/icons';
import {PageContent} from '../../common/styled/ui-components';
import {Actions, Languages} from '../../utils/constants';
import {Content} from '../../utils/content-constants';

import {DateBlock, Task, IAffectedTasks} from '../todo-page';

import {TodoTaskForm} from './form/todo-task-form';
import {TodoTaskItem} from './todo-task-item';
import {
  TodoTasksArrow,
  TodoTasksDateBlock,
  TodoTasksDateTitle,
  TodoTasksList,
  TodoTasksListActive,
  TodoTasksListCompleted,
  TodoTasksPanelControl,
  TodoTasksStatus, TodoTasksStub,
  TodoTasksWrapper
} from './todo-tasks.styled';

interface TodoTasksProps {
  lang: Languages;
  tasks: Array<DateBlock>;
  setTask: (task: Task) => void;
  hideDateBlock: (date: string) => void;
  deleteTasks: (tasks: IAffectedTasks) => void;
  editTask: (id: string, message: string) => void;
  changeStatusTask: (tasks: IAffectedTasks) => void;
}

export const TodoTasks: FC<TodoTasksProps> = memo(({
  lang, tasks, setTask, hideDateBlock,
  changeStatusTask, deleteTasks, editTask
}) => {
  const [isTodoMode, setIsTodoMode] = useState<boolean>(true);
  const [isRemoveMode, setIsRemoveMode] = useState<boolean>(false);
  const [affectedTasks, setAffectedTasks] = useState<IAffectedTasks | null>(null);

  const taskManagement = useCallback((action: Actions, taskId?: string, newMessage?: string): void => {
    switch (action) {
      case Actions.CHANGE_STATUS:
        setIsRemoveMode(false);
        if (isTodoMode && affectedTasks) {
          changeStatusTask(affectedTasks);
        }

        setIsTodoMode(prevState => !prevState);
        break;
      case Actions.DELETE:
        setIsTodoMode(false);
        if (isRemoveMode && affectedTasks) {
          deleteTasks(affectedTasks);
        }

        setIsRemoveMode(prevState => !prevState);
        break;
      case Actions.EDIT:
        if (taskId && newMessage) {
          const selectedTask: IAffectedTasks = {};
          selectedTask[taskId] = true;

          if (newMessage === '') {
            deleteTasks(selectedTask);
            break;
          }

          editTask(taskId, newMessage);
        }
        break;
      default: break;
    }

    setAffectedTasks(null);
  }, [isTodoMode, isRemoveMode, affectedTasks, changeStatusTask, deleteTasks, editTask]);

  const updateAffectedTasks = (task: Task) => {
    const taskId: string | undefined = task.id;

    if (taskId) {
      setAffectedTasks(prevState => {
        if (prevState) {
          const newState = {...prevState};
          newState[taskId] = true;
          return newState;
        }

        const newObj: IAffectedTasks = {};
        newObj[taskId] = true;
        return newObj;
      });
    }
  };

  return (
    <PageContent>
      <TodoTaskForm
        lang={lang}
        handleTask={setTask}
        isTodoMode={isTodoMode}
        isRemoveMode={isRemoveMode}
        taskManagement={taskManagement}
      />

      <TodoTasksWrapper>
        {!tasks.length && <TodoTasksStub>{Content.TASKS.STUB[lang]}</TodoTasksStub>}
        {tasks.map(dateBlock => (
          <TodoTasksDateBlock
            key={`date_block_${dateBlock.date}`}
            isHide={dateBlock.isHide}
          >

            <TodoTasksPanelControl
              isCompleted={getCompletedListLength(dateBlock.tasks) === dateBlock.tasks.length}
              onClick={() => hideDateBlock(dateBlock.date)}
            >
              <TodoTasksArrow isHide={dateBlock.isHide}>
                <IconArrow />
              </TodoTasksArrow>

              <TodoTasksDateTitle>
                {getTitleDate(dateBlock.date, lang)}
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
                          <TodoTaskItem
                            key={`date_${dateBlock.date}_id_${task.id}_${task.dateCreated}`}
                            task={task}
                            isTodoMode={isTodoMode}
                            isRemoveMode={isRemoveMode}
                            taskManagement={taskManagement}
                            updateAffectedTasks={updateAffectedTasks}
                          />
                        );
                      }
                      return null;
                    })}
                  </TodoTasksListActive>

                  <TodoTasksListCompleted>
                    {dateBlock.tasks.map(task => {
                      if (task.completed) {
                        return (
                          <TodoTaskItem
                            key={`date_${dateBlock.date}_id_${task.id}_${task.dateCreated}`}
                            task={task}
                            isTodoMode={isTodoMode}
                            isRemoveMode={isRemoveMode}
                            taskManagement={taskManagement}
                            updateAffectedTasks={updateAffectedTasks}
                          />
                        );
                      }

                      return null;
                    })}
                  </TodoTasksListCompleted>
                </>
              )}
            </TodoTasksList>
          </TodoTasksDateBlock>
        ))}
      </TodoTasksWrapper>
    </PageContent>
  );
});
