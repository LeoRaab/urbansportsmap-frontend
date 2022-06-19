import { useCallback, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, selectExpirationDate, UserState, userActions } from "../../features/user/userSlice";
import useLocalStorage from "./use-local-storage";
import useToast from "./use-toast";

const useAuth = () => {
    const dispatch = useDispatch();
    const [loginUser, {isLoading, isError, error}] = useLoginMutation();
    const sessionExpiration = useSelector(selectExpirationDate);
    const toast = useToast();
    const { value: storedUserData, setValue: setStoredUserData, removeFromStorage: removeUserData } = useLocalStorage<UserState>({ key: 'userData' });

    const login = async (email: string, password: string) => {        
        try {
            const { token, userId, message } = await loginUser({ email, password }).unwrap();
            const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();            
            toast.show(message, 'success');

            setStoredUserData({ userId, token, expirationDate });
        } catch (e) {
            console.log(e);
        }
    }

    const logout = useCallback(() => {
        dispatch(userActions.removeCredentials());
        removeUserData();
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
    }, [storedUserData, dispatch, logout ]);

    useEffect(() => {
        if (sessionExpiration) {
            const expirationDate = new Date(sessionExpiration);
            const clearSessionIn = expirationDate.getTime() - new Date().getTime();
                        
            setTimeout(() => {
                logout();
            }, clearSessionIn)
        }
    }, [sessionExpiration, logout]);

    return { storedUserData, login, logout }
}

export default useAuth;