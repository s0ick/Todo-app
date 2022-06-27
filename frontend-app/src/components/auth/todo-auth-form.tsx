import React, {FC, useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Checked} from '../../common/ui-components/checked';
import {useNotification} from '../../common/ui-components/notifications/notifications-provider';
import {PageButton, PageSubtitle} from '../../common/styled/ui-components';
import {SUBTITLE} from '../../utils/content-constants';

import {DateBlock, LocalStorageKeys} from '../todo-page';

import {
  TodoFormsWrapper,
  TodoFormsTitle,
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
        type: 'SUCCESS',
        message: 'You are logged in as a guest. Data will be stored in local storage',
        title: 'Welcome',
        delay: 30
      });
    }, [setIsGuest, notification]
  );

  return (
    <TodoFormsContent>
      <TodoFormsWrapper>
        <TodoFormsTitle>{'Authorization'}</TodoFormsTitle>
        <PageSubtitle>{SUBTITLE}</PageSubtitle>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'text'}
            name={'name'}
            value={name}
            pl={70}
            onInput={handleInput}
          />
          <label>{'Name:'}</label>
        </TodoFormsInputBlock>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'password'}
            name={'psw'}
            value={psw}
            pl={100}
            onInput={handleInput}
          />
          <label>{'Password:'}</label>
        </TodoFormsInputBlock>

        <TodoFormsCheckbox>
          <Checked
            checked={checked}
            onChange={handleChecked}
            label={'Remember me'}
          />
        </TodoFormsCheckbox>

        <TodoFormsButtonsWrapper>
          <PageButton accent>
            {'Sign in'}
          </PageButton>

          <NavLink to={'/registration'}>
            <PageButton accent={false}>
              {'Registration'}
            </PageButton>
          </NavLink>
        </TodoFormsButtonsWrapper>

        <TodoFormsGuest onClick={handleGuest}>
          {'Continue as a guest'}
        </TodoFormsGuest>
      </TodoFormsWrapper>

      <TodoFormsImgContainer>
        <img src={'./resources/bgi-1.jpg'} alt={'background-image'}/>
      </TodoFormsImgContainer>

    </TodoFormsContent>
  );
}
