import { useCallback, useEffect, useState } from 'react';

import { DEFAULT, POST_MESSAGE_KEY } from '../constants';
import { tryParseJson } from '../helpers/tryParseJson';
import { Themes } from '../types/theme';
import { useCustomStore } from './private/useCustomStore';

export const useTheme = () => {
  const store = useCustomStore();
  const [theme, setTheme] = useState(store.theme || DEFAULT.THEME);

  useEffect(() => {
    const receiveChangeThemeDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeThemeDone) return;
      setTheme(eventData.value);
    };
    window.addEventListener('message', receiveChangeThemeDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeThemeDoneMessage, false);
  }, []);

  const changeTheme = useCallback((theme: Themes) => {
    window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeTheme, value: theme }), location.origin);
  }, []);

  return { theme, changeTheme };
};
