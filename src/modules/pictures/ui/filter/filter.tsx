import { useState } from "react";
import { ICONS } from "../../../../shared/ui/icons/icons";
import styles from "./filter.module.css"
import type { FilterProps } from "./filter.types";

export function Filter(props: FilterProps){
    const {
        collections,
        selectedCollectionId,
        selectedOrientation,
        onCollectionChange,
        onOrientationChange
    } = props

    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const [ isCollectionsOpen, setIsCollectionsOpen ] = useState<boolean>(true)
    const [ isOrientationOpen, setIsOrientationOpen ] = useState<boolean>(true)

    const buttonMenuStyles = isOpen
                            ? styles.open
                            : styles.close

    return (
        <div className={`${styles.filterContainer} ${isOpen ? styles.filterContainerOpen : ""}`}>
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
                <div className={styles.filterPanel}>
                    <div className={styles.filterSection}>
                        <button
                            type="button"
                            className={styles.filterSectionHeader}
                            onClick={() => setIsCollectionsOpen(!isCollectionsOpen)}
                        >
                            <h2>Колекції</h2>
                            <span className={`${styles.chevron} ${isCollectionsOpen ? styles.chevronOpen : ""}`} />
                        </button>

                        { isCollectionsOpen && (
                            <div className={styles.filterOptions}>
                                <label className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="collection"
                                        checked={selectedCollectionId === null}
                                        onChange={() => onCollectionChange(null)}
                                    />
                                    Всі
                                </label>

                                { collections.map((collection) => (
                                    <label className={styles.filterOption} key={collection.id}>
                                        <input
                                            type="radio"
                                            name="collection"
                                            checked={selectedCollectionId === collection.id}
                                            onChange={() => onCollectionChange(collection.id)}
                                        />
                                        {collection.title}
                                    </label>
                                ))}
                            </div>
                        )}
                    </div>

                    <div className={styles.filterSection}>
                        <button
                            type="button"
                            className={styles.filterSectionHeader}
                            onClick={() => setIsOrientationOpen(!isOrientationOpen)}
                        >
                            <h2>Орієнтація</h2>
                            <span className={`${styles.chevron} ${isOrientationOpen ? styles.chevronOpen : ""}`} />
                        </button>

                        { isOrientationOpen && (
                            <div className={styles.filterOptions}>
                                <label className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        checked={selectedOrientation === null}
                                        onChange={() => onOrientationChange(null)}
                                    />
                                    Всі
                                </label>

                                <label className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        checked={selectedOrientation === "horizontal"}
                                        onChange={() => onOrientationChange("horizontal")}
                                    />
                                    Горизонтальна
                                </label>

                                <label className={styles.filterOption}>
                                    <input
                                        type="radio"
                                        name="orientation"
                                        checked={selectedOrientation === "vertical"}
                                        onChange={() => onOrientationChange("vertical")}
                                    />
                                    Вертикальна
                                </label>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    )
}
