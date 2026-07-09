import { useGetCollectionsQuery } from "../../api/collections.api"
import { Collection } from "../collection/collection"
import styles from "./collections.module.css"


export function Collections(){
    const { data: collections } = useGetCollectionsQuery({})
    if (!collections) return null
    return (
        <div className={styles.collectionsContainer}>
            <h1 className={styles.title}>Колекції</h1>
            <div className={styles.collections}>
                { collections.map((collection) => (<Collection collection={collection} />)) }
            </div>
        </div>
    )
}