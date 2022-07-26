import React, {
  FC, SyntheticEvent, useCallback, useEffect, useRef, useState, memo
} from 'react';

import {Checked} from '../../common/ui-components/checked';
import {useIsFirstRender} from '../../common/hooks/useIsFirstRender';
import {Actions} from '../../utils/constants';

import {Task} from '../todo-page';

import {
  TodoTasksAction,
  TodoTasksTextarea,
  TodoTaskWrapper
} from './todo-tasks.styled';

interface ItemProps {
  task: Task;
  isTodoMode: boolean;
  isRemoveMode: boolean;
  taskManagement: (action: Actions, taskId: string | undefined, newMessage?: string) => void;
  updateAffectedTasks: (task: Task) => void;
}

export const TodoTaskItem: FC<ItemProps> = memo(({
  task, isTodoMode, isRemoveMode,
  taskManagement, updateAffectedTasks
}) => {
  const [isEditMode, setIsEditMode] = useState<boolean>(false);
  const [currentValue, setCurrentValue] = useState<string>(task.message);
  const [checked, setChecked] = useState<boolean>(false);
  const areaRef = useRef<HTMLTextAreaElement | null>(null);

  const isFirstRender = useIsFirstRender();

  const onUpdateTask = useCallback((): void => {
    const newMessage = currentValue.trim();
    setIsEditMode(!isEditMode);

    if (isEditMode && newMessage !== task.message) {
      taskManagement(Actions.EDIT, task.id, newMessage);
    }
  }, [currentValue, isEditMode, task, taskManagement]);

  useEffect(() => {
    if (areaRef.current && (isEditMode || isFirstRender)) {
      areaRef.current.style.height = 'auto';
      const scrollHeight = areaRef.current?.scrollHeight;
      areaRef.current.style.height = `${scrollHeight === 75 ? scrollHeight - 20 : scrollHeight}px`;
    }
  }, [currentValue, areaRef, isEditMode, isFirstRender]);

  useEffect(() => {
    if (isTodoMode) {
      setChecked(task.completed);
    }

    if (isRemoveMode || !isTodoMode) {
      setChecked(false);
    }
  }, [isTodoMode, isRemoveMode, task]);

  return (
    <TodoTaskWrapper>
      <TodoTasksAction isHide={!(isTodoMode || isRemoveMode)}>
        <Checked
          disabled={!(isTodoMode || isRemoveMode)}
          checked={checked}
          onChange={() => {
            if (isTodoMode || isRemoveMode) {
              setChecked(prevState => !prevState);
              updateAffectedTasks(task);
            }
          }}
        />
      </TodoTasksAction>

      <TodoTasksTextarea
        ref={areaRef}
        isEditMode={isEditMode}
        value={currentValue}
        onClick={onUpdateTask}
        onChange={(e: SyntheticEvent) => {
          if (isEditMode) {
            const target = e.target as HTMLTextAreaElement;
            setCurrentValue(target.value);
          }
        }}
      />
    </TodoTaskWrapper>
  );
});
