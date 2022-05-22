import React from 'react';
import ReactDOM from 'react-dom';

const modalRoot = document.getElementById('modal-root');

console.log(modalRoot);

type ModalProps = {
    children: React.ReactNode,
    position: 'top' | 'center' | 'bottom'
}

const Modal = ({ children, position }: ModalProps) => {
    let positionCss: string;

    switch (position) {
        case 'top':
            positionCss = 'items-start';
            break;
        case 'bottom':
            positionCss = 'items-end';
            break;
        case 'center':
        default:
            positionCss = 'items-center';
            break;
    }


    return ReactDOM.createPortal(
        <div className={'relative h-screen w-screen z-1000 flex justify-center ' + positionCss}>
            <div className="">
                {children}
            </div>
        </div>
        , modalRoot!
    )
} 

export default Modal;