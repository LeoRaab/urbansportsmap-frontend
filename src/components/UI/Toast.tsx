import { useEffect, useState } from "react";
import { ICONS } from "../../constants/Icons";
import useColorScheme from "../../hooks/use-color-scheme";
import useTimer from "../../hooks/use-timer";
import COLOR_SCHEME from "../../types/ColorScheme";
import IconButton from "./buttons/IconButton";
import Modal from "./Modal";

type ToastProps = {
    colorScheme: COLOR_SCHEME,
    text: string
}

const Toast = ({colorScheme, text}: ToastProps) => {
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const { bgColor, textColor } = useColorScheme({ colorScheme });
    const [currentWidth, setCurrentWidth] = useState<number>(100);
    const { remainingTime } = useTimer({ duration: 5000, interval: 100 });

    useEffect(() => {
        setCurrentWidth(prevState => prevState = remainingTime / 5000 * 100);
        if (remainingTime === 0) {
            setIsVisible(false);
        }
    }, [remainingTime]);

    const handleCloseClick = () => {
        setIsVisible(false);
    }

    return isVisible ? (
        <Modal position="bottom">
            <div className="fixed bottom-5 w-full lg:w-2/5 flex justify-center">
                <div className={'rounded shadow p-4 mb-4 w-3/4 relative bg-opacity-90 ' + bgColor}>
                    <div className="flex">
                        <p className={'font-semibold ' + textColor}>{text}</p>
                        <div className="absolute flex justify-center right-2 z-1100">
                            <IconButton text={''} icon={ICONS.CLOSE} color="text-white"
                                handleOnClick={handleCloseClick} />
                        </div>
                    </div>
                    <div className="rounded mt-2 border-b-8 border-white/10" style={{ 'width': currentWidth + '%' }} />
                </div>
            </div>

        </Modal>
    ) : null
}

export default Toast;