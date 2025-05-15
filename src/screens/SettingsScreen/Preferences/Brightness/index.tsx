import { useState } from "react";
import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import styles from "./Brightness.module.sass";

type BrightnessProps = {};

const Brightness = ({}: BrightnessProps) => {
    const [value, setValue] = useState<number>(80);

    return (
        <div className={styles.brightness}>
            <Slider
                className="slider-brightness"
                value={value}
                onChange={(value) => setValue(value as number)}
                min={0}
                max={100}
            />
            <div className={styles.value}>{value}%</div>
        </div>
    );
};

export default Brightness;
