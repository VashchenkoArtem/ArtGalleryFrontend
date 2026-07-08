export interface Comment {
    id: number;
    content: string;
    pictureId: number;
    userId: number;
}
export interface CommentPayload {
    content: string;
    pictureId: number
}