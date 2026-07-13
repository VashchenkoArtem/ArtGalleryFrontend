import { useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { useGetPicturesQuery } from "../../api/pictures.api";
import { useGetCollectionsQuery } from "../../../collections/api/collections.api";
import { Pictures } from "../pictures/pictures";
import styles from "./pictures-page.module.css"
import { Filter } from "../filter/filter";
import { Pagination } from "../pagination/pagination";
import type { OrientationFilter } from "../filter/filter.types";
import type { SortOption } from "../../sort/sort.types";
import { Sort } from "../../sort/sort";
import { useMeQuery } from "../../../profile/api/profile.api";
import { Button } from "../../../../shared/ui/button/button";
import { CreatePictureModal } from "../сreate-picture-modal/create-picture-modal";

const PAGE_SIZE = 10;
// Картин у галереї не буде більше 50, тож простіше і надійніше забрати їх
// одним запитом і робити фільтрацію/сортування/пагінацію на клієнті,
// не чіпаючи бекенд.
const ALL_PICTURES_LIMIT = 50;

function parseCollectionId(raw: string | null): number | null {
    if (!raw) return null;
    const parsed = Number(raw);
    return Number.isNaN(parsed) ? null : parsed;
}

export function PicturesPage() {
    const [searchParams, setSearchParams] = useSearchParams();

    const [currentPage, setCurrentPage] = useState(1);
    const { data: user } = useMeQuery()
    const [selectedCollectionId, setSelectedCollectionId] = useState<number | null>(
        () => parseCollectionId(searchParams.get("collectionId"))
    );
    const [selectedOrientation, setSelectedOrientation] = useState<OrientationFilter>(null);
    const [sortBy, setSortBy] = useState<SortOption>("default");

    const { data } = useGetPicturesQuery({
        page: 1,
        limit: ALL_PICTURES_LIMIT,
    });
    const { data: collections } = useGetCollectionsQuery({});

    const filteredAndSortedPictures = useMemo(() => {
        if (!data) return [];

        let pictures = data.pictures;

        if (selectedCollectionId !== null) {
            pictures = pictures.filter(
                (picture) => picture.collectionId === selectedCollectionId
            );
        }

        if (selectedOrientation !== null) {
            pictures = pictures.filter(
                (picture) => picture.orientation === selectedOrientation
            );
        }

        if (sortBy === "newest") {
            pictures = [...pictures].sort((a, b) => b.id - a.id);
        }

        return pictures;
    }, [data, selectedCollectionId, selectedOrientation, sortBy]);
    const [ isOpen, setIsOpen ] = useState<boolean>(false)
    const totalPages = Math.max(
        1,
        Math.ceil(filteredAndSortedPictures.length / PAGE_SIZE)
    );
    const safeCurrentPage = Math.min(currentPage, totalPages);

    const handleCollectionChange = (collectionId: number | null) => {
        setSelectedCollectionId(collectionId);
        setCurrentPage(1);
        setSearchParams((prev) => {
            const next = new URLSearchParams(prev);
            if (collectionId !== null) {
                next.set("collectionId", String(collectionId));
            } else {
                next.delete("collectionId");
            }
            return next;
        }, { replace: true });
    };

    const handleOrientationChange = (orientation: OrientationFilter) => {
        setSelectedOrientation(orientation);
        setCurrentPage(1);
    };

    const handleSortChange = (sort: SortOption) => {
        setSortBy(sort);
        setCurrentPage(1);
    };

    if (!data) return null;

    const paginatedPictures = filteredAndSortedPictures.slice(
        (safeCurrentPage - 1) * PAGE_SIZE,
        safeCurrentPage * PAGE_SIZE
    );

    return (
        <div className={styles.picturesPage}>
            <Filter
                collections={collections ?? []}
                selectedCollectionId={selectedCollectionId}
                selectedOrientation={selectedOrientation}
                onCollectionChange={handleCollectionChange}
                onOrientationChange={handleOrientationChange}
            />
            <div className={styles.picturesWithPagination}>
                <div className={styles.picturesToolbar}>
                    <Sort value={sortBy} onChange={handleSortChange} />
                    { user?.isAdmin && (
                        <Button
                            variant="grey"
                            text="Створити нову"
                            fontSize="1rem"
                            onClick={() => setIsOpen(true)}
                        />
                    )}
                </div>

                { paginatedPictures.length > 0 ? (
                    <Pictures
                        isPicturePage={true}
                        pictures={paginatedPictures}
                    />
                ) : (
                    <p className={styles.emptyState}>
                        За обраними фільтрами картин не знайдено
                    </p>
                )}

                <Pagination
                    currentPage={safeCurrentPage}
                    setCurrentPage={setCurrentPage}
                    data={{
                        pictures: paginatedPictures,
                        page: safeCurrentPage,
                        limit: PAGE_SIZE,
                        picturesCount: filteredAndSortedPictures.length,
                        totalPages,
                    }}
                />
            </div>
            <CreatePictureModal
                isOpen={isOpen}
                closeModal={() => setIsOpen(false)}
            />
        </div>
    );
}
