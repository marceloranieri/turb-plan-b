import { useState, useRef } from "react";
import cn from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import styles from "./Item.module.sass";

type ItemProps = {
    className?: string;
    classHead?: string;
    title: string;
    icon: string;
    rightContent?: React.ReactNode;
    switchToggle?: boolean;
    switchChecked?: any;
    setSwitchChecked?: any;
    onClick?: () => void;
    dropdownHead?: string;
    dropdownBody?: React.ReactNode;
};

const Item = ({
    className,
    classHead,
    title,
    icon,
    rightContent,
    switchToggle,
    switchChecked,
    setSwitchChecked,
    onClick,
    dropdownHead,
    dropdownBody,
}: ItemProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));

    return (
        <div
            className={cn(
                styles.item,
                { [styles.itemButton]: onClick },
                { [styles.active]: visible },
                className
            )}
            onClick={onClick}
        >
            <div className={cn(styles.head, classHead)}>
                <div className={styles.label}>
                    <Icon name={icon} />
                    {title}
                </div>
                {rightContent && (
                    <div className={styles.right}>{rightContent}</div>
                )}
                {switchToggle && (
                    <Switch
                        className={styles.switch}
                        checked={switchChecked}
                        onChange={() => setSwitchChecked(!switchChecked)}
                    />
                )}
                {dropdownHead && dropdownBody && (
                    <div className={styles.dropdown} ref={ref}>
                        <button
                            className={cn(styles.dropdownHead, {
                                [styles.active]: visible,
                            })}
                            onClick={() => setVisible(!visible)}
                        >
                            {dropdownHead}
                            <Icon name="arrows" />
                        </button>
                        <div
                            className={cn(styles.dropdownBody, {
                                [styles.visible]: visible,
                            })}
                        >
                            {dropdownBody}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Item;
