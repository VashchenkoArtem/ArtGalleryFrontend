// shared/api/baseApi.ts
import {
  createApi,
  fetchBaseQuery,
  type BaseQueryFn,
  type FetchArgs,
  type FetchBaseQueryError,
} from "@reduxjs/toolkit/query/react";
import { SERVER_URL } from "../constants/server";
import type { RootState } from "../../app/store";
import { setAccessToken } from "../../modules/auth/model/auth-slice";

const rawBaseQuery = fetchBaseQuery({
  baseUrl: `${SERVER_URL}/api`,
  credentials: "include",
  prepareHeaders: (headers, { getState }) => {
    const token = (getState() as RootState).auth.accessToken;
    if (token) headers.set("Authorization", `Bearer ${token}`);
    return headers;
  },
});

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
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      api.dispatch(setAccessToken(null));
    }
  }

  return result;
};

export const baseApi = createApi({
  reducerPath: "api",
  baseQuery: baseQueryWithReauth,
  endpoints: () => ({}),
});