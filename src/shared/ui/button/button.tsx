import type { ButtonProps } from "./button.types";
import styles from "./button.module.css"

export function Button(props: ButtonProps) {
    const { variant, text, fontSize, type = "button", disabled, onClick } = props;

    return (
        <button
            type={type}
            disabled={disabled}
            onClick={onClick}
            className={`${styles.button} ${styles[variant]}`}
            style={{ fontSize: fontSize }}
        >
            {text}
        </button>
    );
}