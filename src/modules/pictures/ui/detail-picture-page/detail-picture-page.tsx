import { useParams } from "react-router-dom";
import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import { Button } from "../../../../shared/ui/button/button";
import { useGetPictureByIdWithCommentsQuery } from "../../api/pictures.api";
import { Comment } from "../comment/comment";

export function DetailPicturePage(){
    const { id } = useParams()
    const { data: picture } = useGetPictureByIdWithCommentsQuery({pictureId: Number(id)})
    if (!picture) return <h1>Картину не знайдено</h1>
    return(
        <div>
            <img src={`${CLOUDINARY_URL}/${picture.image}`}/>
            <div>
                <h1>{picture.title}</h1>
                <Button
                    variant="grey"
                    fontSize="var(--fs-nav)"
                    text="Поділитися враженнями"
                />
                <div>
                    <h1>Початок обговорення</h1>
                    <div>
                        { picture.comments?.map((comment) => <Comment comment={comment}/>)}
                    </div>
                    <input type="text" />
                </div>
            </div>
        </div>
    )
}