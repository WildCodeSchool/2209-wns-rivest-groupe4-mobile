import { useEffect, useState } from 'react';
import * as SecureStore from 'expo-secure-store';

export default function useAuth() {
  const [authToken, setAuthToken] = useState<string | null>(null);
  useEffect(() => {
    (async () => {
      const result = await SecureStore.getItemAsync('authToken');
      result ? setAuthToken(result) : console.log('');
    })();
  }, []);

  return { authToken };
}
