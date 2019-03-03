import { useEffect, useState } from 'react';
import { authState } from 'rxfire/auth';
import { app } from '../utils/firebase';

export const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {

    const auth$ = authState(app.auth()).subscribe(user =>
      user ? 
      setUser(user) : setUser(null)
    );

    return () => auth$.unsubscribe();
  }, []);

  return user;
};




