import { NavLink } from "react-router-dom";
import styles from "./link.module.css"
import type { LinkProps } from "./link.types";

export function Link(props: LinkProps){
    const { href, text } = props
    return (
        <NavLink
            to={href}
            className={({ isActive }) =>
                isActive
                    ? `${styles.url} ${styles.active}`
                    : styles.url
            }
        >
            {text}
        </NavLink>
    )
}