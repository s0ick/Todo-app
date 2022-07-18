import React, {FC, memo} from 'react';
import {NavLink} from 'react-router-dom';

import {Languages} from '../../utils/constants';
import {Content} from '../../utils/content-constants';
import {PageTitle, PageSubtitle, PageButton} from '../../common/styled/ui-components';

import {TodoErrorButton, TodoErrorWrapper} from './todo-error.styled';

interface ErrorPageProps {
  lang: Languages;
}

export const TodoError: FC<ErrorPageProps> = memo(({lang}) => {
    return (
      <TodoErrorWrapper>
        <PageTitle>
          {Content.NO_MATCH.TITLE[lang]}
        </PageTitle>
        <PageSubtitle>
          {Content.NO_MATCH.SUBTITLE[lang]}
        </PageSubtitle>
        <TodoErrorButton>
          <NavLink to={'/'}>
            <PageButton>
              {Content.NO_MATCH.LINK[lang]}
            </PageButton>
          </NavLink>
        </TodoErrorButton>
      </TodoErrorWrapper>
    );
  }
);
