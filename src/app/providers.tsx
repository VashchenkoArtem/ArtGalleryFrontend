import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";

import { store, type AppDispatch } from "./store";
import { router } from "./routers";
import { useEffect } from "react";
import type { ReactNode } from "react";
import { useDispatch } from "react-redux";
import { useRefreshTokenMutation } from "../modules/auth/api/auth.api";
import { setAccessToken, setAuthChecked } from "../modules/auth/model/auth-slice";
import { GoogleOAuthProvider } from "@react-oauth/google";

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

export function Providers() {
  return (
    <Provider store={store}>
      <GoogleOAuthProvider clientId={"237034286990-2i8m48bo6r2uh1btdpjelpr9bdnmkma7.apps.googleusercontent.com"}>
        <AuthInitializer>
          <RouterProvider router={router} />
        </AuthInitializer>
      </GoogleOAuthProvider>
    </Provider>
  );
}
