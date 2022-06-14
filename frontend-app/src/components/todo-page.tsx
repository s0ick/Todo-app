import React, {useCallback, useMemo, useState, Suspense, useEffect} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {IconThemeMode} from '../common/ui-components/icons';
import {Spinner} from '../common/ui-components/spinner';
import {Themes} from '../common/styled/color-constants';
import {GlobalStyles} from '../common/global-styled';
import {SUBTITLE, TITLE} from '../utils/content-constants';
import {
  PageWrapper,
  PageTitle,
  PageSubtitle,
  PageContent,
  PageTheme
} from '../common/styled/ui-components';

import {TodoAuthForm} from './auth/todo-auth-form';
import {TodoRegistrationForm} from './auth/todo-registration-form';

enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export function TodoPage() {
  const [isLightMode, setIsLightMode] = useState(true);

  const _toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => {
        localStorage.setItem('theme', `${!prevState}`);
        return !prevState;
      });
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
            <Routes>
              <Route path={'/'} element={<Navigate to={'/auth'}/>}/>
              <Route path={'/auth'} element={<TodoAuthForm/>}/>
              <Route path={'/registration'} element={<TodoRegistrationForm/>}/>
            </Routes>
          </Suspense>
        </PageContent>

      </PageWrapper>
    </ThemeProvider>
  );
}
