import { useEffect, useState } from "react";

const useTimer = () => {
    const [duration, setDuration] = useState<number>(0);
    const [tick, setTick] = useState<number>(0);
    const [remainingTime, setRemainingTime] = useState<number>(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setRemainingTime(prevState => prevState -= tick);
        }, tick);

        setTimeout(() => {
            clearInterval(timer);
        }, duration);

        if (remainingTime === 0) {
            clearInterval(timer);
        }

        return () => {
            clearInterval(timer);
        }
    }, [remainingTime]);

    const start = (duration: number, tick: number) => {
        setDuration(duration);
        setTick(tick);
        setRemainingTime(duration - tick);
    }

    return { remainingTime, start }
}

export default useTimer;