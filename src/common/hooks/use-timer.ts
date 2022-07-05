import { useEffect, useState } from "react";

const useTimer = (duration: number, tick: number) => {
    const [remainingTime, setRemainingTime] = useState<number>(duration);

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
    }, [remainingTime, tick, duration]);

    const start = () => {
        setRemainingTime(duration - tick);
    }

    return { remainingTime, start }
}

export default useTimer;