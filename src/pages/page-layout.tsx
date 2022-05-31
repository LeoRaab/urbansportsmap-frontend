import { Outlet, useLocation } from 'react-router-dom';

const PageLayout = () => {

    return (
        <div className='w-full h-full lg:flex lg:justify-center lg:items-center z-1050 fixed top-0'>
            <div className='w-full lg:w-1/2 h-full lg:h-5/6 lg:rounded lg:shadow-lg bg-white/95'>
                <Outlet />
            </div>
        </div>
    )
}

export default PageLayout;