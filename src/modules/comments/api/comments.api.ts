import { baseApi } from "../../../shared/api/baseApi";
import type { CommentPayload } from "./comments.types";

export const commentsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        sendComment: builder.mutation<Comment, CommentPayload>({
            query: (commentData) => ({
                url: `/picture/${commentData.pictureId}`,
                method: "POST",
                body: commentData
            })
        })
    })
})