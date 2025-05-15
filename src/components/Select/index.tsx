import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Select.module.sass";

type Option = {
    id: string;
    title: string;
};

type SelectProps = {
    className?: string;
    label?: string;
    options: Option[];
    value: Option;
    onChange: (value: Option) => void;
};

const Select = ({
    className,
    label,
    value,
    onChange,
    options,
}: SelectProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));

    return (
        <div className={cn(styles.select, className)}>
            {label && <div className={styles.label}>{label}</div>}
            <div
                className={cn(styles.wrap, {
                    [styles.visible]: visible,
                })}
                ref={ref}
            >
                <button
                    className={styles.button}
                    onClick={() => setVisible(!visible)}
                >
                    {value.title}
                    <Icon name="arrow-down" />
                </button>
                <div className={styles.options}>
                    {options.map((option) => (
                        <button
                            className={cn(styles.option, {
                                [styles.active]: option.id === value.id,
                            })}
                            key={option.id}
                            onClick={() => {
                                onChange(option);
                                setVisible(false);
                            }}
                        >
                            {option.title}
                        </button>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default Select;
