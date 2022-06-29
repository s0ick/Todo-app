import React, {useCallback, useState} from 'react';
import {NavLink} from 'react-router-dom';

import {PageButton} from '../../common/styled/ui-components';
import {Content} from '../../utils/content-constants';

import {
  TodoFormsContent,
  TodoFormsWrapper,
  TodoFormsTitle,
  TodoFormsInputBlock,
  TodoFormsInput,
  TodoFormsButtonsWrapper,
  TodoFormsImgContainer, TodoFormsSubtitle
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
        <TodoFormsTitle>{Content.REG.TITLE.EN}</TodoFormsTitle>
        <TodoFormsSubtitle>{Content.REG.SUBTITLE.EN}</TodoFormsSubtitle>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'text'}
            name={'name'}
            value={name}
            pl={70}
            onInput={handleInput}
          />
          <label>{Content.REG.FIELDS.NAME.EN}</label>
        </TodoFormsInputBlock>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'password'}
            name={'psw'}
            value={psw}
            pl={100}
            onInput={handleInput}
          />
          <label>{Content.REG.FIELDS.PSW.EN}</label>
        </TodoFormsInputBlock>

        <TodoFormsInputBlock>
          <TodoFormsInput
            type={'password'}
            name={'r-psw'}
            value={repeat}
            pl={160}
            onInput={handleInput}
          />
          <label>{Content.REG.FIELDS.R_PSW.EN}</label>
        </TodoFormsInputBlock>

        <TodoFormsButtonsWrapper>
          <PageButton accent onClick={handleClick}>
            {Content.REG.ACTIONS.REG.EN}
          </PageButton>

          <NavLink to={'/auth'}>
            <PageButton accent={false}>
              {Content.REG.ACTIONS.BACK.EN}
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
