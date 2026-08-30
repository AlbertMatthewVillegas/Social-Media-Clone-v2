import { useState } from "react";
import type { PostEntity } from "../../entities/PostEntity";

export function usePostPopUp(post: PostEntity) {
    const [currentIndex, setCurrentIndex] = useState(0);
    const totalSlides = post.content?.length ?? 0;

    const goToPrevious = () => {
        if (totalSlides <= 1) return;
        setCurrentIndex((prev) => (prev === 0 ? totalSlides - 1 : prev - 1));
    };

    const goToNext = () => {
        if (totalSlides <= 1) return;
        setCurrentIndex((prev) => (prev === totalSlides - 1 ? 0 : prev + 1));
    };

    const goToSlide = (index: number) => {
        if (totalSlides <= 1) return;
        setCurrentIndex(index);
    };

    return {
        currentIndex,
        totalSlides,
        goToPrevious,
        goToNext,
        goToSlide,
    };
}
