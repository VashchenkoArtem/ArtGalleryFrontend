import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import type { PictureProps } from "./picture.types";
import styles from "./picture.module.css"

export function Picture(props: PictureProps){
    const { picture, isPicturePage } = props
    return (
        <div className={`${styles.picture} ${isPicturePage ? styles.picturePage : undefined}`}>
            <img className={styles.pictureImage} src={`${CLOUDINARY_URL}/${picture.image}`}/>
            { isPicturePage && (
                <h4 className={styles.pictureTitle}>{picture.title}</h4>
            )}
        </div>
    )
}