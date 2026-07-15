import type { Picture } from "../../../../shared/types/pictures";

export interface DetailPicturePageProps{
    picture: Picture
}

export interface CreateCommentFormData{
    content: string;
    pictureId: number
}