/**
 * TODO: Add loading indicator using useReducer action.type = pending, loading
 * TODO: Try and catch api calls and Error Handling
 * TODO: Fetch MapSettings from API
 * TODO: Button Components --> Styled Components
 * TODO: Improve input-range usability & design
 * TODO: Check color persistence
 * TODO: Add Toast component to display success and error
 * TODO: Add Dialog component for user actions
 * TODO: How to get fullscreen on browsers, its working when going to favorites and then back to map
 * TODO: Think about modal provider
 * TODO: Optimize for larger screens
 * TODO: Improve Button Component Structure + disabledVersion
 * TODO: Check if passing objectId as prop to ImagePicker is the best way
 * TODO: Implement Report Image/Comment Feature
 * TODO: Implement useFilter-Hook
 * TODO: Simplify useImagePicker-Hook
 * TODO: Timeout for opendata api call
 * TODO: Save & load VenueWebEntities to/from db
 * TODO: Close menu on mapClick
 * TODO: Check userInput @ forms
 * TODO: Check if username & email is already in use
 * TODO: Check problems with verifymail and resetpassword urls from supabase
 * TODO: At signup save userProfile to db
 * TODO: Check rerender amount
 * TODO: Check z-indexes
 * TODO: Zoom in when clicking on search result
 * TODO: Find better solution for comparing sportTypes in Venue and MarkerIcon
 */

import React from 'react';
import Home from './pages/Home';
import {BrowserRouter, Route, Routes} from 'react-router-dom';
import Detail from './pages/Detail';
import Favorites from './pages/Favorites';
import MenuButton from './components/UI/buttons/MenuButton';
import Menu from './components/Menu/Menu';
import Profile from './pages/Profile';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PageNotFound from './pages/PageNotFound';
import {useDispatch, useSelector} from 'react-redux';
import {selectUi, uiActions} from './store/uiSlice';
import {useGetVenuesQuery} from './store/api/venuesApi';
import LoadingSpinner from './components/UI/LoadingSpinner';

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
                <MenuButton isShowing={ui.isMenuShowing} onMenuButtonClick={handleMenuButtonClick}/>
            </div>

            <Menu isShowing={ui.isMenuShowing}/>

            <main className="h-screen" onClick={handleMainClick}>
                <Routes>
                    <Route path="/" element={<Home/>}>
                        <Route path="/location/:latLng" element={<Home/>}/>
                    </Route>
                    <Route path="/favorites" element={<Favorites/>}/>
                    <Route path="/detail" element={<Detail/>}>
                        <Route path=":venueId" element={<Detail/>}/>
                    </Route>
                    <Route path="/profile" element={<Profile/>}/>
                    <Route path="/login" element={<Login/>}/>
                    <Route path="/signup" element={<Signup/>}/>
                    <Route path="/*" element={<PageNotFound/>}/>
                </Routes>
            </main>
        </BrowserRouter>
    );
}

export default App;
