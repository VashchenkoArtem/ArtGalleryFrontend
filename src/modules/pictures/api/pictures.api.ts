import { baseApi } from "../../../shared/api/baseApi";
import type { Picture } from "../../../shared/types/pictures";
import type { CreatePicturePayload, PaginationData, PicturesResponse, PictureWithComments, SpecificPicturePayload } from "./pictures.types";

export const picturesApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getPictures: builder.query<PicturesResponse, PaginationData>({
            query: ({limit, page}) => {
                const params = new URLSearchParams()
                if (limit){
                    params.set("limit", String(limit))
                }
                if (page){
                    params.set("page", String(page))
                }
                return {
                    url: `/pictures?${params.toString()}`
                }
            },
            providesTags: ["Pictures"]
        }),
        createPicture: builder.mutation<Picture, CreatePicturePayload>({
            query: (pictureData) => {
                const formData = new FormData
                formData.append("title", pictureData.title)
                formData.append("collectionId", String(pictureData.collectionId))
                formData.append("orientation", pictureData.orientation)
                formData.append("image", pictureData.image[0] as File);
                return {
                    url: "/pictures",
                    method: "POST",
                    body: formData
                }
            },
            invalidatesTags: ["Pictures"]
        }),
        getPictureByIdWithComments: builder.query<PictureWithComments, SpecificPicturePayload>({
            query: ({ pictureId }) => ({
                url: `/pictures/${pictureId}`
            })
        })
    }),
})

export const {
    useGetPicturesQuery,
    useLazyGetPicturesQuery,
    useCreatePictureMutation,
    useGetPictureByIdWithCommentsQuery
} = picturesApi;