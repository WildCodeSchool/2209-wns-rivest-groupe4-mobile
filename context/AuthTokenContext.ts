import React, { Dispatch, SetStateAction } from 'react';

type AuthTokenContextType = {
  authToken: string | undefined;
  setAuthToken: Dispatch<SetStateAction<string | undefined>>;
};

const AuthTokenContext = React.createContext<AuthTokenContextType>({
  authToken: undefined,
  setAuthToken: () => {},
});

export { AuthTokenContext };
