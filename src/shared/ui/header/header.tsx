import { useEffect, useRef, useState } from "react";
import HeaderLogo from "../../../assets/header-logo.png"
import styles from "./header.module.css"
import { Link } from "../link/link"
import { useNavigate } from "react-router-dom"

export function Header(){
    const navigate = useNavigate()
    const [isMenuOpen, setIsMenuOpen] = useState(false)
    const headerRef = useRef<HTMLDivElement>(null)

    const closeMenu = () => setIsMenuOpen(false)

    // Закриваємо меню кліком поза шапкою
    useEffect(() => {
        if (!isMenuOpen) return

        const handleClickOutside = (event: MouseEvent) => {
            if (headerRef.current && !headerRef.current.contains(event.target as Node)) {
                closeMenu()
            }
        }
        document.addEventListener("mousedown", handleClickOutside)
        return () => document.removeEventListener("mousedown", handleClickOutside)
    }, [isMenuOpen])

    const handleLogoClick = () => {
        navigate("/")
        closeMenu()
    }

    return (
        <div className={styles.headerWrapper}>
            <div className={styles.header} ref={headerRef}>
                <img className={styles.headerLogo} src={HeaderLogo} alt="ArtGallery" onClick={handleLogoClick} />

                <button
                    type="button"
                    className={`${styles.burger} ${isMenuOpen ? styles.burgerOpen : ""}`}
                    onClick={() => setIsMenuOpen((prev) => !prev)}
                    aria-label={isMenuOpen ? "Закрити меню" : "Відкрити меню"}
                    aria-expanded={isMenuOpen}
                >
                    <span/><span/><span/>
                </button>

                <nav className={`${styles.navUrls} ${isMenuOpen ? styles.navOpen : ""}`}>
                    <Link href="/" text="Головна" onClick={closeMenu}/>
                    <Link href="/pictures" text="Картини" onClick={closeMenu}/>
                    <Link href="/profile" text="Профіль" onClick={closeMenu}/>
                </nav>
            </div>
        </div>
    )
}
