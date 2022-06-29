import React, {FC, SyntheticEvent, useCallback, useEffect, useRef, useState} from 'react';

import {IconBack, IconComplete, IconDelete, IconEdit} from '../../common/ui-components/icons';
import {Actions, TypesList} from '../../utils/constants';

import {Task} from '../todo-page';

import {
  TodoTasksActions,
  TodoTasksIcon,
  TodoTasksMessage,
  TodoTasksTextarea,
  TodoTaskWrapper
} from './todo-tasks.styled';

interface ItemProps {
  date: string,
  typeList: string,
  task: Task,
  taskManagement: (action: Actions, date: string, task: Task, newMessage?: string) => void
}

export const TodoTasksItem: FC<ItemProps> = ({taskManagement, date, task, typeList}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(task.message);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const onUpdateTask = useCallback(
    (): void => {
      const newMessage = currentValue.trim();
      setIsEditMode(!isEditMode);

      if (isEditMode && newMessage === '') {
        taskManagement(Actions.DELETE, date, task);
        return;
      }

      if (isEditMode && newMessage !== task.message) {
        taskManagement(Actions.EDIT, date, task, newMessage);
      }
    }, [currentValue, isEditMode]
  );

  useEffect(() => {
    if (areaRef.current && isEditMode) {
      const scrollHeight = areaRef.current.scrollHeight;
      areaRef.current.style.height = `${scrollHeight}px`;
    }
  }, [currentValue, areaRef, isEditMode]);

  return (
    <TodoTaskWrapper>
      <TodoTasksActions>
        <TodoTasksIcon onClick={() => taskManagement(Actions.CHANGE_STATUS, date, task)}>
          {typeList === TypesList.ACT ? <IconComplete/> : <IconBack/>}
        </TodoTasksIcon>

        {typeList === TypesList.ACT && (
          <TodoTasksIcon
            onClick={onUpdateTask}
            isEditMode={isEditMode}
          >
            <IconEdit/>
          </TodoTasksIcon>
        )}

        <TodoTasksIcon onClick={() => taskManagement(Actions.DELETE, date, task)}>
          <IconDelete/>
        </TodoTasksIcon>
      </TodoTasksActions>

      {isEditMode &&
        <TodoTasksTextarea
          ref={areaRef}
          onChange={(e: SyntheticEvent) => {
            const target = e.target as HTMLTextAreaElement;
            setCurrentValue(target.value);
          }}
          value={currentValue}
        />
      }

      {!isEditMode &&
        <TodoTasksMessage>
          {task.message}
        </TodoTasksMessage>
      }
    </TodoTaskWrapper>
  );
};
