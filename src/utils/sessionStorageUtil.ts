export enum SessionStorageKey {
  ID_TOKEN = 'x-idToken',
  NICKNAME = 'x-nickname',
  LANGUAGE = 'x-language',
}

export interface SessionStorageInfo {
  idToken?: string;
  nickname?: string;
  languageCode?: string;
}

export const getSessionStorageInfo = (): SessionStorageInfo => {
  const sessionInfo: SessionStorageInfo = {
    idToken: sessionStorage.getItem(SessionStorageKey.ID_TOKEN) ?? '',
    nickname: sessionStorage.getItem(SessionStorageKey.NICKNAME) ?? '',
    languageCode: sessionStorage.getItem(SessionStorageKey.LANGUAGE) ?? '',
  };
  return sessionInfo;
};

export const setSessionStorageInfo = (object: object): void => {
  for (const [key, value] of Object.entries(object)) {
    sessionStorage.setItem(key, value ?? '');
  }
};
