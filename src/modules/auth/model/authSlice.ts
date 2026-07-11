import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
    // access token живёт только в памяти Redux, а не в localStorage —
    // localStorage читается любым сторонним скриптом на странице (риск XSS).
    // refreshToken при этом лежит в httpOnly cookie и вообще недоступен из JS.
    accessToken: string | null;
    // true, когда стартовая попытка восстановить сессию (через /auth/token)
    // уже завершилась — успешно или нет. Нужно, чтобы не показывать
    // "гостевой" интерфейс на долю секунды, пока сессия ещё проверяется.
    isAuthChecked: boolean;
}

const initialState: AuthState = {
    accessToken: null,
    isAuthChecked: false,
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        setAccessToken: (state, action: PayloadAction<string | null>) => {
            state.accessToken = action.payload;
        },
        setAuthChecked: (state, action: PayloadAction<boolean>) => {
            state.isAuthChecked = action.payload;
        },
    },
});

export const { setAccessToken, setAuthChecked } = authSlice.actions;
export const authReducer = authSlice.reducer;
