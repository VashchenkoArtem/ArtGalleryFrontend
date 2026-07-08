import { baseApi } from "../../../shared/api/baseApi";
import type { Collection } from "./collections.types";

export const collectionsApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        getCollections: builder.query<Collection[], object>({
            query: () => ({
                url: "/collections"
            })
        })
    })
})

export const {
    useGetCollectionsQuery
} = collectionsApi