import { useState } from "react";
import styles from "./sort.module.css";
import type { SortOption, SortOptionConfig, SortProps } from "./sort.types";

const SORT_OPTIONS: SortOptionConfig[] = [
    { value: "default", label: "За замовченням" },
    { value: "newest", label: "Найновіші" },
];

export function Sort(props: SortProps) {
    const { value, onChange } = props;
    const [ isOpen, setIsOpen ] = useState<boolean>(false);

    const currentLabel = SORT_OPTIONS.find((option) => option.value === value)?.label;

    const handleSelect = (option: SortOption) => {
        onChange(option);
        setIsOpen(false);
    };

    return (
        <div className={styles.sortContainer}>
            <span className={styles.sortLabel}>Сортувати:</span>

            <button
                type="button"
                className={styles.sortButton}
                onClick={() => setIsOpen(!isOpen)}
            >
                {currentLabel}
                <span className={`${styles.chevron} ${isOpen ? styles.chevronOpen : ""}`} />
            </button>

            { isOpen && (
                <div className={styles.dropdown}>
                    { SORT_OPTIONS.map((option) => (
                        <button
                            type="button"
                            key={option.value}
                            className={
                                option.value === value
                                    ? `${styles.dropdownOption} ${styles.dropdownOptionActive}`
                                    : styles.dropdownOption
                            }
                            onClick={() => handleSelect(option.value)}
                        >
                            {option.label}
                        </button>
                    ))}
                </div>
            )}
        </div>
    )
}
