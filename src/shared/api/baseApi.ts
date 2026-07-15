import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
    BaseQueryFn,
    FetchArgs,
    FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../constants/server";
import { setAccessToken } from "../../modules/auth/model/authSlice";
import type { RootState } from "../../app/store";

const rawBaseQuery = fetchBaseQuery({
    baseUrl: `${SERVER_URL}/api`,
    credentials: "include",
    prepareHeaders: (headers, { getState }) => {
        const accessToken = (getState() as RootState).auth.accessToken;
        if (accessToken) {
            headers.set("Authorization", `Bearer ${accessToken}`);
        }
        return headers;
    },
});

// access token живёт 15 минут — рано или поздно любой защищённый запрос
// вернёт 401. Вместо того чтобы сразу разлогинивать юзера, сначала пробуем
// молча обновить токен через refreshToken cookie и повторить запрос.
const baseQueryWithReauth: BaseQueryFn<
    string | FetchArgs,
    unknown,
    FetchBaseQueryError
> = async (args, api, extraOptions) => {
    let result = await rawBaseQuery(args, api, extraOptions);

    if (result.error?.status === 401) {
        const refreshResult = await rawBaseQuery(
            { url: "/auth/token", method: "POST" },
            api,
            extraOptions
        );

        if (refreshResult.data) {
            const { accessToken } = refreshResult.data as { accessToken: string };
            api.dispatch(setAccessToken(accessToken));
            // повторяем исходный запрос уже со свежим токеном
            result = await rawBaseQuery(args, api, extraOptions);
        } else {
            // refreshToken тоже недействителен/истёк — сессия реально кончилась
            api.dispatch(setAccessToken(null));
        }
    }

    return result;
};

export const baseApi = createApi({
    reducerPath: "api",
    baseQuery: baseQueryWithReauth,
    tagTypes: ["Profile", "Pictures"],
    endpoints: () => ({}),
});