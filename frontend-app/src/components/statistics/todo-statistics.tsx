import React, {FC, useMemo} from 'react';

import {PageWrapperContent} from '../../common/styled/ui-components';
import {getFormattedPiesData} from '../../utils/pies.utils';

import {DateBlock, PiesColors} from '../todo-page';

import {TodoStatisticsBlock} from './todo-statistics.styled';
import {TodoPies} from './visualizations/pies/todo-pies';

interface StatisticsProps {
  tasks: Array<DateBlock>,
  piesColors: PiesColors
}

export const TodoStatistics: FC<StatisticsProps> = ({tasks, piesColors}) => {
  const {piesData} = useMemo(
    () => {
      const piesData = getFormattedPiesData(tasks);
      return {piesData};
    }, [tasks]
  );

  return (
    <PageWrapperContent>
      <TodoStatisticsBlock>
        <TodoPies data={piesData} width={400} height={400} colors={piesColors}/>
      </TodoStatisticsBlock>
    </PageWrapperContent>
  );
}
