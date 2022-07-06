import { Outlet } from 'react-router-dom';

const PageLayout = () => {
  return (
    <div className="w-full h-full pb-8 lg:flex lg:justify-center lg:items-center z-1050 absolute top-0">
      <div className="w-full lg:w-1/2 h-screen lg:h-5/6 pb-8 lg:rounded lg:shadow-lg bg-white/95 overflow-y-scroll">
        <Outlet />
      </div>
    </div>
  );
};

export default PageLayout;
