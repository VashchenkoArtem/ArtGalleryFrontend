import { useState } from "react";
import { ICONS } from "../../../../shared/ui/icons/icons";
import styles from "./filter.module.css"
import { Input } from "../../../../shared/ui/input/input";

export function Filter(){
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const buttonMenuStyles = isOpen 
                            ? styles.open
                            : styles.close
    return (
        <div className={styles.filterContainer}>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className={styles.buttonMenu}
            >
                <img
                    src={ICONS.FilterIcon}
                    alt="Filter"
                    className={`${buttonMenuStyles}`}
                />
            </button>
            { isOpen && (
                <div>
                    <div className={styles.filterSection}>
                        <h2>Колекції</h2>

                        <div className={styles.filterOptions}>
                            <label>
                                <input type="radio" name="collection" value="all" defaultChecked />
                                Всі
                            </label>

                            <label>
                                <input type="radio" name="collection" value="flowers" />
                                Квіти
                            </label>

                            <label>
                                <input type="radio" name="collection" value="landscapes" />
                                Пейзажі
                            </label>

                            <label>
                                <input type="radio" name="collection" value="summer" />
                                Літо
                            </label>

                            <label>
                                <input type="radio" name="collection" value="winter" />
                                Зима
                            </label>

                            <label>
                                <input type="radio" name="collection" value="still-life" />
                                Натюрморт
                            </label>
                        </div>
                    </div>

                    <div className={styles.filterSection}>
                        <h2>Орієнтація</h2>

                        <div className={styles.filterOptions}>
                            <label>
                                <input type="radio" name="orientation" value="all" defaultChecked />
                                Всі
                            </label>

                            <label>
                                <input type="radio" name="orientation" value="portrait" />
                                Вертикальна
                            </label>

                            <label>
                                <input type="radio" name="orientation" value="landscape" />
                                Горизонтальна
                            </label>

                            <label>
                                <input type="radio" name="orientation" value="square" />
                                Квадратна
                            </label>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}