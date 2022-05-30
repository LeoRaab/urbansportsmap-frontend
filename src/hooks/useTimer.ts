import { useEffect, useState } from "react";

type TimerProps = {
    duration: number,
    interval: number
}

const useTimer = ({ duration, interval }: TimerProps): { remainingTime: number } => {
    const [remainingTime, setRemainingTime] = useState<number>(duration - interval);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevState => prevState -= interval);
        }, interval);

        setTimeout(() => {
            clearInterval(timer);
        }, duration);

        return () => {
            clearInterval(timer);
        }
    }, []);

    return { remainingTime }
}

export default useTimer;