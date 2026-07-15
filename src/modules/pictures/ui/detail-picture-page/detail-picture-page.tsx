import { useParams } from "react-router-dom";
import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import { Button } from "../../../../shared/ui/button/button";
import { useCreateCommentMutation, useGetPictureByIdWithCommentsQuery } from "../../api/pictures.api";
import { Comment } from "../comment/comment";
import styles from "./detail-picture-page.module.css"
import { ICONS } from "../../../../shared/ui/icons/icons";
import { useForm } from "react-hook-form";
import type { CreateCommentFormData } from "./detail-picture.types";

export function DetailPicturePage(){
    const { id } = useParams()
    const { data: picture } = useGetPictureByIdWithCommentsQuery({pictureId: Number(id)}, {
        pollingInterval: 3000
    })
    const { register, handleSubmit, reset, setFocus } = useForm<CreateCommentFormData>()
    const [ createComment ] = useCreateCommentMutation()
    if (!picture) return <h1>Картину не знайдено</h1>
    const onSubmit = async (data: {content: string}) => {
        try{
            const dataWithPictureId = {
                ...data,
                pictureId: picture?.id
            }
            await createComment(dataWithPictureId).unwrap()
            reset()
        } catch(error){
            console.log(error)
        }
    }
    return(
        <div className={styles.detailPicture}>
            <img className={styles.picture} src={`${CLOUDINARY_URL}/${picture.image}`}/>
            <div className={styles.pictureInfo}>
                <div className={styles.pictureInfoHeader}>
                    <h1 className={styles.title}>{picture.title}</h1>
                    <div></div> 
                    <Button
                        variant="grey"
                        fontSize="var(--fs-nav)"
                        text="Поділитися враженнями"
                        onClick={() => setFocus("content")}
                    />
                </div>
                <div className={styles.commentsContainer}>
                    <div className={styles.comments}>
                        <h1 className={styles.commentsTitle}>Початок обговорення</h1>
                        { picture.comments?.map((comment) => <Comment comment={comment}/>)}
                    </div>
                    <form className={styles.inputContainer} onSubmit={handleSubmit(onSubmit)}>
                        <input 
                            className={styles.input}
                            type="text" 
                            placeholder="Залиште коментар" 
                            {...register("content", {
                                required: true,
                                maxLength: 256
                            })} 
                            autoCapitalize="sentences"
                            />
                        <button className={styles.sendButton} type = 'submit'>
                            <img src={ICONS.SendIcon}/>
                        </button>
                    </form>
                </div>
            </div>
        </div>
    )
}