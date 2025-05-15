import { useState, useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import { useHotkeys } from "react-hotkeys-hook";
import cn from "classnames";
import Icon from "@/components/Icon";
import Emoji from "./Emoji";
import Gif from "./Gif";
import Tag from "./Tag";
import styles from "./AddMedia.module.sass";

type AddMediaProps = {
    className?: string;
    headClassName?: string;
    bodyClassName?: string;
    emoji?: boolean;
    file?: boolean;
    gif?: boolean;
    tag?: boolean;
    bodyUp?: boolean;
    bodyLeft?: boolean;
};

const AddMedia = ({
    className,
    headClassName,
    bodyClassName,
    emoji,
    file,
    gif,
    tag,
    bodyUp,
    bodyLeft,
}: AddMediaProps) => {
    const [visible, setVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setVisible(false));

    useHotkeys("esc", () => setVisible(false));

    return file ? (
        <div className={cn(headClassName, styles.head)}>
            <input className={styles.input} type="file" />
            <Icon name="image" />
        </div>
    ) : (
        <div
            className={cn(styles.dropdown, className, {
                [styles.active]: visible,
            })}
            ref={ref}
        >
            <button
                className={cn(headClassName, styles.head)}
                onClick={() => setVisible(!visible)}
            >
                <Icon name={emoji ? "emoji" : gif ? "gif" : "at"} />
            </button>
            <div
                className={cn(bodyClassName, styles.body, {
                    [styles.bodyEmoji]: emoji,
                    [styles.bodyGif]: gif,
                    [styles.bodyTag]: tag,
                    [styles.bodyUp]: bodyUp,
                    [styles.bodyLeft]: bodyLeft,
                })}
            >
                <div className={styles.inner}>
                    {emoji && <Emoji />}
                    {gif && <Gif />}
                    {tag && <Tag />}
                </div>
            </div>
        </div>
    );
};

export default AddMedia;
