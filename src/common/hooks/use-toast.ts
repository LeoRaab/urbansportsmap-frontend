import { useCallback, useEffect } from "react";
import { useDispatch } from "react-redux";
import { toastActions } from "../components/UI/toast/toastSlice";
import useTimer from "./use-timer";

const useToast = () => {
    const dispatch = useDispatch();
    const timer = useTimer();

    const show = (message: string, type: 'success' | 'error') => {
        dispatch(toastActions.show({ message, type }));
        timer.start(5000, 100);
    }

    const close = useCallback(() => {
        dispatch(toastActions.hide());
    }, [dispatch]);

    useEffect(() => {
        const currentWidth = timer.remainingTime / 5000 * 100;
        dispatch(toastActions.updateCurrentWidth({ currentWidth }));
        
        if (timer.remainingTime === 0) {
            dispatch(toastActions.hide());
        }
    }, [timer.remainingTime, dispatch]);

    useEffect(() => {
        return () => {
            close();
        }
    }, [close]);

    return { show, close }

}

export default useToast;