import React, {
  createContext, Dispatch, FC, memo, useContext, useReducer
} from 'react';

import {uuid} from '../../../utils/utils';

import {NotificationsWrapper} from '../../styled/ui-components';

import {Notifications} from './notifications';

interface ProviderProps {
  children: any
}

interface ActionProps {
  type: string,
  payload?: any,
  id?: string
}

interface NoteProps {
  type: string,
  message: string,
  id: string,
  title?: string
  delay?: number
}

interface NotificationProps {
  type: string,
  message: string,
  title?: string,
  delay?: number
}

const NotificationContext = createContext<Dispatch<ActionProps | null> | null>(null);

export const NotificationsProvider: FC<ProviderProps> = memo(({children}) => {
  const [store, dispatch] = useReducer((state: any, action: ActionProps | null) => {
    switch (action?.type) {
      case 'ADD_NOTIFICATION':
        return [...state, {...action?.payload}];
      case 'REMOVE_NOTIFICATION':
        return state.filter((el: any) => el.id !== action?.id);
      default:
        return state;
    }
  }, []);

  return (
    <NotificationContext.Provider value={dispatch}>
      <NotificationsWrapper>
        {store.map((note: NoteProps) => <Notifications dispatch={dispatch} key={note.id} {...note} />)}
      </NotificationsWrapper>
      {children}
    </NotificationContext.Provider>
  );
});

export const useNotification = () => {
  const dispatch = useContext(NotificationContext);

  return (props: NotificationProps | null) => {
    if (dispatch) {
      dispatch({
        type: 'ADD_NOTIFICATION',
        payload: {
          id: uuid(),
          ...props
        }
      });
    }
  };
};
