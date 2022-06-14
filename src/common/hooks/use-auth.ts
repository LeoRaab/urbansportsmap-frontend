import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation } from "../../features/user/authApi";
import { selectExpirationDate, AuthState, authActions } from "../../features/user/authSlice";
import useLocalStorage from "./use-local-storage";

const useAuth = () => {
    const dispatch = useDispatch();
    const [loginUser] = useLoginMutation();
    const sessionExpiration = useSelector(selectExpirationDate);

    const { value: storedUserData, setValue: setStoredUserData, removeFromStorage: removeUserData } = useLocalStorage<AuthState>({ key: 'userData' });

    const login = async (email: string, password: string) => {
        try {
            const userResponse = await loginUser({ email, password }).unwrap();
            const expirationDate = new Date(new Date().getTime() + 1000 * 60 * 60).toISOString();

            setStoredUserData({ ...userResponse, expirationDate });
        } catch (e) {
            console.log(e);
        }
    }

    const logout = () => {
        dispatch(authActions.removeCredentials());
        removeUserData();
        setStoredUserData(null);
    }

    useEffect(() => {
        if (storedUserData && storedUserData.expirationDate) {
            if (new Date(storedUserData.expirationDate) >= new Date()) {
                dispatch(authActions.setCredentials(storedUserData));
            } else {
                logout();
            }
        }
    }, [storedUserData]);

    useEffect(() => {
        if (sessionExpiration) {
            const expirationDate = new Date(sessionExpiration);
            const clearSessionIn = expirationDate.getTime() - new Date().getTime();
                        
            setTimeout(() => {
                logout();
            }, clearSessionIn)
        }
    }, [sessionExpiration]);

    return { storedUserData, login, logout }
}

export default useAuth;