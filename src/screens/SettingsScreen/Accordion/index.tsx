import { useState } from "react";
import cn from "classnames";
import AnimateHeight from "react-animate-height";
import Icon from "@/components/Icon";
import styles from "./Accordion.module.sass";

type AccordionProps = {
    title: string;
    children: React.ReactNode;
    defaultHeight?: number | "auto";
};

const Accordion = ({ title, children, defaultHeight }: AccordionProps) => {
    const [height, setHeight] = useState<number | "auto">(defaultHeight || 0);

    return (
        <div className={cn(styles.accordion, { [styles.open]: height !== 0 })}>
            <div
                className={styles.head}
                onClick={() => setHeight(height === 0 ? "auto" : 0)}
            >
                {title} <Icon name="arrow-down" />
            </div>
            <AnimateHeight height={height} duration={500}>
                <div className={styles.body}>{children}</div>
            </AnimateHeight>
        </div>
    );
};

export default Accordion;
