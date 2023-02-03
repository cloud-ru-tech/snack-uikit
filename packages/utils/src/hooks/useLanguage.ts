import { useCallback, useEffect, useLayoutEffect, useState } from 'react';

import { DEFAULT, POST_MESSAGE_KEY } from '../constants';
import { tryParseJson } from '../helpers/tryParseJson';
import { LanguageCodeType } from '../types';
import { useCustomStore } from './private/useCustomStore';

type useLanguageProps = {
  onlyEnabledLanguage?: boolean;
};

export const useLanguage = (props?: useLanguageProps) => {
  const store = useCustomStore();
  const [languageCode, setLanguageCode] = useState<LanguageCodeType>(store.languageCode || DEFAULT.LANGUAGE);
  const onlyEnabledLanguage = props?.onlyEnabledLanguage;

  useEffect(() => {
    const receiveChangeLanguageDoneMessage = (event: MessageEvent) => {
      const eventData = tryParseJson(event.data);
      if (eventData.key !== POST_MESSAGE_KEY.changeLanguageDone) return;
      setLanguageCode(eventData.value);
    };
    window.addEventListener('message', receiveChangeLanguageDoneMessage, false);

    return () => window.removeEventListener('message', receiveChangeLanguageDoneMessage, false);
  }, []);

  useLayoutEffect(() => {
    if (!onlyEnabledLanguage) {
      return;
    }
    const miniCode = languageCode.split('-')[0];
    const enGroup = miniCode === 'en';
    const ruGroup = ['ru', 'be'].includes(miniCode);
    if (enGroup) {
      setLanguageCode(LanguageCodeType.enGB);
      return;
    }
    if (ruGroup) {
      setLanguageCode(LanguageCodeType.ruRU);
      return;
    }
    if (languageCode === LanguageCodeType.cimode) {
      setLanguageCode(LanguageCodeType.cimode);
      return;
    }
    setLanguageCode(LanguageCodeType.ruRU);
  }, [languageCode, onlyEnabledLanguage]);

  const changeLanguage = useCallback((languageCode: LanguageCodeType) => {
    window.postMessage(JSON.stringify({ key: POST_MESSAGE_KEY.changeLanguage, value: languageCode }), location.origin);
  }, []);

  return { languageCode, changeLanguage };
};
