/**
 * TODO: Button Components --> Styled Components
 * TODO: Check color persistence
 * TODO: Add Toast component to display success and error
 * TODO: Add Dialog component for user actions
 * TODO: How to get fullscreen on browsers, its working when going to favorites and then back to map
 * TODO: Optimize for larger screens
 * TODO: Improve Button Component Structure + disabledVersion
 * TODO: Check if passing objectId as prop to ImagePicker is the best way
 * TODO: Implement Report Image/Comment Feature
 * TODO: Close menu on mapClick
 * TODO: Check userInput @ forms
 * TODO: Check if username & email is already in use
 * TODO: Check problems with verifymail and resetpassword urls from supabase
 * TODO: At signup save userProfile to db
 * TODO: Check rerender amount
 * TODO: Check z-indexes
 * TODO: Zoom in when clicking on search result
 * TODO: Logging system
 * TODO: Toast is hiding to fast, when deleting comment
 */

import React from 'react';
import Home from './pages/Home';
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

const App = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);

    const handleMenuButtonClick = () => {
        dispatch(uiActions.menuToggle());
    }

    const handleMainClick = () => {
        dispatch(uiActions.menuHidden());
    }

    return (
        <BrowserRouter>

            <div className="fixed top-7 right-0 z-1000">
                <MenuButton isShowing={ui.isMenuShowing} onMenuButtonClick={handleMenuButtonClick} />
            </div>

            <Menu isShowing={ui.isMenuShowing} />

            <main className="h-screen" onClick={handleMainClick}>
                <Routes>
                    <Route path="/" element={<Home />}>
                        <Route path="/location/:latLng" element={<Home />} />
                    </Route>
                    <Route path="/detail" element={<Detail />}>
                        <Route path=":venueId" element={<Detail />} />
                    </Route>
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
