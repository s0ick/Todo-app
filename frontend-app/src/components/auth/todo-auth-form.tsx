import React, {useCallback, useState} from 'react';

import {Checked} from '../../common/ui-components/checked';

import {
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButton, TodoFormsButtonsWrapper, TodoFormsCheckbox
} from './todo-forms.styled';
import {NavLink} from 'react-router-dom';

export function TodoAuthForm() {
  const [name, setName] = useState('');
  const [psw, setPsw] = useState('');
  const [checked, setChecked] = useState(false);

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

  return (
    <TodoFormsWrapper>
      <TodoFormsTitle>{'Authorization'}</TodoFormsTitle>

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
    </TodoFormsWrapper>
  );
}
