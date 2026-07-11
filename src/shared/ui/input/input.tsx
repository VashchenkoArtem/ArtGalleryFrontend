import type { InputProps } from "./input.types";
import styles from "./input.module.css"
export function Input(props: InputProps){
    const { 
        variant, 
        placeholderText, 
        label, 
        inputType,
        ...rest
    } = props
    return (
        <div style = {{display: "flex", flexDirection: "column"}}>
            <label className={styles.label}>
                { label }
            </label>
            <input 
                type={inputType} 
                className={`${styles.input} ${styles[variant]}`} 
                placeholder={placeholderText}
                {...rest}
                />
        </div>
    )
}