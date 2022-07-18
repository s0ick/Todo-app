import React, {FC, useCallback, useState, memo} from 'react';

import {IconComplete, IconDelete} from '../../../common/ui-components/icons';
import {useNotification} from '../../../common/ui-components/notifications/notifications-provider';
import {PageButton} from '../../../common/styled/ui-components';
import {Actions, ButtonColors, Languages, NotificationTypes} from '../../../utils/constants';
import {Content} from '../../../utils/content-constants';

import {Task} from '../../todo-page';

import {TodoTaskFormContainer, TodoTaskFormInput, TodoTaskFormWrapper} from './todo-task-form.styled';

interface FormProps {
  handleTask: (task: Task) => void;
  lang: Languages;
  isTodoMode: boolean;
  isRemoveMode: boolean;
  taskManagement: (action: Actions) => void;
}

export const TodoTaskForm: FC<FormProps> = memo(({
  handleTask, lang, isTodoMode,
  isRemoveMode, taskManagement
}) => {
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
        dispatch({
          type: NotificationTypes.ERR,
          message: Content.NOTIFICATION.TASKS.ADD.ERROR[lang],
          delay: 12
        });
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
        type: NotificationTypes.SUC,
        message: Content.NOTIFICATION.TASKS.ADD.VALID[lang],
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
      <TodoTaskFormContainer>
        <TodoTaskFormInput
          type={'text'}
          placeholder={Content.TASKS.FORM.LABEL[lang]}
          autoComplete={'off'}
          value={message}
          onInput={handleInput}
          onKeyPress={pressEnter}
        />
        <PageButton
          onClick={addTask}
          bgc={ButtonColors.BLUE}
        >
          {Content.TASKS.FORM.BUTTONS.ADD[lang]}
        </PageButton>
      </TodoTaskFormContainer>
      <TodoTaskFormContainer>
        <PageButton
          onClick={() => taskManagement(Actions.CHANGE_STATUS)}
          bgc={ButtonColors.GREEN}
          isActive={isTodoMode}
        >
          <IconComplete size={16}/>
          {Content.TASKS.FORM.BUTTONS.COMPLETE[lang]}
        </PageButton>
        <PageButton
          onClick={() => taskManagement(Actions.DELETE)}
          bgc={ButtonColors.PURPLE}
          isActive={isRemoveMode}
        >
          <IconDelete size={15}/>
          {Content.TASKS.FORM.BUTTONS.REMOVE[lang]}
        </PageButton>
      </TodoTaskFormContainer>
    </TodoTaskFormWrapper>
  );
});
