import { Button } from "../../../../shared/ui/button/button"
import styles from "./create-picture-modal.module.css"
import type { CreatePictureModalProps } from "./create-picture-modal.types"

export function CreatePictureModal(props: CreatePictureModalProps) {
    const { isOpen, closeModal } = props
    if (!isOpen) return null
    return (    
        <div className={styles.overlay}>
            <div className={styles.modal}>
                <h2 className={styles.title}>Створити нову картину</h2>

                <div className={styles.form}>
                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-title">
                            Назва картини:
                        </label>
                        <div className={styles.inputBox}>
                            <input
                                id="picture-title"
                                type="text"
                                className={styles.textInput}
                                placeholder="Введіть назву"
                            />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-file">
                            Файл картини:
                        </label>
                        <label className={styles.inputBox} htmlFor="picture-file">
                            <span className={styles.placeholderLight}>Вибрати файл...</span>
                            <input
                                id="picture-file"
                                type="file"
                                accept="image/*"
                                className={styles.fileInput}
                            />
                        </label>
                    </div>

                    <div className={styles.field}>
                        <label className={styles.label} htmlFor="picture-collection">
                            Коллекція:
                        </label>
                        <div className={`${styles.inputBox} ${styles.selectBox}`}>
                            <select id="picture-collection" className={styles.select} defaultValue="">
                                <option value="" disabled hidden>
                                    Вибрати коллекцію...
                                </option>
                                <option className={styles.option} value="flowers">Квіти</option>
                                <option className={styles.option} value="landscapes">Пейзажі</option>
                                <option className={styles.option} value="summer">Літо</option>
                                <option className={styles.option} value="winter">Зима</option>
                                <option className={styles.option} value="still-life">Натюрморт</option>
                            </select>
                            <span className={styles.selectArrow} />
                        </div>
                    </div>

                    <div className={styles.field}>
                        <span className={styles.label}>Орієнтація:</span>

                        <div className={styles.radioGroup}>
                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="orientation"
                                    value="vertical"
                                    className={styles.radioInput}
                                    defaultChecked
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconVertical}`} />
                                Вертикальна
                            </label>

                            <label className={styles.radioOption}>
                                <input
                                    type="radio"
                                    name="orientation"
                                    value="horizontal"
                                    className={styles.radioInput}
                                />
                                <span className={`${styles.orientationIcon} ${styles.orientationIconHorizontal}`} />
                                Горизонтальна
                            </label>
                        </div>
                    </div>
                </div>

                <div className={styles.actions}>
                    <Button
                        variant="yellow"
                        text="Зберегти"
                        fontSize="1.5rem"
                        onClick={closeModal}
                    />
                </div>
            </div>
        </div>
    )
}