import React, {FC, useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Checked} from '../../common/ui-components/checked';
import {useNotification} from '../../common/ui-components/notifications/notifications-provider';
import {PageButton} from '../../common/styled/ui-components';
import {Content} from '../../utils/content-constants';
import {LocalStorageKeys, NotificationTypes} from '../../utils/constants';

import {DateBlock} from '../todo-page';

import {
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsSubtitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButtonsWrapper,
  TodoFormsCheckbox,
  TodoFormsGuest,
  TodoFormsContent,
  TodoFormsImgContainer
} from './todo-forms.styled';

interface FormProps {
  setIsGuest: () => void;
  setTasks: (tasks: Array<DateBlock>) => void;
}

export const TodoAuthForm: FC<FormProps> = ({setIsGuest, setTasks}) => {
  const [name, setName] = useState('');
  const [psw, setPsw] = useState('');
  const [checked, setChecked] = useState(false);

  const notification = useNotification();

  const handleInput = useCallback(
    (event: React.FormEvent<EventTarget>) => {
      const target = event.target as HTMLInputElement;

      switch (target.name) {
        case 'name':
          setName(target.value);
          break;
        case 'psw':
          setPsw(target.value);
          break;
        default: break;
      }
    }, []
  );

  const handleChecked = useCallback(
    () => {
      setChecked(prevState => !prevState);
    }, []
  );

  const handleGuest = useCallback(
    () => {
      const tasks: Array<DateBlock> = JSON.parse(localStorage.getItem(LocalStorageKeys.TASKS) ?? '[]');

      setIsGuest();
      setTasks(tasks);

      notification({
        type: NotificationTypes.SUC,
        message: Content.NOTIFICATION.LOGIN.GUEST.TEXT.EN,
        title: Content.NOTIFICATION.LOGIN.GUEST.TITLE.EN,
        delay: 30
      });
    }, [setIsGuest, notification]
  );

  return (
    <TodoFormsContent>
      <TodoFormsWrapper>
        <TodoFormsTitle>{Content.AUTH.TITLE.EN}</TodoFormsTitle>
        <TodoFormsSubtitle>{Content.AUTH.SUBTITLE.EN}</TodoFormsSubtitle>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'text'}
            name={'name'}
            value={name}
            pl={70}
            onInput={handleInput}
          />
          <label>{Content.AUTH.FIELDS.NAME.EN}</label>
        </TodoFormsInputBlock>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'password'}
            name={'psw'}
            value={psw}
            pl={100}
            onInput={handleInput}
          />
          <label>{Content.AUTH.FIELDS.PSW.EN}</label>
        </TodoFormsInputBlock>

        <TodoFormsCheckbox>
          <Checked
            checked={checked}
            onChange={handleChecked}
            label={Content.AUTH.ACTIONS.REM_ME.EN}
          />
        </TodoFormsCheckbox>

        <TodoFormsButtonsWrapper>
          <PageButton accent>
            {Content.AUTH.ACTIONS.LOGIN.EN}
          </PageButton>

          <NavLink to={'/registration'}>
            <PageButton accent={false}>
              {Content.AUTH.ACTIONS.REG.EN}
            </PageButton>
          </NavLink>
        </TodoFormsButtonsWrapper>

        <TodoFormsGuest onClick={handleGuest}>
          {Content.AUTH.ACTIONS.GUEST.EN}
        </TodoFormsGuest>
      </TodoFormsWrapper>

      <TodoFormsImgContainer>
        <img src={'./resources/bgi-1.jpg'} alt={'background-image'}/>
      </TodoFormsImgContainer>

    </TodoFormsContent>
  );
}
