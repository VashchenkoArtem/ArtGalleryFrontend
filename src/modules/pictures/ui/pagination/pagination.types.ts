import type { PicturesResponse } from "../../api/pictures.types";

export interface PaginationProps{
    currentPage: number;
    setCurrentPage: (page: number) => void;
    data: PicturesResponse
}