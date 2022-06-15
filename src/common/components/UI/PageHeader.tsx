import React from 'react'
import { useNavigate } from 'react-router-dom';
import IconButton from '../form-elements/buttons/IconButton';
import { ChevronLeftIcon, XIcon } from '@heroicons/react/outline';

type PageHeaderProps = {
    text: string
}

const PageHeader = ({ text }: PageHeaderProps) => {

    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    return (
        <>
            <div className={'sticky top-0 z-800 flex items-center w-full px-4 py-8 bg-white border-b border-b-slate-200'}>
                <div className="w-12 mr-8">
                    <IconButton text="" icon={<ChevronLeftIcon />} onClick={handleBackButtonClick} />
                </div>
                <h2 className="text-2xl">{text}</h2>
                <div className="hidden lg-flex absolute justify-center right-5">
                    <IconButton text="" icon={<XIcon className="h-6 w-6"/>} onClick={handleBackButtonClick} />
                </div>
            </div>
        </>
    )
}

export default PageHeader;