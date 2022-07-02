import { XIcon } from "@heroicons/react/outline";
import Button from "../../form-elements/buttons/Button";
import useTimer from "../../../hooks/use-timer";
import { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { toastsActions } from "./toastsSlice";

type ToastProps = {
    message: string,
    type: 'success' | 'error',
    duration: number,
    id: number
}

const Toast = ({message, type, duration, id}: ToastProps) => {
    const dispatch = useDispatch();
    const timer = useTimer(duration, 100);
    const [currentWidth, setCurrentWidth] = useState<number>(100);

    useEffect(() => {
        timer.start();
    }, []);

    useEffect(() => {
        setCurrentWidth(timer.remainingTime / 5000 * 100);
        if (timer.remainingTime <= 0) {
            removeToast();
        }
    }, [timer.remainingTime])

    const removeToast = () => {
        dispatch(toastsActions.removeToast({toastId: id}))
    }

    return (
        <div className={'rounded shadow p-4 mb-2 w-3/4 relative bg-opacity-90 ' + type}>
            <div className="flex">
                <p className='text-sm font-semibold'>{message}</p>
                <div className="absolute flex justify-center right-2 z-1100">
                    <Button color="transparent" type="button" onClick={removeToast}>
                        <XIcon className="icon-size"/>
                    </Button>
                </div>
            </div>
            <div className="rounded mt-2 border-b-8 border-white/10" style={{ 'width': currentWidth + '%' }} />
        </div>
    )
}

export default Toast;