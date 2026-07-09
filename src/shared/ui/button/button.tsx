import type { ButtonProps } from "./button.types";
import styles from "./button.module.css"

export function Button(props: ButtonProps) {
    const { variant, text, fontSize } = props;

    return (
        <button
            className={`${styles.button} ${styles[variant]}`}
            style={{ fontSize: fontSize }}
        >
            {text}
        </button>
    );
}