import { baseApi } from "../../../shared/api/baseApi";
import type { UserWithoutPassword } from "../../../shared/types/user";
import type { UpdateUserPayload } from "./profile.types";

export const profileApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        me: builder.query<UserWithoutPassword, object>({
            query: () => ({
                url: "/profile"
            })
        }),
        updateUser: builder.mutation<UserWithoutPassword, UpdateUserPayload>({
            query: (userData) => {
                const formData = new FormData
                if (userData.name) formData.append("name", userData.name)
                if (userData.email) formData.append("email", userData.email)
                if (userData.avatar) formData.append("avatar", {
                    uri: userData.avatar,
                    name: "avatar.jpg",
                    type: "image/jpeg"
                } as unknown as Blob)
                return {
                    url: "/profile",
                    method: "PATCH",
                    body: formData
                }
            }
        })
    })
})