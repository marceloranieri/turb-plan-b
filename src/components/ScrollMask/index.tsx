import { useEffect, useRef, useState } from "react";
import cn from "classnames";
import styles from "./ScrollMask.module.sass";

type ScrollMaskProps = {
    className?: string;
    isMobileNavigation?: boolean;
    children: React.ReactNode;
    scrollEnd?: boolean;
};

const ScrollMask = ({
    className,
    isMobileNavigation,
    children,
    scrollEnd = false,
}: ScrollMaskProps) => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isStartScrolled, setIsStartScrolled] = useState(false);
    const [isScrolledToBottom, setIsScrolledToBottom] = useState(false);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleScroll = () => {
            if (containerRef.current) {
                const { scrollTop, scrollHeight, clientHeight } =
                    containerRef.current;
                setIsScrolled(scrollHeight > clientHeight);
                setIsScrolledToBottom(
                    scrollTop + clientHeight >= scrollHeight - 1
                );
                if (scrollHeight > clientHeight && scrollTop > 1) {
                    setIsStartScrolled(true);
                } else {
                    setIsStartScrolled(false);
                }
            }
        };

        const container = containerRef.current;
        if (container) {
            container.addEventListener("scroll", handleScroll);
        }

        handleScroll();

        return () => {
            if (container) {
                container.removeEventListener("scroll", handleScroll);
            }
        };
    }, []);

    useEffect(() => {
        if (scrollEnd && containerRef.current) {
            setTimeout(() => {
                if (containerRef.current) {
                    containerRef.current.scrollTop =
                        containerRef.current.scrollHeight;
                }
            }, 0);
        }
    }, [scrollEnd, children]);

    return (
        <div
            className={cn(styles.wrap, className, {
                [styles.mask]: isStartScrolled && !isScrolledToBottom,
                [styles.maskDown]: isScrolled && !isStartScrolled,
                [styles.maskUp]: isScrolled && isScrolledToBottom,
                [styles.wrapWithNavigation]: isMobileNavigation,
            })}
            ref={containerRef}
            data-scroll-lock-scrollable
            data-scroll-lock-fill-gap
        >
            {children}
        </div>
    );
};

export default ScrollMask;
