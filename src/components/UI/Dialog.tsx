import { useState } from "react";
import Modal from "./Modal";

type DialogProps = {
    message: string,
    onAccept: () => void,
    onReject: () => void
}

const Dialog = ({ message, onAccept, onReject }: DialogProps) => {
    const [isVisible, setIsVisble] = useState<Boolean>(true);

    const handleAccept = () => {
        onAccept();
        setIsVisble(false);
    }

    const handleReject = () => {
        onReject();
        setIsVisble(false);
    }

    return isVisible ? (
        <Modal>
            <div className="flex justify-center items-center h-screen w-full lg:w-2/5 z-1100 absolute top-0">
                <div className="flex flex-col w-3/4 bg-white shadow rounded p-4">
                    <p className="my-2">{message}</p>
                    <div className="flex justify-between my-2">
                        <button onClick={handleReject}>nope</button>
                        <button onClick={handleAccept}>yay</button>
                    </div>
                </div>
            </div>
        </Modal>
    ) : null;
}

export default Dialog;