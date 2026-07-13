import { useEffect, useRef, useState } from "react";
import type { PointerEvent as ReactPointerEvent } from "react";
import { useGetPicturesQuery } from "../../api/pictures.api";
import { Picture } from "../picture/picture";
import type { PicturesProps } from "./pictures-with-scroll.types";
import styles from "./pictures-with-scroll.module.css"

export function Pictures(props: PicturesProps) {
    const { limit } = props;
    const { data } = useGetPicturesQuery({ limit });

    const containerRef = useRef<HTMLDivElement>(null);
    const displayPictures = data?.pictures
    ? [...data?.pictures, ...data?.pictures]
    : [];

    // ставим автоскролл на паузу, пока пользователь наводит курсор
    // или сам тащит галерею — иначе ручной скролл "перебивается" анимацией
    const [isPaused, setIsPaused] = useState(false);

    // состояние перетаскивания мышью (drag-to-scroll)
    const isDragging = useRef(false);
    const dragStartX = useRef(0);
    const scrollStartLeft = useRef(0);

    useEffect(() => {
        const container = containerRef.current;
        if (!container || !data?.pictures.length) return;

        let animationId: number;

        const animate = () => {
            if (!isPaused) {
                container.scrollLeft += 0.5;

                const halfWidth = container.scrollWidth / 2;

                if (container.scrollLeft >= halfWidth) {
                    container.scrollLeft -= halfWidth;
                } else if (container.scrollLeft < 0) {
                    container.scrollLeft += halfWidth;
                }
            }

            animationId = requestAnimationFrame(animate);
        };

        animationId = requestAnimationFrame(animate);

        return () => cancelAnimationFrame(animationId);
    }, [data?.pictures, isPaused]);

    const handlePointerDown = (e: ReactPointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container) return;

        isDragging.current = true;
        setIsPaused(true);
        dragStartX.current = e.clientX;
        scrollStartLeft.current = container.scrollLeft;
        container.setPointerCapture(e.pointerId);
    };

    const handlePointerMove = (e: ReactPointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        if (!container || !isDragging.current) return;

        const delta = e.clientX - dragStartX.current;
        container.scrollLeft = scrollStartLeft.current - delta;
    };

    const handlePointerUp = (e: ReactPointerEvent<HTMLDivElement>) => {
        const container = containerRef.current;
        isDragging.current = false;
        setIsPaused(false);
        container?.releasePointerCapture(e.pointerId);
    };
    
    return (
        <div
            ref={containerRef}
            className={styles.pictures}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onPointerDown={handlePointerDown}
            onPointerMove={handlePointerMove}
            onPointerUp={handlePointerUp}
            onPointerLeave={handlePointerUp}
        >
            {displayPictures.map((picture, index) => (
                <div key={`${picture.id}-${index}`} style={{ flexShrink: 0 }}>
                    <Picture picture={picture} />
                </div>
            ))}
        </div>
    );
}