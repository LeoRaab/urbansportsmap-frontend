import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { useDispatch } from "react-redux";
import { toastsActions } from "../components/UI/toast/toastsSlice";

const useErrorHandler = () => {
    const dispatch = useDispatch();

    const showError = (error: FetchBaseQueryError | SerializedError) => {
        let errorMessage = 'Ein unbekannter Fehler ist aufgetreten...';

        if ('status' in error) {
            errorMessage = "error" in error ? error.error : JSON.stringify(error.data);

        } else if ('message' in error && error.message) {
            errorMessage = error.message;
        }

        console.log(errorMessage);

        dispatch(toastsActions.addToast({message: errorMessage, type: 'error'}));
    }

    return {showError};
};

export default useErrorHandler;
