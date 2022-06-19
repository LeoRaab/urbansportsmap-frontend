import { useSelector } from "react-redux";
import { useLocation, Navigate } from "react-router-dom";
import { selectUserId } from "./userSlice";

const RequireAuth = ({ children }: { children: JSX.Element }) => {
    const location = useLocation();
    const userId = useSelector(selectUserId);
    if (!userId) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}

export default RequireAuth;