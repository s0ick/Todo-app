import React, {useCallback, useMemo, useState, Suspense, useEffect} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {IconThemeMode} from '../common/ui-components/icons';
import {Spinner} from '../common/ui-components/spinner';
import {NotificationsProvider} from '../common/ui-components/notifications/notifications-provider';
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
import {TodoNavigation} from './navigation/todo-navigation';
import {TodoTasks} from './tasks/todo-tasks';
import {TodoCompleted} from './completed/todo-completed';
import {TodoStatistics} from './statistics/todo-statistics';

enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export interface Task {
  id: number,
  date: Date,
  completed: boolean,
  message: string
}

export function TodoPage() {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<Task>>([]);

  const _toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => {
        localStorage.setItem('theme', `${!prevState}`);
        return !prevState;
      });
    }, []
  );

  const handleGuest = useCallback(
    () => {
      setIsGuest(prevState => !prevState);
    }, []
  );

  const createNewTask = useCallback(
    (task: Task) => {
      setTasks(prevState => [...prevState, task]);
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
      <NotificationsProvider>
        <GlobalStyles/>

        <PageWrapper>
          <PageTitle>
            <div>{TITLE[0]}</div>
            <span>{TITLE[1]}</span>
          </PageTitle>

          <PageTheme onClick={_toggleMode}>
            <IconThemeMode/>
          </PageTheme>

          <PageContent>
            <Suspense fallback={<Spinner/>}>
              {isGuest && <TodoNavigation/>}
              <Routes>
                {!isGuest &&
                  <>
                    <Route path={'/tasks'} element={<Navigate to={'/auth'}/>}/>
                    <Route path={'/completed'} element={<Navigate to={'/auth'}/>}/>
                    <Route path={'/statistics'} element={<Navigate to={'/auth'}/>}/>
                  </>
                }

                {isGuest &&
                  <>
                    <Route path={'/auth'} element={<Navigate to={'/tasks'}/>}/>
                    <Route path={'/tasks'} element={
                      <TodoTasks
                        tasks={tasks}
                        setTask={createNewTask}
                      />
                    }/>
                    <Route path={'/completed'} element={<TodoCompleted/>}/>
                    <Route path={'/statistics'} element={<TodoStatistics/>}/>
                  </>
                }

                {!isGuest &&
                  <>
                    <Route path={'/'} element={<Navigate to={'/auth'}/>}/>
                    <Route path={'/auth'} element={<TodoAuthForm setIsGuest={handleGuest}/>}/>
                    <Route path={'/registration'} element={<TodoRegistrationForm/>}/>
                  </>
                }
              </Routes>
            </Suspense>
          </PageContent>

        </PageWrapper>
      </NotificationsProvider>
    </ThemeProvider>
  );
}
