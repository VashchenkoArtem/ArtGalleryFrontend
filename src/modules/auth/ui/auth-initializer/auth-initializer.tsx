import { useEffect } from "react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import type { AppDispatch } from "../../../../app/store";
import { useRefreshTokenMutation } from "../../api/auth.api";
import { setAccessToken, setAuthChecked } from "../../model/authSlice";

interface AuthInitializerProps {
    children: ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
    const dispatch = useDispatch<AppDispatch>();
    const [refreshToken] = useRefreshTokenMutation();

    useEffect(() => {
        refreshToken()
            .unwrap()
            .then(({ accessToken }) => dispatch(setAccessToken(accessToken)))
            .catch(() => {
                // refreshToken cookie отсутствует или истекла — юзер просто гость,
                // это нормальная ситуация, а не ошибка
            })
            .finally(() => dispatch(setAuthChecked(true)));
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return children;
}
