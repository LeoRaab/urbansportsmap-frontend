import {AuthState} from '../store/authSlice';

export const getUserDataFromStorage = (): AuthState => {
    const userDataJSON = localStorage.getItem('userData');

    if (userDataJSON) {
        try {
            const userData = JSON.parse(userDataJSON) as AuthState;
            return {
                userId: userData.userId,
                token: userData.token,
                isLoggedIn: true
            }
        }
        catch (e) {
            return {
                userId: null,
                token: null,
                isLoggedIn: false
            }
        }
    }

    return {
        userId: null,
        token: null,
        isLoggedIn: false
    }

}

export const removeUserDataFromStorage = (): void => {
    localStorage.removeItem('userData');
}