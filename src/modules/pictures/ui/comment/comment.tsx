import { useMeQuery } from "../../../profile/api/profile.api";
import type { CommentProps } from "./comment.types";
import styles from "./comment.module.css"

export function Comment(props: CommentProps){
    const { comment } = props
    const { data: user } = useMeQuery()
    const isOwn = user?.id === comment.user.id

    return (
        <div className={`${styles.commentRow} ${isOwn ? styles.own : styles.other}`}>
            <div className={styles.bubble}>
                {!isOwn && (
                    <span className={styles.author}>{comment.user.name}</span>
                )}
                <p className={styles.content}>{comment.content}</p>
            </div>
        </div>
    )
}