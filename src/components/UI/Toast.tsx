import { useEffect, useState } from "react";
import { ICONS } from "../../constants/Icons";
import useColorScheme from "../../hooks/useColorScheme";
import useTimer from "../../hooks/useTimer";
import COLOR_SCHEME from "../../types/ColorScheme";
import IconButton from "./buttons/IconButton";
import Modal from "./Modal";

type ToastProps = {
    text: string,
    type: COLOR_SCHEME
}

const Toast = ({ text, type }: ToastProps) => {
    const { bgColor, textColor } = useColorScheme({ type });
    const [isShown, setIsShown] = useState<boolean>(true);
    const [currentWidth, setCurrentWidth] = useState<number>(100);
    const { remainingTime } = useTimer({ duration: 5000, interval: 100 });

    useEffect(() => {
        setCurrentWidth(prevState => prevState = remainingTime / 5000 * 100);

        if (remainingTime === 0) {
            setIsShown(false);
        }
    }, [remainingTime]);

    const handleCloseClick = () => {
        setIsShown(false);
    }

    return isShown ? (
        <Modal position="bottom">
            <div className="fixed bottom-5 w-screen flex justify-center opacity-90">
                <div className={'rounded p-4 mb-4 w-3/4 relative ' + bgColor}>
                    <p className={textColor}>{text}</p>
                    <div className="mt-2 border-b-2 border-white/50" style={{ 'width': currentWidth + '%' }} />
                    <div className="absolute top-0 right-0 z-1050">
                        <IconButton text={''} icon={ICONS.CLOSE} color="text-white/50"
                            handleOnClick={handleCloseClick} />
                    </div>
                </div>
            </div>

        </Modal>
    ) : null
}

export default Toast;