import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import type { PictureProps } from "./picture.types";
import styles from "./picture.module.css"
import { useNavigate } from "react-router-dom";

export function Picture(props: PictureProps){
    const { picture, isPicturePage } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pictures/${picture.id}`)
    }
    return (
        <div onClick={handleClick} className={`${styles.picture} ${isPicturePage ? styles.picturePage : undefined}`}>
            <img className={styles.pictureImage} src={`${CLOUDINARY_URL}/${picture.image}`}/>
            { isPicturePage && (
                <h4 className={styles.pictureTitle}>{picture.title}</h4>
            )}
        </div>
    )
}