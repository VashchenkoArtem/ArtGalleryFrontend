export interface Picture {
    id: number;
    title: string;
    image: string;
    collectionId: number;
    orientation: "horizontal" | "vertical"
}
export type PictureComment = {
    id: number,
    content: string,
    user: {
        id: number,
        name: string
    }
}