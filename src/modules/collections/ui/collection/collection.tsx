import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import type { CollectionProps } from "./collection.types";
import styles from "./collection.module.css"

export function Collection(props: CollectionProps){
    const { collection } = props
    return (
        <div className={styles.collection}>
            <img className={styles.collectionImage} src={`${CLOUDINARY_URL}/${collection.image}`}alt="" />
            <h1 className={styles.collectionTitle}>{collection.title}</h1>
        </div>
    )
}