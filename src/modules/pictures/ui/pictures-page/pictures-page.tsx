import { useState } from "react";
import { useGetPicturesQuery } from "../../api/pictures.api";
import { Pictures } from "../pictures/pictures";

export function PicturesPage(){
    const [ currentPage, setCurrentPage ] = useState<number>(1)
    const { data: pictures } = useGetPicturesQuery({ page: currentPage, limit: 20 })
    if (!pictures) return null
    return (
        <div>
            <Pictures pictures={pictures}/>
        </div>
    )
}