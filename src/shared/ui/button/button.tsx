import type { ButtonProps } from "./button.types";
import styles from "./button.module.css"

export function Button(props: ButtonProps) {
    const { variant, text, fontSize, type = "button", disabled, isLoading, onClick } = props;

    return (
        <button
            type={type}
            disabled={disabled || isLoading}
            onClick={onClick}
            className={`${styles.button} ${styles[variant]} ${isLoading ? styles.loading : ""}`}
            style={{ fontSize: fontSize }}
        >
            {isLoading && <span className={styles.spinner} aria-hidden="true" />}
            <span>{text}</span>
        </button>
    );
}