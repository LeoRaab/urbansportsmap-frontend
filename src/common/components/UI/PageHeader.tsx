import React from 'react';
import { useNavigate } from 'react-router-dom';
import IconButton from '../form-elements/buttons/IconButton';
import { ChevronLeftIcon, XIcon } from '@heroicons/react/outline';

type PageHeaderProps = {
  text: string;
};

const PageHeader = ({ text }: PageHeaderProps) => {
  const navigate = useNavigate();

  const handleBackButtonClick = () => {
    navigate(-1);
  };

  return (
    <>
      <div
        className={'sticky top-0 z-800 flex items-center w-full px-4 py-8 mt-2 bg-white border-b border-b-slate-200'}
      >
        <div className="flex items-center">
          <ChevronLeftIcon className="icon-size cursor-pointer" onClick={handleBackButtonClick}/>
          <h2 className="ml-4 text-2xl">{text}</h2>
        </div>
        <div className="hidden lg:inline-block absolute right-5">
          <IconButton text="" icon={<XIcon className="icon-size" />} onClick={handleBackButtonClick} />
        </div>
      </div>
    </>
  );
};

export default PageHeader;
