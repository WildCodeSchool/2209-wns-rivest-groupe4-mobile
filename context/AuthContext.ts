import React from 'react';

const AuthContext = React.createContext<{
  signIn: (token: string) => Promise<void>;
  signOut: () => Promise<void>;
  signUp: (token: string) => Promise<void>;
}>({
  signIn: async () => {},
  signOut: async () => {},
  signUp: async () => {},
});

export { AuthContext };
