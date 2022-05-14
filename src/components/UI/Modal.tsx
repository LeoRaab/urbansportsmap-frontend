import React from 'react';
import ReactDOM from 'react-dom';

const mount = document.getElementById("portal-root");

type ModalProps = {
    children: React.ReactNode
}

const Modal = ({children}: ModalProps) => ReactDOM.createPortal(
    <div className="absolute h-screen w-screen flex justify-center items-center">
        <div className="absolute z-1000">
            <div className="bg-white p-4 rounded-full">
                {children}
            </div>
        </div>
    </div>
    , mount!
)

export default Modal;