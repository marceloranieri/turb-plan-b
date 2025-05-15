import { useState } from "react";
import cn from "classnames";
import Image from "@/components/Image";
import styles from "./Theme.module.sass";

type ThemeProps = {};

const Theme = ({}: ThemeProps) => {
    const [activeId, setActiveId] = useState(1);

    const items = [
        {
            title: "Light",
            image: "/images/theme-light.png",
        },
        {
            title: "Dark",
            image: "/images/theme-dark.png",
        },
        {
            title: "Auto",
            image: "/images/theme-auto.png",
        },
    ];
    return (
        <div className={styles.theme}>
            {items.map((item, index) => (
                <div
                    className={cn(styles.item, {
                        [styles.active]: activeId === index,
                    })}
                    key={index}
                    onClick={() => setActiveId(index)}
                >
                    <div className={styles.image}>
                        <Image
                            src={item.image}
                            width={96}
                            height={72}
                            alt={item.title}
                        />
                    </div>
                    <div className={styles.title}>{item.title}</div>
                </div>
            ))}
        </div>
    );
};

export default Theme;
