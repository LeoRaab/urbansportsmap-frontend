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
 * TODO: New hooks for auth and local storage have problem with persisting, value gets cleared on dismount
 */

import React, { useEffect } from 'react';
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
import authSlice, { authActions, selectExpirationDate, selectUserId } from './store/authSlice';
import { userActions } from './store/userSlice';
import useAuth from './hooks/use-auth';

const App = () => {

    const dispatch = useDispatch();
    const ui = useSelector(selectUi);
    const sessionExpiration = useSelector(selectExpirationDate);
    const { storedUserData } = useAuth();

    const handleMenuButtonClick = () => {
        dispatch(uiActions.menuToggle());
    }

    const handleMainClick = () => {
        dispatch(uiActions.menuHidden());
    }

    useEffect(() => {
        if (sessionExpiration) {
            const expirationDate = new Date(sessionExpiration);
            const clearSessionIn = expirationDate.getMilliseconds() - new Date().getMilliseconds()
            
            setTimeout(() => {
                dispatch(authActions.removeCredentials);
            }, clearSessionIn)
        }
    }, [sessionExpiration]);

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
