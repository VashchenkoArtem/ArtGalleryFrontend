import { ICONS } from "../../../../shared/ui/icons/icons"
import styles from "./pagination.module.css"
import type { PaginationProps } from "./pagination.types"

export function Pagination(props: PaginationProps){
    const { currentPage, setCurrentPage, data } = props
    return (
        <div className={styles.pagination}>
            <button
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(1)}
                className={styles.arrow}
            >
                <img src={ICONS.ArrowIcon} />
            </button>

            {Array.from(
                { length: data.totalPages },
                (_, index) => index + 1
            ).map((page) => (
                <button
                    key={page}
                    className={
                        page === currentPage
                            ? styles.activePage
                            : styles.pageButton
                    }
                    onClick={() => setCurrentPage(page)}
                >
                    {page}
                </button>
            ))}

            <button
                disabled={currentPage === data.totalPages}
                onClick={() => setCurrentPage(data.totalPages)}
                className={styles.arrow}
            >
                <img src={ICONS.ArrowIcon} style={{rotate: "180deg"}} />
            </button>
        </div>
    )
}