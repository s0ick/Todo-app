import React, {
  FC, useState, useEffect, useCallback, memo
} from 'react';

import {NotificationItem} from '../../styled/ui-components';

interface NotificationProps {
  dispatch: (props: any) => any,
  type: string,
  message: string,
  id: string,
  title?: string,
  delay?: number
}

export const Notifications: FC<NotificationProps> = memo(({
  dispatch, type, message,
  id, title, delay = 20
}) => {
  const [exit, setExit] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(0);
  const [intervalID, setIntervalID] = useState<NodeJS.Timer>(setInterval(() => {}, 0));

  const handleStartTimer = useCallback(() => {
    const intervalId = setInterval(() => {
      setWidth(prev => {
        if (prev < 100) {
          return prev + 0.5;
        }

        clearInterval(intervalId);
        return prev;
      });
    }, delay);

    setIntervalID(intervalId);
  }, [delay]);

  const handlePauseTimer = useCallback(() => {
    clearInterval(intervalID);
  }, [intervalID]);

  const handleCloseNotification = useCallback(() => {
    handlePauseTimer();
    setExit(true);
    setTimeout(() => dispatch({
      type: 'REMOVE_NOTIFICATION',
      id
    }), 400);
  }, [handlePauseTimer, dispatch, id]);

  useEffect(() => {
    if (width === 100) {
      handleCloseNotification();
    }
  }, [width, handleCloseNotification]);

  useEffect(() => {
    handleStartTimer();
  }, [handleStartTimer]);

  return (
    <NotificationItem
      onMouseEnter={handlePauseTimer}
      onMouseLeave={handleStartTimer}
      isSuccess={type === 'SUCCESS'}
      exit={exit}
    >
      {title && <h3>{title}</h3>}
      <p>{message}</p>
      <div style={{width: `${width}%`}} />
    </NotificationItem>
  );
});
