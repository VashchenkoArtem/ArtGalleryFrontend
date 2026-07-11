import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";
import type { RootState } from "../../../app/store";

export function ProtectedRoute() {
    const { accessToken, isAuthChecked } = useSelector((state: RootState) => state.auth);

    // пока не завершилась стартовая попытка восстановить сессию —
    // не решаем, пускать или нет, чтобы не редиректнуть залогиненного
    // юзера на /login только из-за того, что запрос ещё летит
    if (!isAuthChecked) {
        return null;
    }

    if (!accessToken) {
        return <Navigate to="/login" replace />;
    }

    return <Outlet />;
}
