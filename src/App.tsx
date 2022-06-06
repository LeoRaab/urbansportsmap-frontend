/**
 * TODO: Button Components --> Styled Components
 * TODO: Check color persistence
 * TODO: Add Dialog component for user actions
 * TODO: How to get fullscreen on browsers, its working when going to favorites and then back to map
 * TODO: Optimize for larger screens
 * TODO: Improve Button Component Structure + disabledVersion
 * TODO: Implement Report Image/Comment Feature
 * TODO: Check userInput @ forms
 * TODO: Check if username is already in use
 * TODO: Check problems with verifymail and resetpassword urls from supabase
 * TODO: At signup save userProfile to db
 * TODO: Check z-indexes
 * TODO: Zoom in when clicking on search result
 * TODO: Logging system
 * TODO: Toast is hiding to fast, when deleting comment
 * TODO: Venue map link feature: Warning: Cannot update a component (`Circle`) while rendering a different component (`Home`). To locate the bad setState() call inside `Home`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
 * TODO: Image Picker Slice
 * TODO: Show Error Messages
 * TODO: Timeout bei Ladevorgängen
 */

import React, { useEffect } from 'react';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import MenuButton from './components/UI/buttons/MenuButton';
import Menu from './components/Menu/Menu';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import { useDispatch, useSelector } from 'react-redux';
import { selectUi, uiActions } from './store/uiSlice';
import { selectUserId } from './store/authSlice';
import useAuth from './hooks/use-auth';
import Home from './pages/Home';
import MainLayout from './pages/main-layout';
import PageLayout from './pages/page-layout';

const App = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    useAuth();

    const handleMenuButtonClick = () => {
        dispatch(uiActions.menuToggle());
    }

    const handleMainClick = () => {
        dispatch(uiActions.menuHidden());
    }

    //<Route path="/" element={<Home />}>
    //                        <Route path="/location/:latLng" element={<Home />} />
    //                    </Route>

    return (
        <BrowserRouter>

            <div className="fixed top-7 right-0 z-1080">
                <MenuButton isShowing={ui.isMenuShowing} onMenuButtonClick={handleMenuButtonClick} />
            </div>

            <Menu isShowing={ui.isMenuShowing} />

            <main className="h-screen" onClick={handleMainClick}>
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<Home />} />

                        <Route element={<PageLayout />}>
                            <Route path="/detail/:venueId" element={<Detail />} />
                            <Route path="/favorites" element={
                                <RequireAuth>
                                    <Favorites />
                                </RequireAuth>
                            } />
                            <Route path="/profile" element={
                                <RequireAuth>
                                    <Profile />
                                </RequireAuth>
                            } />
                            <Route path="/login" element={<Login />} />
                            <Route path="/signup" element={<Signup />} />
                            <Route path="/*" element={<PageNotFound />} />
                        </Route>
                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const userId = useSelector(selectUserId);
    if (!userId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default App;
