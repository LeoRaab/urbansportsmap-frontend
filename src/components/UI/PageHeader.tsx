import React from 'react'
import BackButton from './buttons/BackButton';
import { useNavigate } from 'react-router-dom';
import { ICONS } from '../../constants/Icons';
import IconButton from './buttons/IconButton';

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
            <div className={'flex relative items-center w-full gap-x-6 px-4 py-8 border-b border-b-slate-200'}>
                <BackButton handleOnClick={handleBackButtonClick} />
                <h2 className="text-2xl">{text}</h2>
                <div className="absolute flex justify-center right-0">
                    <IconButton text={''} icon={ICONS.CLOSE} handleOnClick={handleBackButtonClick} />
                </div>
            </div>
        </>
    )
}

export default PageHeader;