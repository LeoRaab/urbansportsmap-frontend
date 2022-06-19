import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useLoginMutation, selectExpirationDate, UserState, userActions } from "../../features/user/userSlice";
import useLocalStorage from "./use-local-storage";

const useAuth = () => {
    const dispatch = useDispatch();
    const [loginUser] = useLoginMutation();
    const sessionExpiration = useSelector(selectExpirationDate);

    const { value: storedUserData, setValue: setStoredUserData, removeFromStorage: removeUserData } = useLocalStorage<UserState>({ key: 'userData' });

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
        dispatch(userActions.removeCredentials());
        removeUserData();
        setStoredUserData(null);
    }

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