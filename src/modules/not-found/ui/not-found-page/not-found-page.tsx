import { Link } from "react-router-dom";
import styles from "./not-found-page.module.css";

export function NotFoundPage() {
    return (
        <div className={styles.notFound}>
            <div className={styles.overlay} />

            <div className={styles.content}>
                <span className={styles.label}>
                    ART GALLERY
                </span>

                <h1 className={styles.code}>
                    404
                </h1>

                <h2 className={styles.title}>
                    Сторінку не знайдено
                </h2>

                <p className={styles.description}>
                    Схоже, що картина, яку ви шукаєте,
                    зникла з галереї або ніколи тут не була.
                </p>

                <Link
                    to="/"
                    className={styles.button}
                >
                    Повернутися до галереї
                </Link>
            </div>
        </div>
    );
}