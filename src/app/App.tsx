/**
 * TODO: How to get fullscreen on browsers, its working when going to favorites and then back to map
 * TODO: Optimize for larger screens
 * TODO: Implement Report Image/Comment Feature
 * TODO: Check userInput @ forms
 * TODO: Check if username is already in use
 * TODO: Zoom in when clicking on search result
 * TODO: Logging system
 * TODO: Toast is hiding to fast, when useToast destroys
 * TODO: Show Error Messages - Maybe use hook for error handling
 * TODO: Timeout bei Ladevorgängen
 * TODO: Convert Utils to Hooks?
 * TODO: Move Visibility states to featureSlice? e.g. isFilterVisible => filterSlice
 * TODO: Improve Types!!! ---> most of all image types
 * TODO: Put urls in .env
 * TODO: Take Picture
 * TODO: Message constant
 * TODO: CONSISTENT NAMING!!!
 * TODO: Put LoadingSpinner in hook & reducer
 * TODO: When changing password confirmation password has to be invalid again!
 * TODO: Venues work with selectors and refactor logic
 */

import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PageNotFound from '../common/components/PageNotFound';
import useAuth from '../common/hooks/use-auth';
import Detail from '../features/detail/Detail';
import Favorites from '../features/favorites/Favorites';
import MapUI from '../features/map/MapUI';
import { selectUserId } from '../features/user/userSlice';
import Login from '../features/user/Login';
import Profile from '../features/user/Profile';
import Signup from '../features/user/Signup';
import VerifyUser from '../features/user/VerifyUser';
import MainLayout from './MainLayout';
import PageLayout from './PageLayout';
import { useGetVenuesQuery } from '../features/map/mapSlice';
import RequireAuth from '../features/user/RequireAuth';


const App = () => {
    const {isLoading, isError} = useGetVenuesQuery();

    useAuth();

    return (
        <BrowserRouter>
            <main className="h-screen">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<MapUI />} />
                        <Route path='/:coordinates' element={<MapUI />} />

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
                            <Route path="/verify/:verifyString" element={<VerifyUser />} />
                            <Route path="/*" element={<PageNotFound />} />
                        </Route>

                    </Route>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;