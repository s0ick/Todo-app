import React, {FC} from 'react';

import {PageWrapperContent} from '../../common/styled/ui-components';

import {Task} from '../todo-page';

interface TodoTasksProps {
  tasks: Array<Task>,
  setTask: (task: Task) => void
}

export const TodoTasks: FC<TodoTasksProps> = ({tasks, setTask}) => {
  return (
    <PageWrapperContent>
      {'Tasks'}
    </PageWrapperContent>
  );
}
