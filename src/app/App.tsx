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
 * TODO: At signup save userProfile to db
 * TODO: Check z-indexes
 * TODO: Zoom in when clicking on search result
 * TODO: Logging system
 * TODO: Toast is hiding to fast, when useToast destroys
 * TODO: Venue map link feature: Warning: Cannot update a component (`Circle`) while rendering a different component (`Home`). To locate the bad setState() call inside `Home`, follow the stack trace as described in https://reactjs.org/link/setstate-in-render
 * TODO: Show Error Messages
 * TODO: Timeout bei Ladevorgängen
 * TODO: Convert Utils to Hooks
 * TODO: Move Visibility states to featureSlice? e.g. isFilterVisible => filterSlice
 * TODO: Improve Types!!! ---> most of all image types
 * TODO: useForm hook --> initial value & valid to be able to edit
 * TODO: Put urls in .env
 * TODO: Take Picture
 * TODO: Message constant
 * TODO: Think about button design in general
 * TODO: Use heroicons package
 * TODO: CONSISTENT NAMING!!!
 * TODO: Put LoadingSpinner in hook & reducer
 * TODO: Move RequireAuth & VerifyUser components to folders
 */

import { useSelector } from 'react-redux';
import { BrowserRouter, Route, Routes, useLocation, Navigate } from 'react-router-dom';
import PageNotFound from '../common/components/PageNotFound';
import useAuth from '../common/hooks/use-auth';
import Detail from '../features/detail/Detail';
import Favorites from '../features/favorites/Favorites';
import MapUI from '../features/map/MapUI';
import { selectUserId } from '../features/user/authSlice';
import Login from '../features/user/Login';
import Profile from '../features/user/Profile';
import Signup from '../features/user/Signup';
import VerifyUser from '../features/user/VerifyUser';
import MainLayout from './MainLayout';
import PageLayout from './PageLayout';


const App = () => {

    //<Route path="/" element={<Home />}>
    //                        <Route path="/location/:latLng" element={<Home />} />
    //                    </Route>


    //is this really neccessary 
    useAuth();

    return (
        <BrowserRouter>
            <main className="h-screen">
                <Routes>
                    <Route element={<MainLayout />}>
                        <Route index element={<MapUI />} />

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

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const userId = useSelector(selectUserId);
    if (!userId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default App;