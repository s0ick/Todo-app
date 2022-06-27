import React, {useCallback, useMemo, useState, Suspense, useEffect} from 'react';
import {Route, Navigate, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';

import {NotificationsProvider} from '../common/ui-components/notifications/notifications-provider';
import {IconThemeMode} from '../common/ui-components/icons';
import {Spinner} from '../common/ui-components/spinner';
import {getFormattedDate} from '../utils/utils';
import {TITLE} from '../utils/content-constants';
import {GlobalStyles} from '../common/global-styled';
import {Themes} from '../common/styled/color-constants';
import {
  PageWrapper,
  PageTitle,
  PageContent,
  PageTheme
} from '../common/styled/ui-components';

import {TodoAuthForm} from './auth/todo-auth-form';
import {TodoRegistrationForm} from './auth/todo-registration-form';
import {TodoNavigation} from './navigation/todo-navigation';
import {TodoTasks} from './tasks/todo-tasks';
import {TodoSettings} from './settings/todo-settings';
import {TodoStatistics} from './statistics/todo-statistics';

enum ThemeModes {
  LIGHT = 'light',
  DARK = 'dark'
}

export enum Actions {
  CHANGE_STATUS = 'changeStatus',
  DELETE = 'delete',
  EDIT = 'edit'
}

export enum LocalStorageKeys {
  THEME = 'TODO_APP_THEME',
  TASKS = 'TODO_APP_TASKS'
}

export interface Task {
  id?: string
  dateCreated: Date,
  dateCompleted: Date | null,
  completed: boolean,
  message: string
}

export interface DateBlock {
  date: string,
  isHide: boolean,
  tasks: Array<Task>
}

export function TodoPage() {
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Array<DateBlock>>([]);

  const _toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => {
        localStorage.setItem(LocalStorageKeys.THEME, `${!prevState}`);
        return !prevState;
      });
    }, []
  );

  const handleGuest = useCallback(
    (): void => {
      setIsGuest(prevState => !prevState);
    }, []
  );

  const createNewTask = useCallback(
    (task: Task): void => {
      const targetDateBlock = tasks.find(dateBlock => dateBlock.date === getFormattedDate(task.dateCreated));

      if (targetDateBlock) {
        targetDateBlock.tasks.push({
          id: `${targetDateBlock.date}_id_${targetDateBlock.tasks.length + 1}`,
          ...task
        });

        const otherTasks = tasks.filter(dateBlock => dateBlock.date !== targetDateBlock.date);
        setTasks([...otherTasks, targetDateBlock]);
        return;
      }

      setTasks([...tasks, {
        date: getFormattedDate(task.dateCreated),
        isHide: true,
        tasks: [{
          id: `${getFormattedDate(task.dateCreated)}_id_1`,
          ...task
        }]
      }]);
    }, [tasks]
  );

  const hideDateBlock = useCallback(
    (date: string): void => {
      setTasks(prevState => prevState.map(dateBlock => {
        if (date === dateBlock.date) {
          dateBlock.isHide = !dateBlock.isHide;
        }

        return dateBlock;
      }));
    }, []
  );

  const actionsForTasks = useCallback(
    (action: Actions, date: string, task: Task, newMessage?: string): void => {
      switch (action) {
        case Actions.CHANGE_STATUS:
          setTasks(prevState => prevState.map(dateBlock => {
            if (date === dateBlock.date) {
              dateBlock.tasks.forEach(item => {
                if (item.id === task.id) {
                  item.completed = !item.completed;
                  item.dateCompleted = item.completed ? new Date() : null;
                }
              });
            }

            return dateBlock;
          }));
          break;
        case Actions.DELETE:
          const updateTasks: Array<DateBlock> = [];

          tasks.forEach(dateBlock => {
            if (date === dateBlock.date) {
              dateBlock.tasks = dateBlock.tasks.filter(t => t.id !== task.id);
            }

            if (dateBlock.tasks.length !== 0) {
              updateTasks.push(dateBlock);
            }
          });

          setTasks(updateTasks);
          break;
        case Actions.EDIT:
          setTasks(prevState => prevState.map(dateBlock => {
            if (date === dateBlock.date) {
              dateBlock.tasks = dateBlock.tasks.map(t => {
                if (t.id === task.id && newMessage) {
                  t.message = newMessage;
                }

                return t;
              });
            }

            return dateBlock;
          }));
          break;
        default: break;
      }
    }, [tasks]
  );

  const theme = useMemo(
    (): ThemeModes => {
      return isLightMode ? ThemeModes.LIGHT : ThemeModes.DARK;
    }, [isLightMode]
  );

  useEffect((): void => {
    const mode = localStorage.getItem(LocalStorageKeys.THEME);
    setIsLightMode(mode === 'true');
  }, []);

  useEffect((): void => {
    if (isGuest) {
      localStorage.setItem(LocalStorageKeys.TASKS, JSON.stringify(tasks));
    }
  }, [tasks, isGuest]);

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
                    <Route path={'/settings'} element={<Navigate to={'/auth'}/>}/>
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
                        hideDateBlock={hideDateBlock}
                        actionsForTasks={actionsForTasks}
                      />
                    }/>
                    <Route path={'/settings'} element={<TodoSettings/>}/>
                    <Route path={'/statistics'} element={<TodoStatistics/>}/>
                  </>
                }

                {!isGuest &&
                  <>
                    <Route path={'/'} element={<Navigate to={'/auth'}/>}/>
                    <Route path={'/auth'} element={
                      <TodoAuthForm
                        setIsGuest={handleGuest}
                        setTasks={setTasks}
                      />
                    }/>
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
