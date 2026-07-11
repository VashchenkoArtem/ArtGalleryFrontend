import { baseApi } from "../../../shared/api/baseApi";
import type { UserWithoutPassword } from "../../../shared/types/user";
import type { UpdateUserPayload } from "./profile.types";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        // было "/profile" — эндпоинта с таким путём на бекенде нет,
        // реальный роут GET /api/profile/me (см. profile.router.ts)
        me: builder.query<UserWithoutPassword, void>({
            query: () => ({
                url: "/profile/me"
            }),
            providesTags: ["Profile"]
        }),
        updateUser: builder.mutation<UserWithoutPassword, UpdateUserPayload>({
            query: (userData) => {
                const formData = new FormData()
                if (userData.name) formData.append("name", userData.name)
                if (userData.email) formData.append("email", userData.email)
                // было: объект { uri, name, type } — паттерн React Native (fetch/FormData
                // там устроен иначе). В браузере FormData принимает готовый File
                // напрямую из <input type="file" />.
                if (userData.avatar) formData.append("avatar", userData.avatar)
                return {
                    url: "/profile",
                    method: "PATCH",
                    body: formData
                }
            },
            invalidatesTags: ["Profile"]
        })
    })
})

export const {
    useMeQuery,
    useUpdateUserMutation,
} = profileApi;
