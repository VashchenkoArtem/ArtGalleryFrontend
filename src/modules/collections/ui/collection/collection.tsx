import { useNavigate } from "react-router-dom";
import { CLOUDINARY_URL } from "../../../../shared/constants/server";
import type { CollectionProps } from "./collection.types";
import styles from "./collection.module.css"

export function Collection(props: CollectionProps){
    const { collection } = props
    const navigate = useNavigate()

    const handleClick = () => {
        navigate(`/pictures?collectionId=${collection.id}`)
    }

    return (
        <div className={styles.collection} onClick={handleClick}>
            <img className={styles.collectionImage} src={`${CLOUDINARY_URL}/${collection.image}`} alt="" />
            <h1 className={styles.collectionTitle}>{collection.title}</h1>
        </div>
    )
}
