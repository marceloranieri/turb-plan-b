import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import cn from "classnames";
import Icon from "@/components/Icon";
import Switch from "@/components/Switch";
import styles from "./Actions.module.sass";

type ActionsProps = {
    className?: string;
    classHead?: string;
    classBody?: string;
    items: {
        icon?: string;
        title: string;
        onClick?: () => void;
        checked?: boolean;
        onChange?: () => void;
    }[];
    bodyUp?: boolean;
    headButton?: boolean;
    onlyText?: boolean;
    reverse?: boolean;
};

const Actions = ({
    className,
    classHead,
    classBody,
    items,
    bodyUp,
    headButton,
    onlyText,
    reverse,
}: ActionsProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));

    useHotkeys("esc", () => setVisible(false));

    return (
        <div
            className={cn(styles.actions, className, {
                [styles.active]: visible,
                [styles.onlyText]: onlyText,
            })}
            ref={ref}
        >
            <button
                className={cn(
                    {
                        "button-circle": headButton,
                        [styles.headButton]: headButton,
                    },
                    styles.head,
                    classHead
                )}
                onClick={() => setVisible(!visible)}
            >
                <Icon name="dots-horizontal" />
            </button>
            <div
                className={cn(classBody, styles.body, {
                    [styles.bodyUp]: bodyUp,
                })}
            >
                <div className={styles.inner}>
                    {items.map((item, index) =>
                        item.onClick ? (
                            <button
                                className={cn(styles.item, {
                                    [styles.reverse]: reverse,
                                })}
                                key={index}
                                onClick={item.onClick}
                            >
                                {item.icon && <Icon name={item.icon} />}
                                {item.title}
                            </button>
                        ) : (
                            <div className={styles.item} key={index}>
                                {item.icon && <Icon name={item.icon} />}
                                {item.title}
                                <Switch
                                    className={styles.switch}
                                    checked={item.checked || false}
                                    onChange={item.onChange || (() => {})}
                                />
                            </div>
                        )
                    )}
                </div>
            </div>
        </div>
    );
};

export default Actions;
