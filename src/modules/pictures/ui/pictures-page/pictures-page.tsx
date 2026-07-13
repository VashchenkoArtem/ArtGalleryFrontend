import { useState } from "react";
import { useGetPicturesQuery } from "../../api/pictures.api";
import { Pictures } from "../pictures/pictures";
import styles from "./pictures-page.module.css"
import { Filter } from "../filter/filter";
import { Pagination } from "../pagination/pagination";


export function PicturesPage() {
    const [currentPage, setCurrentPage] = useState(1);

    const { data } = useGetPicturesQuery({
        page: currentPage,
        limit: 5,
    });

    if (!data) return null;

    return (
        <div className={styles.picturesPage}>
            <Filter />
            <div className={styles.picturesWithPagination}>
                <Pictures
                    isPicturePage={true}
                    pictures={data.pictures}
                />
                <Pagination
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    data={data}
                />
            </div>
        </div>
    );
}