import React, {lazy, Suspense, useCallback, useEffect, useMemo, useState} from 'react';
import {Navigate, Route, Routes} from 'react-router-dom';
import {ThemeProvider} from 'styled-components';
import Spline from '@splinetool/react-spline';

import {useNotification} from '../common/ui-components/notifications/notifications-provider';
import {Spinner} from '../common/ui-components/spinner';
import {getFormattedDate} from '../utils/utils';
import {PageLoader, PagePhone, PageWrapper} from '../common/styled/ui-components';
import {Themes} from '../common/styled/color-constants';
import {GlobalStyles} from '../common/global-styled';
import {Content} from '../utils/content-constants';
import {
  InitializationStages,
  Languages,
  LocalStorageKeys,
  NotificationTypes,
  SPLINE_SCENE_URL,
  ThemeModes
} from '../utils/constants';

import {TodoAuthForm} from './auth/todo-auth-form';
import {TodoError} from './error/todo-error';
import {TodoMenu} from './menu/todo-menu';
import {TodoTasks} from './tasks/todo-tasks';
import {TodoDashboard} from './dashboard/todo-dashboard';

export interface Task {
  id?: string;
  dateCreated: Date;
  dateCompleted: Date | null;
  completed: boolean;
  message: string;
}

export interface DateBlock {
  date: string;
  isHide: boolean;
  tasks: Array<Task>;
}

export interface IAffectedTasks {
  [key: string]: boolean;
}

const TodoTasksLazy = lazy(() =>
  import('./tasks/todo-tasks')
    .then(({TodoTasks}) => ({default: TodoTasks})),
);

