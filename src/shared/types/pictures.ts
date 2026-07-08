export interface Picture {
    id: number;
    title: string;
    image: string;
    collectionId: number;
    orientation: "horizontal" | "vertical"
}