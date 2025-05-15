import { useState } from "react";
import cn from "classnames";
import styles from "./Colors.module.sass";

const colors = ["#425DE8", "#EDBF64", "#64C089", "#9B7AF9", "#F16D8D"];

type ColorsProps = {};

const Colors = ({}: ColorsProps) => {
    const [activeColor, setActiveColor] = useState(0);

    return (
        <div className={styles.colors}>
            {colors.map((color, index) => (
                <button
                    className={cn(styles.color, {
                        [styles.active]: activeColor === index,
                    })}
                    key={index}
                    style={{ background: color }}
                    onClick={() => setActiveColor(index)}
                />
            ))}
        </div>
    );
};

export default Colors;
