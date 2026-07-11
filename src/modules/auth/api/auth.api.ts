import { baseApi } from "../../../shared/api/baseApi";
import type {
    AuthResponse,
    GoogleAuthPayload,
    LoginPayload,
    RegisterPayload,
} from "./auth.types";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        register: builder.mutation<AuthResponse, RegisterPayload>({
            query: (body) => ({
                url: "/auth/register",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),
        login: builder.mutation<AuthResponse, LoginPayload>({
            query: (body) => ({
                url: "/auth/login",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),
        loginWithGoogle: builder.mutation<AuthResponse, GoogleAuthPayload>({
            query: (body) => ({
                url: "/auth/google",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Profile"],
        }),
        // используется как при явном логине, так и "молча" при старте
        // приложения — чтобы восстановить сессию по refreshToken cookie
        refreshToken: builder.mutation<AuthResponse, void>({
            query: () => ({
                url: "/auth/token",
                method: "POST",
            }),
        }),
        logout: builder.mutation<void, void>({
            query: () => ({
                url: "/auth/logout",
                method: "POST",
            }),
            invalidatesTags: ["Profile"],
        }),
    }),
});

export const {
    useRegisterMutation,
    useLoginMutation,
    useLoginWithGoogleMutation,
    useRefreshTokenMutation,
    useLogoutMutation,
} = authApi;
