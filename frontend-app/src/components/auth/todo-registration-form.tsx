import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {PageButton, PageSubtitle} from '../../common/styled/ui-components';
import {SUBTITLE} from '../../utils/content-constants';

import {
  TodoFormsContent,
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButtonsWrapper,
  TodoFormsImgContainer
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

  const handleClick = useCallback(
    () => {

    }, []
  );

  return (
    <TodoFormsContent>
      <TodoFormsWrapper>
        <TodoFormsTitle>{'Registration'}</TodoFormsTitle>
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
          <PageButton accent onClick={handleClick}>
            {'Registration'}
          </PageButton>

          <NavLink to={'/auth'}>
            <PageButton accent={false}>
              {'Back'}
            </PageButton>
          </NavLink>
        </TodoFormsButtonsWrapper>
      </TodoFormsWrapper>

      <TodoFormsImgContainer>
        <img src={'./resources/bgi-1.jpg'} alt={'background-image'}/>
      </TodoFormsImgContainer>
    </TodoFormsContent>
  );
}
