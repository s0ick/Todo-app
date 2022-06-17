import React from 'react';
import {NavLink, useLocation} from 'react-router-dom';

import {IconComplete, IconList, IconStatistic} from '../../common/ui-components/icons';

import {
  TodoNavigationMenu,
  TodoNavigationList,
  TodoNavigationIcon,
  TodoNavigationWrapper, TodoNavigationIndicator
} from './todo-navigation.styled';

enum LINKS {
  TASKS = '/tasks',
  COMP = '/completed',
  STAT = '/statistics'
}

enum COLORS {
  GREEN = 'green',
  BLUE = 'blue',
  YELLOW = 'yellow'
}

export const TodoNavigation = () => {
  const location = useLocation();

  return (
    <TodoNavigationWrapper>
      <TodoNavigationMenu>
        <ul>
          <TodoNavigationList
            isCurrent={location.pathname === LINKS.COMP}
            mainColor={COLORS.GREEN}
          >
            <NavLink to={LINKS.COMP}>
              <TodoNavigationIcon mainColor={COLORS.GREEN}>
                <IconComplete/>
              </TodoNavigationIcon>
            </NavLink>
          </TodoNavigationList>

          <TodoNavigationList
            isCurrent={location.pathname === LINKS.TASKS}
            mainColor={COLORS.BLUE}
          >
            <NavLink to={LINKS.TASKS}>
              <TodoNavigationIcon mainColor={COLORS.BLUE}>
                <IconList/>
              </TodoNavigationIcon>
            </NavLink>
          </TodoNavigationList>

          <TodoNavigationList
            isCurrent={location.pathname === LINKS.STAT}
            mainColor={COLORS.YELLOW}
          >
            <NavLink to={LINKS.STAT}>
              <TodoNavigationIcon mainColor={COLORS.YELLOW}>
                <IconStatistic/>
              </TodoNavigationIcon>
            </NavLink>
          </TodoNavigationList>

          <TodoNavigationIndicator/>
        </ul>
      </TodoNavigationMenu>
    </TodoNavigationWrapper>
  );
}
