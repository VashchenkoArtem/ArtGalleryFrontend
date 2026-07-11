import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export function ProtectedRoute() {
    const { accessToken, isAuthChecked } = useSelector((state: RootState) => state.auth);

    if (!isAuthChecked) {
        return null;
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
