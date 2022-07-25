import React, {FC, memo} from 'react';
import {NavLink, useLocation} from 'react-router-dom';

import {Links} from '../../../utils/constants';

import {IconThemeMode, IconList, IconStatistic} from '../icons';

import {TodoMenuList, TodoMenuWrapper, TodoMenuIcon, TodoMenuIconNav} from './todo-menu.styled';

interface MenuProps {
  setTheme: () => void;
  isLightMode: boolean;
  setLang: () => void;
  lang: string;
  isShow: boolean;
}

export const TodoMenu: FC<MenuProps> = memo(({setTheme, isLightMode, setLang, lang, isShow = false}) => {
  const location = useLocation();

  return (
    <TodoMenuWrapper>
      <TodoMenuList>
        {isShow &&
          <>
            <NavLink to={Links.TASKS}>
              <TodoMenuIconNav isCurrent={location.pathname === Links.TASKS}>
                <IconList size={25}/>
              </TodoMenuIconNav>
            </NavLink>
            <NavLink to={Links.DASH}>
              <TodoMenuIconNav isCurrent={location.pathname === Links.DASH}>
                <IconStatistic size={25}/>
              </TodoMenuIconNav>
            </NavLink>
          </>
        }
      </TodoMenuList>

      <TodoMenuList>
        <TodoMenuIcon onClick={setLang}>
          {lang}
        </TodoMenuIcon>

        <TodoMenuIcon
          onClick={setTheme}
          isLight={isLightMode}
        >
          <IconThemeMode size={18}/>
        </TodoMenuIcon>
      </TodoMenuList>
    </TodoMenuWrapper>
  );
});
