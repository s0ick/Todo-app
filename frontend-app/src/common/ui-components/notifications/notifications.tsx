import React, {FC, useState, useEffect, useCallback} from 'react';
import {NotificationItem} from '../../styled/ui-components';

interface NotificationProps {
  dispatch: (props: any) => any,
  type: string,
  message: string,
  id: string,
  title?: string,
  delay?: number
}

export const Notifications: FC<NotificationProps> = ({
  dispatch, type, message,
  id, title, delay = 20
}) => {
  const [exit, setExit] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>(setInterval(() => {}, 0));

  const handleStartTimer = useCallback(
    () => {
      const id = setInterval(() => {
        setWidth(prev => {
          if (prev < 100) {
            return prev + 0.5;
          }

          clearInterval(id);
          return prev;
        });
      }, delay);

      setIntervalID(id);
    }, []
  );

  const handlePauseTimer = useCallback(
    () => {
      clearInterval(intervalID);
    }, [intervalID]
  );

  const handleCloseNotification = useCallback(
    () => {
      handlePauseTimer();
      setExit(true);
      setTimeout(() => dispatch({
        type: 'REMOVE_NOTIFICATION',
        id
      }), 400)
    }, [handlePauseTimer]
  );

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width])

  useEffect(() => {
    handleStartTimer();
  }, []);

  return (
    <NotificationItem
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      isSuccess={type === 'SUCCESS'}
      exit={exit}
    >
      {title && <h3>{title}</h3>}
      <p>{message}</p>
      <div style={{width: `${width}%`}}/>
    </NotificationItem>
  );
}
