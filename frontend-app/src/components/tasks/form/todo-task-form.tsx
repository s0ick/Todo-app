import React, {useCallback, useState, FC} from 'react';

import {useNotification} from '../../../common/ui-components/notifications/notifications-provider';

import {Task} from '../../todo-page';

import {TodoTaskFormInputBlock, TodoTaskFormWrapper, TodoTaskFormInput, TodoTaskButton} from './todo-task-form.styled';

interface FormProps {
  handleTask: (task: Task) => void;
}

export const TodoTaskForm: FC<FormProps> = ({handleTask}) => {
  const [message, setMessage] = useState('');
  const dispatch = useNotification();

  const handleInput = useCallback(
    (event: React.FormEvent<EventTarget>) => {
      const target = event.target as HTMLInputElement;
      setMessage(target.value);
    }, []
  );

  const addTask = useCallback(
    () => {
      if (!message.trim()) {
        return;
      }

      handleTask({
        dateCreated: new Date(),
        dateCompleted: null,
        completed: false,
        message: message.trim()
      });

      setMessage('');
      dispatch({
        type: 'SUCCESS',
        message: 'Task created',
        delay: 8
      });
    }, [message, handleTask, dispatch]
  );

  const pressEnter = useCallback(
    (event: React.KeyboardEvent<object>) => {
      if (event.code === 'Enter') {
        addTask();
      }
    }, [addTask]
  );

  return (
    <TodoTaskFormWrapper>
      <TodoTaskFormInputBlock>
        <TodoTaskFormInput
          type={'text'}
          name={'new-task'}
          value={message}
          pl={80}
          onInput={handleInput}
          onKeyPress={pressEnter}
        />
        <label>{'Message:'}</label>
      </TodoTaskFormInputBlock>
      <TodoTaskButton onClick={addTask}>
        {'Add'}
      </TodoTaskButton>
    </TodoTaskFormWrapper>
  );
}
