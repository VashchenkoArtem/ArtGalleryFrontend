import styles from "./page-options.module.css"

export function PageOptions(){
    return (
        <div className={styles.pageOptions}>
            <div className={styles.option}>
                <h3 className={styles.optionTitle}>Вхід</h3>
            </div>
            <div className={styles.option}>
                <h3 className={styles.optionTitle}>Реєстрація</h3>
            </div>
        </div>
    )
}