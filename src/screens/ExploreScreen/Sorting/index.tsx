import { useState, useEffect, useRef } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Sorting.module.sass";

type SortingProps = {
    tags: {
        title: string;
        value: string;
    }[];
};

const Sorting = ({ tags }: SortingProps) => {
    const [activeTag, setActiveTag] = useState<number>(0);
    const tagsRef = useRef<HTMLDivElement>(null);
    const [scrollState, setScrollState] = useState<"start" | "middle" | "end">(
        "start"
    );

    const handlePrevTag = () => {
        if (activeTag > 0) {
            setActiveTag(activeTag - 1);
        }
    };

    const handleNextTag = () => {
        if (activeTag < tags.length - 1) {
            setActiveTag(activeTag + 1);
        }
    };

    const handleScroll = () => {
        if (tagsRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = tagsRef.current;
            if (scrollLeft === 0) {
                setScrollState("start");
            } else if (scrollLeft + clientWidth >= scrollWidth) {
                setScrollState("end");
            } else {
                setScrollState("middle");
            }
        }
    };

    useEffect(() => {
        const tagsElement = tagsRef.current;
        if (tagsElement) {
            tagsElement.addEventListener("scroll", handleScroll);
            handleScroll();
        }

        return () => {
            if (tagsElement) {
                tagsElement.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (tagsRef.current) {
            const activeElement = tagsRef.current.children[
                activeTag
            ] as HTMLElement;
            if (activeElement) {
                activeElement.scrollIntoView({
                    behavior: "smooth",
                    block: "nearest",
                    inline: "center",
                });
            }
        }
    }, [activeTag]);

    return (
        <div className={styles.sorting}>
            <button className={styles.arrow} onClick={handlePrevTag}>
                <Icon name="arrow-prev" />
            </button>
            <div
                className={cn(styles.tags, {
                    [styles.maskRight]: scrollState === "start",
                    [styles.maskLeft]: scrollState === "end",
                    [styles.mask]: scrollState === "middle",
                })}
                ref={tagsRef}
            >
                {tags.map((tag, index) => (
                    <button
                        className={cn(styles.tag, {
                            [styles.active]: index === activeTag,
                        })}
                        key={index}
                        onClick={() => setActiveTag(index)}
                    >
                        {tag.title}
                    </button>
                ))}
            </div>
            <button className={styles.arrow} onClick={handleNextTag}>
                <Icon name="arrow-next" />
            </button>
        </div>
    );
};

export default Sorting;
