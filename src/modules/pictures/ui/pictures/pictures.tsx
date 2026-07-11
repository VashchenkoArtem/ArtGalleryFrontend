import type { PicturesProps } from "./pictures.types";
import styles from "./pictures.module.css"
import { Picture } from "../picture/picture";

export function Pictures(props: PicturesProps){
    const { pictures } = props
    return (
        <div className={styles.pictures}>
            { pictures?.map((picture) => <Picture picture={picture}/>)}
        </div>
    )
}