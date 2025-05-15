import cn from "classnames";
import styles from "./Switch.module.sass";

type SwitchProps = {
    className?: string;
    checked: boolean;
    onChange: () => void;
};

const Switch = ({ className, checked, onChange }: SwitchProps) => (
    <button
        className={cn(styles.switch, className, {
            [styles.checked]: checked,
        })}
        onClick={onChange}
    ></button>
);

export default Switch;
