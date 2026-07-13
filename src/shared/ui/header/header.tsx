import HeaderLogo from "../../../assets/header-logo.png"
import styles from "./header.module.css"
import { Link } from "../link/link"

export function Header(){
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <img className={styles.headerLogo} src={HeaderLogo} alt="" />
                <nav className={styles.navUrls}>
                    <Link href = "/" text="Головна"/>
                    <Link href = "/pictures" text="Картини"/>
                    <Link href = "/profile" text="Профіль"/>
                </nav>
            </div>
        </div>
    )
}