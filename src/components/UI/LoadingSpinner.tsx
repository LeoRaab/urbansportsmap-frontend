import React from 'react';
import Modal from './Modal';

const LoadingSpinner = () => {
    return (
        <Modal position='center'>
            <div className="bg-white p-4 rounded-full">
                <div
                    className="spinner-border w-16 h-16 border-4 border-indigo-400 border-solid rounded-full animate-spin" />
            </div>
        </Modal>
    )
}

export default LoadingSpinner;

