import { UserState } from "../../features/user/userSlice";

export const getUserDataFromStorage = (): UserState => {
    const userDataJSON = localStorage.getItem('userData');

    if (userDataJSON) {
        try {
            const userData = JSON.parse(userDataJSON) as UserState;              
            
            if (userData.expirationDate && new Date(userData.expirationDate) <= new Date()) {
                throw Error();
            }

            return {
                userId: userData.userId,
                token: userData.token,
                expirationDate: userData.expirationDate
            }
        }
        catch (e) {
            return {
                userId: null,
                token: null,
                expirationDate: null
            }
        }
    }

    return {
        userId: null,
        token: null,
        expirationDate: null
    }

}

export const removeUserDataFromStorage = (): void => {
    localStorage.removeItem('userData');
}

export const setUserDataToStorage = (userData: UserState): void => {
    localStorage.setItem(
        'userData', 
        JSON.stringify(
            {
                userId: userData.userId, 
                token: userData.token,
                expirationDate: userData.expirationDate
        })
    );
}