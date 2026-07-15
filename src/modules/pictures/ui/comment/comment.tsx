import { useMeQuery } from "../../../profile/api/profile.api";
import type { CommentProps } from "./comment.types";

export function Comment(props: CommentProps){
    const { comment } = props
    const { data: user } = useMeQuery()
    return (
        <div>
            {user?.id !== comment.user.id && (
                <h1>{comment.user.name}</h1>
            )}
            <h2>{comment.content}</h2>
        </div>
    )
}