import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButton, TodoFormsButtonsWrapper
} from './todo-forms.styled';

export function TodoRegistrationForm() {
  const [name, setName] = useState('');
  const [psw, setPsw] = useState('');
  const [repeat, setRepeat] = useState('');

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
        case 'r-psw':
          setRepeat(target.value);
          break;
        default: break;
      }
    }, []
  );

  return (
    <TodoFormsWrapper>
      <TodoFormsTitle>{'Registration'}</TodoFormsTitle>

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

      <TodoFormsInputBlock>
        <TodoFormsInput
          type={'password'}
          name={'r-psw'}
          value={repeat}
          pl={160}
          onInput={handleInput}
        />
        <label>{'Repeat password:'}</label>
      </TodoFormsInputBlock>

      <TodoFormsButtonsWrapper>
        <TodoFormsButton accent>
          {'Registration'}
        </TodoFormsButton>

        <NavLink to={'/auth'}>
          <TodoFormsButton accent={false}>
            {'Back'}
          </TodoFormsButton>
        </NavLink>
      </TodoFormsButtonsWrapper>
    </TodoFormsWrapper>
  );
}
