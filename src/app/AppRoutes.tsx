import { BrowserRouter, Route, Routes } from "react-router-dom"
import PageNotFound from "../common/components/PageNotFound";
import Detail from "../features/detail/Detail";
import Favorites from "../features/favorites/Favorites";
import MapUI from "../features/map/MapUI";
import Login from "../features/user/Login";
import Profile from "../features/user/Profile";
import RequireAuth from "../features/user/RequireAuth";
import Signup from "../features/user/Signup";
import VerifyUser from "../features/user/VerifyUser";
import MainLayout from "./MainLayout";
import PageLayout from "./PageLayout";

const AppRoutes = () => {

    return (
        <BrowserRouter>
                <main className="h-screen">
                    <Routes>
                        <Route element={<MainLayout />}>
                            <Route index element={<MapUI />} />
                            <Route path='/venue/:coordinates' element={<MapUI />} />
                        
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
    )
}

export default AppRoutes;