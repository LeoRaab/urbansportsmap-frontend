import { useEffect } from "react";
import { useSelector } from "react-redux";
import { ICONS } from "../../../constants/Icons";
import useColorScheme from "../../../hooks/use-color-scheme";
import useToast from "../../../hooks/use-toast";
import IconButton from "../buttons/IconButton";
import Portal from "../Portal";
import { selectToast } from "./toastSlice";

const Toast = () => {
    const toastState = useSelector(selectToast);
    const toast = useToast();
    const { bgColor, textColor } = useColorScheme({ colorScheme: toastState.colorScheme });

    return toastState.isVisible ? (
        <Portal>
            <div className="flex justify-center z-1100 absolute bottom-5 w-full lg:w-2/5">
                <div className={'rounded shadow p-4 mb-4 w-3/4 relative bg-opacity-90 ' + bgColor}>
                    <div className="flex">
                        <p className={'font-semibold ' + textColor}>{toastState.message}</p>
                        <div className="absolute flex justify-center right-2 z-1100">
                            <IconButton text={''} icon={ICONS.CLOSE} color="text-white"
                                handleOnClick={toast.close} />
                        </div>
                    </div>
                    <div className="rounded mt-2 border-b-8 border-white/10" style={{ 'width': toastState.currentWidth + '%' }} />
                </div>
            </div>
        </Portal>
    ) : null
}

export default Toast;