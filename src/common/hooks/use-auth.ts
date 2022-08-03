import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useLoginMutation, selectExpirationDate, UserState, userActions } from '../../features/user/userSlice';
import { addToast } from '../components/UI/toast/toastsSlice';
import { STRINGS } from '../constants/strings';
import getErrorMessage from '../util/get-error-message';
import useLocalStorage from './use-local-storage';

const useAuth = () => {
  const dispatch = useDispatch();
  const [loginUser, { error: loginError }] = useLoginMutation();
  const sessionExpiration = useSelector(selectExpirationDate);
  const {
    value: storedUserData,
    setValue: setStoredUserData,
    removeFromStorage: removeUserData,
  } = useLocalStorage<UserState>({ key: 'userData' });

  const login = async (email: string, password: string) => {
    try {
      const { token, userId } = await loginUser({ email, password }).unwrap();
      const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();
      dispatch(addToast({ message: STRINGS.LOGIN_SUCCESS, type: 'success' }));
      setStoredUserData({ userId, token, expirationDate });
    } catch (e) {
      const errorMessage = loginError ? getErrorMessage(loginError) : STRINGS.LOGIN_FAIL;
      dispatch({ message: errorMessage, type: 'error' });
    }
  };

  const logout = useCallback(() => {   
    removeUserData();
    dispatch(userActions.removeCredentials());
    setStoredUserData(null);
  }, [dispatch, removeUserData, setStoredUserData]);

  useEffect(() => {
    if (storedUserData && storedUserData.expirationDate) {
      if (new Date(storedUserData.expirationDate) >= new Date()) {
        dispatch(userActions.setCredentials(storedUserData));
      } else {
        logout();
      }
    }
  }, [storedUserData, dispatch, logout]);

  useEffect(() => {
    if (sessionExpiration) {
      const expirationDate = new Date(sessionExpiration);
      const clearSessionIn = expirationDate.getTime() - new Date().getTime();

      setTimeout(() => {
        logout();
      }, clearSessionIn);
    }
  }, [sessionExpiration, logout]);

  return { storedUserData, login, logout, loginError };
};

export default useAuth;
