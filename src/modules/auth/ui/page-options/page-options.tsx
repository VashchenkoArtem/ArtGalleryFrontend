import type { PageOptionsProps } from "./page-options.types";
import styles from "./page-options.module.css"
import { NavLink } from "react-router-dom";

export function PageOptions(props: PageOptionsProps){
    const { selectedPage } = props
    return (
        <nav className={styles.options}>
            <NavLink to = "/login" className={`${styles.option} 
                            ${selectedPage === "login" 
                                ? styles.selectedOption
                                : styles.inactiveOption
                            }`}>
                <h3 className={`
                            ${styles.title}
                            ${selectedPage === "login" 
                                ? styles.selectedOptionTitle
                                : styles.inactiveOptionTitle
                            }
                        `}>Вхід</h3>
            </NavLink>
            <NavLink to = "/registration"  className={`${styles.option} 
                            ${selectedPage === "registration" 
                                ? styles.selectedOption
                                : styles.inactiveOption
                            }`}>
                <h3 className={`
                            ${styles.title}
                            ${selectedPage === "registration" 
                                ? styles.selectedOptionTitle
                                : styles.inactiveOptionTitle
                            }
                        `}>Реєстрація</h3>
            </NavLink>
        </nav>
    )
}