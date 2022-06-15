import { useSelector } from "react-redux";
import { XIcon } from "@heroicons/react/outline";
import useToast from "../../../hooks/use-toast";
import Button from "../../form-elements/buttons/Button";
import Portal from "../Portal";
import { selectToast } from "./toastSlice";

const Toast = () => {
    const toastState = useSelector(selectToast);
    const toast = useToast();

    return toastState.isVisible ? (
        <Portal>
            <div className="flex justify-center z-1100 absolute bottom-5 w-full lg:w-2/5">
                <div className={'rounded shadow p-4 mb-4 w-3/4 relative bg-opacity-90 ' + toastState.type}>
                    <div className="flex">
                        <p className='font-semibold'>{toastState.message}</p>
                        <div className="absolute flex justify-center right-2 z-1100">
                            <Button color="transparent" type="button" onClick={toast.close}>
                                <XIcon />
                            </Button>
                        </div>
                    </div>
                    <div className="rounded mt-2 border-b-8 border-white/10" style={{ 'width': toastState.currentWidth + '%' }} />
                </div>
            </div>
        </Portal>
    ) : null
}

export default Toast;