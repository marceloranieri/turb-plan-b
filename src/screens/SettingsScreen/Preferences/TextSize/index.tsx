import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./TextSize.module.sass";

type TextSizeProps = {};

const TextSize = ({}: TextSizeProps) => {
    const [value, setValue] = useState<number>(50);

    return (
        <div className={styles.wrap}>
            <div className={styles.start}>A</div>
            <div className={styles.slider}>
                <Slider
                    className="slider-text-size"
                    value={value}
                    onChange={(value) => setValue(value as number)}
                    min={0}
                    max={100}
                />
            </div>
            <div className={styles.end}>A</div>
        </div>
    );
};

export default TextSize;