export function TodoPage() {
  const [initApp, setInitApp] = useState<InitializationStages>(InitializationStages.START);
  const [isLightMode, setIsLightMode] = useState<boolean>(true);
  const [isGuest, setIsGuest] = useState<boolean>(false);
  const [lang, setLang] = useState<Languages>(Languages.EN);
  const [tasks, setTasks] = useState<Array<DateBlock>>([]);

  const notification = useNotification();

  const toggleMode = useCallback(
    (): void => {
      setIsLightMode(prevState => {
        localStorage.setItem(LocalStorageKeys.THEME, `${!prevState}`);
        return !prevState;
      });
    }, []
  );

  const toggleLang = useCallback(
    (): void => {
      setLang(prevState => {
        let newLang: Languages = Languages.EN;

        if (prevState === Languages.EN) {
          newLang = Languages.RU;
        }
        localStorage.setItem(LocalStorageKeys.LANG, newLang);

        return newLang;
      });
    }, []
  );

  const loginAsGuest = useCallback(
    (): void => {
      setIsGuest(prevState => !prevState);
      notification({
        type: NotificationTypes.SUC,
        message: Content.NOTIFICATION.LOGIN.GUEST.TEXT[lang],
        title: Content.NOTIFICATION.LOGIN.GUEST.TITLE[lang],
        delay: 30
      });
    }, [notification]
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

  const createNewTask = useCallback(
    (task: Task): void => {
      const targetDateBlock = tasks.find(dateBlock => dateBlock.date === getFormattedDate(task.dateCreated));

      if (targetDateBlock) {
        targetDateBlock.tasks.push({
          id: `${targetDateBlock.date}_id_${targetDateBlock.tasks.length + 1}`,
          ...task
        });

        const otherTasks = tasks.filter(dateBlock => dateBlock.date !== targetDateBlock.date);
        setTasks([targetDateBlock, ...otherTasks]);
        return;
      }

      setTasks([{
        date: getFormattedDate(task.dateCreated),
        isHide: true,
        tasks: [{
          id: `${getFormattedDate(task.dateCreated)}_id_1`,
          ...task
        }]
      }, ...tasks]);
    }, [tasks]
  );

  const changeStatusTask = useCallback(
    (affectedTasks: IAffectedTasks): void => {
      const updatedTasks = tasks.map(dateBlocke => {
        dateBlocke.tasks.forEach(task => {
          if (task.id && affectedTasks[task.id]) {
            task.completed = !task.completed;
            task.dateCompleted = task.completed ? new Date() : null;
          }
        });

        return dateBlocke;
      });

      setTasks(updatedTasks);

      notification({
        type: NotificationTypes.SUC,
        title: Content.NOTIFICATION.TASKS.CHANGE.TITLE[lang],
        message: Content.NOTIFICATION.TASKS.CHANGE.TEXT[lang],
        delay: 20
      });
    }, [tasks, notification, lang]
  );

  const deleteTasks = useCallback(
    (affectedTasks: IAffectedTasks): void => {
      const updatedTasks: Array<DateBlock> = [];

      tasks.forEach(dateBlock => {
        dateBlock.tasks = dateBlock.tasks.filter(t => {
          if (t.id) {
            return !affectedTasks[t.id];
          }
        });

        if (dateBlock.tasks.length !== 0) {
          updatedTasks.push(dateBlock);
        }
      });

      setTasks(updatedTasks);

      notification({
        type: NotificationTypes.SUC,
        message: Content.NOTIFICATION.TASKS.DEL[lang],
        delay: 20
      });
    }, [tasks, notification, lang]
  );

  const editTask = useCallback(
    (taskId: string, newMessage: string): void => {
      const updatedTasks = tasks.map(dateBlock => {
        dateBlock.tasks.forEach(task => {
          if (task.id === taskId) {
            task.message = newMessage;
          }
        });

        return dateBlock;
      });

      setTasks(updatedTasks);

      notification({
        type: NotificationTypes.SUC,
        message: Content.NOTIFICATION.TASKS.EDIT[lang],
        delay: 20
      });
    }, [tasks, notification, lang]
  );

  const theme = useMemo(
    (): ThemeModes => {
      return isLightMode ? ThemeModes.LIGHT : ThemeModes.DARK;
    }, [isLightMode]
  );

  useEffect((): void => {
    const mode: string | null = localStorage.getItem(LocalStorageKeys.THEME);
    const lang: string | null = localStorage.getItem(LocalStorageKeys.LANG);

    setIsLightMode(mode === 'true');
    setLang((): Languages => {
      if (lang) {
        return lang === 'EN' ? Languages.EN : Languages.RU;
      }

      return Languages.EN;
    });
  }, []);

  useEffect((): void => {
    if (isGuest) {
      localStorage.setItem(LocalStorageKeys.TASKS, JSON.stringify(tasks));
    }
  }, [tasks, isGuest]);

  return (
    <ThemeProvider theme={Themes[theme]}>
      <GlobalStyles/>

      {initApp !== InitializationStages.READY &&
        <PageLoader stage={initApp}>
          <Spinner/>
        </PageLoader>
      }

      {!isGuest &&
        <PagePhone>
          <Spline
            scene={SPLINE_SCENE_URL}
            onLoad={() => {
              setTimeout(() => setInitApp(InitializationStages.READY), 1000);
              setInitApp(InitializationStages.LOAD);
            }}
          />
        </PagePhone>
      }

      <PageWrapper>
        <TodoMenu
          setTheme={toggleMode}
          isLightMode={isLightMode}
          setLang={toggleLang}
          lang={lang}
          isShow={isGuest}
        />

        <Suspense fallback={
          <PageLoader stage={InitializationStages.START}>
            <Spinner/>
          </PageLoader>
        }
        >
          <Routes>
            <Route path={'*'} element={<TodoError lang={lang}/>}/>

            {isGuest &&
              <>
                <Route path={'/authentication'} element={<Navigate to={'/tasks'}/>}/>
                <Route path={'/tasks'} element={
                  <TodoTasksLazy
                    lang={lang}
                    tasks={tasks}
                    editTask={editTask}
                    setTask={createNewTask}
                    deleteTasks={deleteTasks}
                    hideDateBlock={hideDateBlock}
                    changeStatusTask={changeStatusTask}
                  />}
                />
                <Route path={'/dashboard'} element={<TodoDashboard tasks={tasks} lang={lang}/>}/>
              </>
            }

            {!isGuest &&
              <>
                <Route path={'/'} element={<Navigate to={'/authentication'}/>}/>
                <Route path={'/tasks'} element={<Navigate to={'/authentication'}/>}/>
                <Route path={'/dashboard'} element={<Navigate to={'/authentication'}/>}/>
                <Route path={'/authentication'} element={
                  <TodoAuthForm
                    setIsGuest={loginAsGuest}
                    setTasks={setTasks}
                    lang={lang}
                  />
                }/>
              </>
            }
          </Routes>
        </Suspense>
      </PageWrapper>
    </ThemeProvider>
  );
}
