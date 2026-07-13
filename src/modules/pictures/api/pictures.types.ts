import type { Picture } from "../../../shared/types/pictures";

export interface PaginationData {
    limit?: number;
    page?: number
}

export interface CreatePicturePayload {
    title: string;
    collectionId: number;
    orientation: "horizontal" | "vertical",
    image: string
}

export interface SpecificPicturePayload {
    pictureId: number
}

export type PictureWithComments = Picture & {
    comments: {
        id: number,
        content: string,
        user: {
            id: number,
            name: string
        }
    }
}

export interface PicturesResponse {
    pictures: Picture[];
    page: number;
    limit: number;
    picturesCount: number;
    totalPages: number
}