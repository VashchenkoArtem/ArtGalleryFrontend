import type { InputProps } from "./input.types";
import styles from "./input.module.css"

export function Input(props: InputProps){
    const { variant, width, placeholderText, inputType } = props;
    return (
        <input 
            type={inputType}
            placeholder={placeholderText}
            className={`${styles.input} ${styles[variant]}`}
            style = {{
                width: width
            }}
        />
    )
}