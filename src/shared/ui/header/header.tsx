import { NavLink } from "react-router-dom"
import HeaderLogo from "../../../assets/header-logo.png"
import styles from "./header.module.css"

export function Header(){
    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header}>
                <img className={styles.headerLogo} src={HeaderLogo} alt="" />
                <nav className={styles.navUrls}>
                    <NavLink className={styles.url} to = "/">Головна</NavLink>
                    <NavLink className={styles.url} to = "/pictures">Картини</NavLink>
                    <NavLink className={styles.url} to = "/about">Про художника</NavLink>
                    <NavLink className={styles.url} to = "/login">Увійти</NavLink>
                </nav>
            </div>
        </div>
    )
}