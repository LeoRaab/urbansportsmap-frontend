import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { toastActions } from "../components/UI/Toast/toastSlice";
import COLOR_SCHEME from "../types/ColorScheme";
import useTimer from "./use-timer";

const useToast = () => {
    const dispatch = useDispatch();
    const timer = useTimer();

    useEffect(() => {
        const currentWidth = timer.remainingTime / 5000 * 100;
        dispatch(toastActions.updateCurrentWidth({ currentWidth }));
        
        if (timer.remainingTime === 0) {
            dispatch(toastActions.hide());
        }
    }, [timer.remainingTime]);

    useEffect(() => {
        return () => {
            close();
        }
    }, []);

    const show = (message: string, colorScheme: COLOR_SCHEME) => {
        dispatch(toastActions.show({ message, colorScheme }));
        timer.start(5000, 100);
    }

    const close = () => {
        dispatch(toastActions.hide());
    }

    return { show, close }

}

export default useToast;