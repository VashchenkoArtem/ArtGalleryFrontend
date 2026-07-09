import { useEffect, useRef } from "react";
import { useGetPicturesQuery } from "../../api/pictures.api";
import { Picture } from "../picture/picture";
import type { PicturesProps } from "./pictures.types";
import styles from "./pictures.module.css"

export function Pictures(props: PicturesProps) {
    const { limit } = props;
    const { data: pictures } = useGetPicturesQuery({ limit });

    const containerRef = useRef<HTMLDivElement>(null);
    const displayPictures = pictures
    ? [...pictures, ...pictures]
    : [];
    useEffect(() => {
        const container = containerRef.current;
        if (!container || !pictures?.length) return;

        let animationId: number;

        const animate = () => {
            container.scrollLeft += 0.5;

            const halfWidth = container.scrollWidth / 2;

            if (container.scrollLeft >= halfWidth) {
                container.scrollLeft -= halfWidth;
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [pictures]);

    return (
        <div
            ref={containerRef}
            className={styles.pictures}
        >
            {displayPictures.map((picture, index) => (
                <div key={`${picture.id}-${index}`} style={{ flexShrink: 0 }}>
                    <Picture picture={picture} />
                </div>
            ))}
        </div>
    );
}