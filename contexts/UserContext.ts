import React, { Dispatch, SetStateAction } from 'react';

export type User = {
  id: string;
  email: string;
  premium: boolean;
  pseudo: string;
};

const UserContext = React.createContext<{
  token: string | null;
  setToken: Dispatch<SetStateAction<string | null>>;
  user: User | null;
  setUser: Dispatch<SetStateAction<User | null>>;
}>({
  user: null,
  setUser: () => {},
  token: null,
  setToken: () => {},
});

export { UserContext };
