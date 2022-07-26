import React from 'react';
import ReactDOM from 'react-dom/client';
import {BrowserRouter as Router} from 'react-router-dom';

import {NotificationsProvider} from './common/ui-components/notifications/notifications-provider';
import {TodoPage} from './components/todo-page';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <NotificationsProvider>
    <Router>
      <TodoPage />
    </Router>
  </NotificationsProvider>
);
