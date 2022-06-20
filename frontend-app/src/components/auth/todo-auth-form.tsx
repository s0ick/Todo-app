import React, {FC, useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {Checked} from '../../common/ui-components/checked';
import {useNotification} from '../../common/ui-components/notifications/notifications-provider';
import {PageSubtitle} from '../../common/styled/ui-components';
import {SUBTITLE} from '../../utils/content-constants';

import {
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButton,
  TodoFormsButtonsWrapper,
  TodoFormsCheckbox,
  TodoFormsGuest,
  TodoFormsContent,
  TodoFormsImgContainer
} from './todo-forms.styled';

interface FormProps {
  setIsGuest: () => void;
}

export const TodoAuthForm: FC<FormProps> = ({setIsGuest}) => {
  const [name, setName] = useState('');
  const [psw, setPsw] = useState('');
  const [checked, setChecked] = useState(false);

  const dispatch = useNotification();

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
      setIsGuest();
      dispatch({
        type: 'SUCCESS',
        message: 'You are logged in as a guest. Data will be stored in local storage',
        title: 'Welcome'
      });
    }, [setIsGuest, dispatch]
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
          <TodoFormsButton accent>
            {'Sign in'}
          </TodoFormsButton>

          <NavLink to={'/registration'}>
            <TodoFormsButton accent={false}>
              {'Registration'}
            </TodoFormsButton>
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
