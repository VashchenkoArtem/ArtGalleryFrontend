import type { Picture, PictureComment } from "../../../shared/types/pictures";

export interface PaginationData {
    limit?: number;
    page?: number
}

export interface CreatePicturePayload {
    title: string;
    collectionId: number;
    orientation: "horizontal" | "vertical",
    image: FileList
}

export interface SpecificPicturePayload {
    pictureId: number
}

export type PictureWithComments = Picture & {
    comments: PictureComment[]
}

export interface PicturesResponse {
    pictures: Picture[];
    page: number;
    limit: number;
    picturesCount: number;
    totalPages: number
}