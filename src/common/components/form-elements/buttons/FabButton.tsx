import React, { ReactNode } from 'react';

type FabButtonProps = {
  backgroundColor: string;
  children: ReactNode;
  onClick: () => void;
};

const FabButton = ({ backgroundColor, children, onClick }: FabButtonProps) => {
  return (
    <button onClick={onClick} className={backgroundColor + ' rounded-full p-4 shadow-lg'}>
      {children}
    </button>
  );
};

export default FabButton;
