import React, {
  FC, memo, useCallback, useState
} from 'react';

import {Checked} from '../../common/ui-components/checked';
import {PageButton, PageSubtitle, PageTitle} from '../../common/styled/ui-components';
import {ButtonColors, Languages, LocalStorageKeys} from '../../utils/constants';
import {Content} from '../../utils/content-constants';

import {DateBlock} from '../todo-page';

import {
  TodoAuthWrapper,
  TodoAuthActionsBlock,
  TodoAuthInput,
  TodoAuthCheckbox,
  TodoAuthGuest,
  TodoAuthSubtitle
} from './todo-auth-form.styled';

interface FormProps {
  setIsGuest: () => void;
  setTasks: (tasks: Array<DateBlock>) => void;
  lang: Languages;
}

export const TodoAuthForm: FC<FormProps> = memo(({setIsGuest, setTasks, lang}) => {
  const [name, setName] = useState<string>('');
  const [psw, setPsw] = useState<string>('');
  const [rPsw, setRPsw] = useState<string>('');
  const [checked, setChecked] = useState<boolean>(false);
  const [registrationMode, setRegistrationMode] = useState<boolean>(false);

  const clear = () => {
    setName('');
    setPsw('');
    setRPsw('');
    setChecked(false);
  };

  const handleInput = useCallback((event: React.FormEvent<EventTarget>) => {
    const target = event.target as HTMLInputElement;

    switch (target.name) {
      case 'name':
        setName(target.value);
        break;
      case 'psw':
        setPsw(target.value);
        break;
      case 'r-psw':
        setRPsw(target.value);
        break;
      default: break;
    }
  }, []);

  const handleRegistration = useCallback(() => {
    if (!registrationMode) {
      clear();
      setRegistrationMode(true);
    }

    // ...code
  }, [registrationMode]);

  const handleMultipleAction = useCallback(() => {
    if (registrationMode) {
      clear();
      setRegistrationMode(false);
    }

    // ...code
  }, [registrationMode]);

  const handleGuest = useCallback(() => {
    const tasks: Array<DateBlock> = JSON.parse(localStorage.getItem(LocalStorageKeys.TASKS) ?? '[]');

    setIsGuest();
    setTasks(tasks);
  }, [setIsGuest, setTasks]);

  return (
    <TodoAuthWrapper>
      <PageTitle>
        To Do App
      </PageTitle>
      <TodoAuthSubtitle>
        <PageSubtitle>
          {Content.AUTH.SUBTITLE[lang]}
        </PageSubtitle>
      </TodoAuthSubtitle>

      <TodoAuthActionsBlock>
        <TodoAuthInput
          type="text"
          name="name"
          value={name}
          placeholder={Content.AUTH.FIELDS.NAME[lang]}
          onInput={handleInput}
        />
        <TodoAuthInput
          type="password"
          name="psw"
          value={psw}
          placeholder={Content.AUTH.FIELDS.PSW[lang]}
          onInput={handleInput}
        />
      </TodoAuthActionsBlock>

      <TodoAuthActionsBlock notMargin={registrationMode}>
        {registrationMode
          && (
          <TodoAuthInput
            type="password"
            name="r-psw"
            value={rPsw}
            placeholder={Content.AUTH.FIELDS.R_PSW[lang]}
            onInput={handleInput}
            disabled={!registrationMode}
          />
          )}
        {!registrationMode
          && (
          <TodoAuthCheckbox>
            <Checked
              checked={checked}
              onChange={() => setChecked(prevState => !prevState)}
              label={Content.AUTH.ACTIONS.REM_ME[lang]}
            />
          </TodoAuthCheckbox>
          )}
      </TodoAuthActionsBlock>

      <TodoAuthActionsBlock>
        <PageButton isLarge onClick={handleMultipleAction} bgc={ButtonColors.BLUE}>
          {registrationMode && <span>{Content.AUTH.ACTIONS.BACK[lang]}</span>}
          {!registrationMode && <span>{Content.AUTH.ACTIONS.LOGIN[lang]}</span>}
        </PageButton>
        <PageButton isLarge onClick={handleRegistration} bgc={ButtonColors.PURPLE}>
          <span>{Content.AUTH.ACTIONS.REG[lang]}</span>
        </PageButton>
      </TodoAuthActionsBlock>

      <TodoAuthGuest onClick={handleGuest}>
        {Content.AUTH.ACTIONS.GUEST[lang]}
      </TodoAuthGuest>
    </TodoAuthWrapper>
  );
});
