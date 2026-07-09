import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import type { PictureProps } from "./picture.types";
import styles from "./picture.module.css"

export function Picture(props: PictureProps){
    const { picture } = props
    return (
        <div className={styles.picture}>
            <img className={styles.pictureImage} src={`${CLOUDINARY_URL}/${picture.image}`}/>
            <h4 className={styles.pictureTitle}>{picture.title}</h4>
        </div>
    )
}