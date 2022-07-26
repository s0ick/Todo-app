import React, {FC, memo, useMemo} from 'react';

import {getFormattedPiesData} from '../../utils/visualizations/pies.utils';
import {getFormattedBarStackData} from '../../utils/visualizations/bar-stack.utils';
import {getFormattedTimelineData} from '../../utils/visualizations/timeline.utils';
import {PageContent} from '../../common/styled/ui-components';
import {Content} from '../../utils/content-constants';
import {Languages} from '../../utils/constants';

import {DateBlock} from '../todo-page';

import {TodoPies} from './visualizations/pies/todo-pies';
import {TodoBarStack} from './visualizations/bar-stack/todo-bar-stack';
import {TodoTimelineBrush} from './visualizations/timeline/todo-timeline-brush';
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
  const {piesData, barStackData, timelineData} = useMemo(() => {
    const pies = getFormattedPiesData(tasks, lang);
    const barStack = getFormattedBarStackData(tasks, lang);
    const timeline = getFormattedTimelineData(tasks);
    return {piesData: pies, barStackData: barStack, timelineData: timeline};
  }, [tasks, lang]);

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
          <TodoPies data={piesData} size={350} lang={lang} />
        </TodoDashboardBlock>

        <TodoDashboardBlock>
          <TodoDashboardBlockTitle>
            {Content.BAR.TITLE[lang]}
          </TodoDashboardBlockTitle>
          <TodoDashboardBlockSubtitle>
            {Content.BAR.SUBTITLE[lang]}
          </TodoDashboardBlockSubtitle>
          <TodoBarStack barStackData={barStackData} width={500} height={350} lang={lang} />
        </TodoDashboardBlock>

        <TodoDashboardBlock>
          <TodoDashboardBlockTitle>
            {Content.LINE.TITLE[lang]}
          </TodoDashboardBlockTitle>
          <TodoDashboardBlockSubtitle>
            {Content.LINE.SUBTITLE[lang]}
          </TodoDashboardBlockSubtitle>
          <TodoTimelineBrush data={timelineData} width={1600} height={350} brushHeight={50} />
        </TodoDashboardBlock>

      </TodoDashboardWrapper>
    </PageContent>
  );
});
