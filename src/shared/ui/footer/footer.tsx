import styles from "./footer.module.css"

export function Footer(){
    return (
        <div className={styles.footerWrapper}>
            <footer className={styles.footer}>
                <h3 className={styles.footerText}>© 2026 ArtGallery. Всі права захищені</h3>
                <h3 className={styles.footerText}>+380 12 345 67 89</h3>
            </footer>
        </div>
    )
}