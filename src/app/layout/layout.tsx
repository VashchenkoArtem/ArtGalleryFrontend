import { Outlet } from "react-router-dom"
import BackgroundImage from "../../assets/background.png"
import styles from "./layout.module.css"
import { Header } from "../../shared/ui/header/header"
import { Footer } from "../../shared/ui/footer/footer"

export function Layout(){
    return (
        <div className={styles.rootContainer}>
            <img className={styles.backgroundImage} src={ BackgroundImage } alt="" />
            <Header/>
            <main className={styles.children}>
                <Outlet/>
            </main>
            <Footer/>
        </div>
    )
}