import React from 'react'
import BackButton from './buttons/BackButton';
import {useNavigate} from 'react-router-dom';

type PageHeaderProps = {
    text: string
}

const PageHeader = ({text}: PageHeaderProps) => {

    const navigate = useNavigate();

    const handleBackButtonClick = () => {
        navigate(-1);
    }

    return (
        <>
            <div className={'flex items-center gap-x-6 px-4 py-8 border-b border-b-slate-200'}>
                <BackButton handleOnClick={handleBackButtonClick}/>
                <h2 className="text-2xl">{text}</h2>
            </div>
        </>
    )
}

export default PageHeader;