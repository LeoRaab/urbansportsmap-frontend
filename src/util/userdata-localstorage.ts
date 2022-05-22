import {AuthState} from '../store/authSlice';

export const getUserDataFromStorage = (): AuthState => {
    const userDataJSON = localStorage.getItem('userData');

    if (userDataJSON) {
        try {
            const userData = JSON.parse(userDataJSON) as AuthState;
            console.log(userData);
            console.log(userData.userId);
            return {
                userId: userData.userId,
                token: userData.token
            }
        }
        catch (e) {
            return {
                userId: null,
                token: null
            }
        }
    }

    return {
        userId: null,
        token: null
    }

}

export const removeUserDataFromStorage = (): void => {
    localStorage.removeItem('userData');
}

export const setUserDataToStorage = (userData: AuthState): void => {
    localStorage.setItem('userData', JSON.stringify(userData));
}