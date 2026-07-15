export type SortOption = "default" | "newest";

export interface SortOptionConfig {
    value: SortOption;
    label: string;
}

export interface SortProps {
    value: SortOption;
    onChange: (value: SortOption) => void;
}
