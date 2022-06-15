import React from 'react'
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import IconButton from './buttons/IconButton';
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
            <div className={'sticky top-0 z-800 flex items-center w-full gap-x-6 px-4 py-8 bg-white border-b border-b-slate-200'}>
                <IconButton text="" icon={<ChevronLeftIcon />} onClick={handleBackButtonClick} />
                <h2 className="text-2xl">{text}</h2>
                <div className="absolute flex justify-center right-5">
                    <IconButton text="" icon={<XIcon />} onClick={handleBackButtonClick} />
                </div>
            </div>
        </>
    )
}

export default PageHeader;