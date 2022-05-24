import { useEffect, useState } from "react";
import { ICONS } from "../../constants/Icons";
import IconButton from "./buttons/IconButton";
import Modal from "./Modal";

type ToastProps = {
    type: 'error' | 'success',
    text: string
}

const Toast = ({ type, text }: ToastProps) => {
    const [isShown, setIsShown] = useState<boolean>(true);
    const [currentWidth, setCurrentWidth] = useState<number>(100);
    const showTime = 6000;

    useEffect(() => {
        const timeInterval = 100;
        let remainingTime = showTime;

        const toastInterval = setInterval(() => {
            remainingTime -= timeInterval;
            setCurrentWidth(prevState => prevState = remainingTime / showTime * 100);
        }, timeInterval);

        setTimeout(() => {
            clearInterval(toastInterval);
            setIsShown(false);
        }, showTime);

        return () => {
            clearInterval(toastInterval);
        }
    }, [])

    let bgColor: string;
    let textColor: string;

    switch (type) {
        case 'error':
            bgColor = 'bg-red-400';
            textColor = 'text-red-50';
            break;
        case 'success':
        default:
            bgColor = 'bg-green-400';
            textColor = 'text-green-50';
            break;
    }

    const handleCloseClick = () => {
        setIsShown(false);
    }

    return isShown ? (
        <Modal position="bottom">
            <div className="flex justify-center w-screen opacity-90">
                <div className={'rounded p-4 mb-4 w-1/2 relative ' + bgColor}>
                    <p className={textColor}>{text}</p>
                    <div className="mt-2 border-b-2 border-white/50" style={{ 'width': currentWidth + '%' }} />
                    <div className="absolute top-0 right-0 z-1050">
                        <IconButton text={''} icon={ICONS.CLOSE}
                            handleOnClick={handleCloseClick} />
                    </div>
                </div>
            </div>

        </Modal>
    ) : null
}

export default Toast;