import React, {FC, memo, useMemo} from 'react';

import {getFormattedPiesData} from '../../utils/pies.utils';
import {getFormattedBarStackData} from '../../utils/bar-stack.utils';
import {PageContent} from '../../common/styled/ui-components';
import {Content} from '../../utils/content-constants';
import {Languages} from '../../utils/constants';

import {DateBlock} from '../todo-page';

import {TodoPies} from './visualizations/pies/todo-pies';
import {TodoBarStack} from './visualizations/bar-stack/todo-bar-stack';
import {
  TodoDashboardBlock,
  TodoDashboardBlockTitle,
  TodoDashboardBlockSubtitle,
  TodoDashboardWrapper
} from './todo-dashboard.styled';

interface DashboardProps {
  tasks: Array<DateBlock>;
  lang: Languages;
}

export const TodoDashboard: FC<DashboardProps> = memo(({tasks, lang}) => {
  const {piesData, barStackData} = useMemo(
    () => {
      const piesData = getFormattedPiesData(tasks, lang);
      const barStackData = getFormattedBarStackData(tasks, lang);
      return {piesData, barStackData};
    }, [tasks, lang]
  );

  return (
    <PageContent>
      <TodoDashboardWrapper>

        <TodoDashboardBlock>
          <TodoDashboardBlockTitle>
            {Content.PIES.TITLE[lang]}
          </TodoDashboardBlockTitle>
          <TodoDashboardBlockSubtitle>
            {Content.PIES.SUBTITLE[lang]}
          </TodoDashboardBlockSubtitle>
          <TodoPies data={piesData} size={350}/>
        </TodoDashboardBlock>

        <TodoDashboardBlock>
          <TodoDashboardBlockTitle>
            {Content.BAR.TITLE[lang]}
          </TodoDashboardBlockTitle>
          <TodoDashboardBlockSubtitle>
            {Content.BAR.SUBTITLE[lang]}
          </TodoDashboardBlockSubtitle>
          <TodoBarStack barStackData={barStackData} width={500} height={350}/>
        </TodoDashboardBlock>

      </TodoDashboardWrapper>
    </PageContent>
  );
});
