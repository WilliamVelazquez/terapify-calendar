import { useState, useRef, useEffect } from 'react';
import useToggle from './useToggle';

const useNotification = (msg = '', boolean = false, timeout = 5000) => {
  const [message, setMessage] = useState(msg);
  const [isNotifying, toggle, setIsNotifying] = useToggle(boolean);

  const timerToClear = useRef(false);

  useEffect(
    () => {
      return () => {
        clearTimeout(timerToClear.current);
      };
    }, [],
  );

  const toggleNotification = (newTimeout = timeout) => {
    timerToClear.current = setTimeout(() => setIsNotifying(false), newTimeout);
  };

  const showMessage = (newMsg) => {
    setMessage(newMsg);
    setIsNotifying(true);
    toggleNotification();
  };

  const closeMessage = (newMsg) => {
    setIsNotifying(false);
  };

  return [
    message,
    showMessage,
    closeMessage,
    isNotifying,
    setMessage,
    setIsNotifying,
    toggleNotification,
  ];
};

export default useNotification;
