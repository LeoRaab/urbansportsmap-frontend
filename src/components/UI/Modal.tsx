import React from 'react';
import Portal from './Portal';

type ModalProps = {
    children: React.ReactNode
}

const Modal = ({ children }: ModalProps) => {

    return (
        <Portal>
            <div className={'absolute top-0 h-screen w-screen flex flex-col justify-center items-center z-1100'}>
                {children}
            </div>
        </Portal>
    )
}

export default Modal;