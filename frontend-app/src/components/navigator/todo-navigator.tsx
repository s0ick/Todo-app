import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

import {TodoNavigatorLink, TodoNavigatorPlug, TodoNavigatorWrapper} from './todo-navigator.styled';

enum LINKS {
  TASKS = '/tasks',
  COMP = '/completed',
  STAT = '/statistics'
}

export const TodoNavigator = () => {
  const location = useLocation();

  return (
    <TodoNavigatorWrapper>
      <TodoNavigatorLink isCurrent={false} isPlug/>

      <NavLink to={LINKS.TASKS}>
        <TodoNavigatorLink isCurrent={location.pathname === LINKS.TASKS}>{'Tasks'}</TodoNavigatorLink>
      </NavLink>
      <NavLink to={LINKS.COMP}>
        <TodoNavigatorLink isCurrent={location.pathname === LINKS.COMP}>{'Completed'}</TodoNavigatorLink>
      </NavLink>
      <NavLink to={LINKS.STAT}>
        <TodoNavigatorLink isCurrent={location.pathname === LINKS.STAT}>{'Statistics'}</TodoNavigatorLink>
      </NavLink>

      <TodoNavigatorLink isCurrent={false} isPlug/>
    </TodoNavigatorWrapper>
  );
}
