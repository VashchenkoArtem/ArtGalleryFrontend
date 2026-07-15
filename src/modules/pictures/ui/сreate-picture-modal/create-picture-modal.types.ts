export interface CreatePictureModalProps{
    isOpen: boolean;
    closeModal: () => void 
}

export type PictureOrientation = "vertical" | "horizontal";

export interface CreatePictureFormData {
    title: string;
    image: FileList;
    collectionId: number;
    orientation: PictureOrientation;
}