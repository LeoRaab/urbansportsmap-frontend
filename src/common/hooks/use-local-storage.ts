import { useEffect, useState } from "react";

type LocalStorageProps = {
    key: string;
}

const useLocalStorage = <T>({ key }: LocalStorageProps) => {
    const [value, setValue] = useState<T | null>(null);
    const [storedValue, setStoredValue] = useState<string | null>(null);

    useEffect(() => {
        try {
            const readValue = localStorage.getItem(key);
            setStoredValue(readValue);
        } catch (e) {
            console.error(e);
        }
    }, [])

    useEffect(() => {
        if (storedValue) {
            setValue(() => {
                try {
                    return JSON.parse(storedValue) as T;
                } catch (e) {
                    return null;
                }
            });
        }
    }, [storedValue]);

    useEffect(() => {
        if (value) {
            try {
                localStorage.setItem(key, JSON.stringify(value));
            } catch (e) {
                console.error(e);
            }
        }
    }, [value]);

    const removeFromStorage = () => {
        try {
            localStorage.removeItem(key);
        } catch (e) {
            console.error(e);
        }
    }

    return { value, setValue, removeFromStorage }
}

export default useLocalStorage;