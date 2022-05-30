import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../store/api/authApi";
import { authActions, AuthState } from "../store/authSlice";
import useLocalStorage from "./use-local-storage";
import useRedirectPath from "./use-redirect-path";

const useAuth = () => {
    const dispatch = useDispatch();
    const [loginUser] = useLoginMutation();

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
        if (storedUserData) {
            dispatch(authActions.setCredentials(storedUserData));
        }
    }, [storedUserData])

    return { storedUserData, login, logout }
}

export default useAuth;