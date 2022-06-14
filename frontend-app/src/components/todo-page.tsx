import React, {useCallback, useMemo, useState, Suspense, useEffect} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {IconThemeMode} from '../common/ui-components/icons';
import {Spinner} from '../common/ui-components/spinner';
import {SUBTITLE, TITLE} from '../utils/content-constants';
import {GlobalStyles} from '../common/global-styled';
import {Themes} from '../common/styled/color-constants';
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageTheme
} from '../common/styled/ui-components';

import {TodoAuthForm} from './auth/todo-auth-form';
import {TodoRegistrationForm} from './auth/todo-registration-form';
import {TodoNavigator} from './navigator/todo-navigator';
import {TodoTasks} from './tasks/todo-tasks';
import {TodoCompleted} from './completed/todo-completed';
import {TodoStatistics} from './statistics/todo-statistics';

enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export function TodoPage() {
  const [isLightMode, setIsLightMode] = useState(true);
  const [isGuest, setIsGuest] = useState(false);

  const _toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => {
        localStorage.setItem('theme', `${!prevState}`);
        return !prevState;
      });
    }, []
  );

  const _handleGuest = useCallback(
    () => {
      setIsGuest(prevState => !prevState);
    }, []
  );

  const theme = useMemo(
    (): ThemeModes => {
      return isLightMode ? ThemeModes.LIGHT : ThemeModes.DARK;
    }, [isLightMode]
  );

  useEffect(() => {
    const mode = localStorage.getItem('theme');
    setIsLightMode(mode === 'true');
  }, []);

  return (
    <ThemeProvider theme={Themes[theme]}>
      <GlobalStyles/>

      <PageWrapper>
        <PageTitle>{TITLE}</PageTitle>
        <PageSubtitle>{SUBTITLE}</PageSubtitle>

        <PageTheme onClick={_toggleMode}>
          <IconThemeMode/>
        </PageTheme>

        <PageContent>
          <Suspense fallback={<Spinner/>}>
            {isGuest && <TodoNavigator/>}
            <Routes>
              {isGuest &&
                <>
                  <Route path={'/auth'} element={<Navigate to={'/tasks'}/>}/>
                  <Route path={'/tasks'} element={<TodoTasks/>}/>
                  <Route path={'/completed'} element={<TodoCompleted/>}/>
                  <Route path={'/statistics'} element={<TodoStatistics/>}/>
                </>
              }

              {!isGuest &&
                <>
                  <Route path={'/'} element={<Navigate to={'/auth'}/>}/>
                  <Route path={'/auth'} element={<TodoAuthForm setIsGuest={_handleGuest}/>}/>
                  <Route path={'/registration'} element={<TodoRegistrationForm/>}/>
                </>
              }
            </Routes>
          </Suspense>
        </PageContent>

      </PageWrapper>
    </ThemeProvider>
  );
}
