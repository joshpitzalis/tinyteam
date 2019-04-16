import { useEffect, useState } from 'react';
import { authState } from 'rxfire/auth';
import { auth } from '../utils/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth$ = authState(auth).subscribe(user =>
      user ? setUser(user) : setUser(null)
    );

    return () => auth$.unsubscribe();
  }, []);

  return user;
};
