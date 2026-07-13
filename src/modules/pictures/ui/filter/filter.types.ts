import type { Collection } from "../../../collections/api/collections.types";

export type OrientationFilter = "horizontal" | "vertical" | null;

export interface FilterProps {
    collections: Collection[];
    selectedCollectionId: number | null;
    selectedOrientation: OrientationFilter;
    onCollectionChange: (collectionId: number | null) => void;
    onOrientationChange: (orientation: OrientationFilter) => void;
}
