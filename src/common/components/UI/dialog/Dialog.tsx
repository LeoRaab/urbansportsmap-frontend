import { useSelector } from "react-redux";
import { ICONS } from "../../../constants/Icons";
import useDialog from "../../../hooks/use-dialog";
import IconButton from "../buttons/IconButton";
import Modal from "../Modal";
import { selectDialog } from "./dialogSlice";

const Dialog = () => {
    const dialog = useDialog();
    const dialogState = useSelector(selectDialog);

    return dialogState.isVisible ? (
        <Modal>
            <div className="flex justify-center items-center h-screen w-full lg:w-2/5 z-1100 absolute top-0">
                <div className="flex flex-col w-3/4 bg-white shadow rounded p-4">
                    <p className="my-2">{dialogState.message}</p>
                    <div className="flex justify-between my-4">
                        <div className="w-5/12">
                            <IconButton icon={ICONS.CLOSE} text={'Nein'} handleOnClick={dialog.onReject} />
                        </div>
                        <div className="w-5/12 text-red-600">
                            <IconButton icon={ICONS.TRASH} text={'Ja'} handleOnClick={dialog.onAccept} />
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;
}

export default Dialog;