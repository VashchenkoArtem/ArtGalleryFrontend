// modules/auth/api/auth.api.ts
import { baseApi } from "../../../shared/api/baseApi";
import type { LoginRequest, RegisterRequest, AuthResponse, GoogleAuthRequest } from "./auth.types";

export const authApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    register: builder.mutation<AuthResponse, RegisterRequest>({
      query: (body) => ({ url: "/auth/register", method: "POST", body }),
    }),
    login: builder.mutation<AuthResponse, LoginRequest>({
      query: (body) => ({ url: "/auth/login", method: "POST", body }),
    }),
    loginWithGoogle: builder.mutation<AuthResponse, GoogleAuthRequest>({
      query: (body) => ({ url: "/auth/google", method: "POST", body }),
    }),
    refreshToken: builder.mutation<AuthResponse, void>({
      query: () => ({ url: "/auth/token", method: "POST" }),
    }),
    logout: builder.mutation<void, void>({
      query: () => ({ url: "/auth/logout", method: "POST" }),
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