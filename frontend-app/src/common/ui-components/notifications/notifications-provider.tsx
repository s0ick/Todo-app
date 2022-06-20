import React, {createContext, Dispatch, FC, useContext, useReducer} from 'react';

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
}

interface NotificationProps {
  type: string,
  message: string,
  title?: string
}

const NotificationContext = createContext<Dispatch<ActionProps | null> | null>(null);

export const NotificationsProvider: FC<ProviderProps> = ({children}) => {
  const [state, dispatch] = useReducer((state: any, action: ActionProps | null) => {
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
        {state.map((note: NoteProps) => <Notifications dispatch={dispatch} key={note.id} {...note}/>)}
      </NotificationsWrapper>
      {children}
    </NotificationContext.Provider>
  );
}

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
  }
};

