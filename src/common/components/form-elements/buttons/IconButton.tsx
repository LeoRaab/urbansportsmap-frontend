import React from 'react';
import Button from './Button';

type PrimaryButtonProps = {
  text: string;
  icon: JSX.Element;
  href?: string;
  to?: string;
  onClick?: () => void;
};

const IconButton = ({ text, icon, href, to, onClick }: PrimaryButtonProps) => {
  return (
    <Button color="transparent" type="button" href={href} to={to} onClick={onClick}>
      <div className="flex items-center text-base">
        <div className="mr-2">{icon}</div>
        <p>{text}</p>
      </div>
    </Button>
  );
};

export default IconButton;
