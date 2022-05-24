import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

type ModalProps = {
    children: React.ReactNode,
    position: 'top' | 'center' | 'bottom'
}

const Modal = ({ children, position }: ModalProps) => {
    let positionCss: string;

    switch (position) {
        case 'top':
            positionCss = 'top-5';
            break;
        case 'bottom':
            positionCss = 'bottom-5';
            break;
        case 'center':
        default:
            positionCss = 'top-1/2';
            break;
    }


    return ReactDOM.createPortal(
        <div className={'fixed w-screen flex justify-center z-1000 ' + positionCss}>
            {children}
        </div>
        , modalRoot!
    )
} 

export default Modal;