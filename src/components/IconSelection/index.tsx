import { useRef } from "react";
import { useOnClickOutside } from "usehooks-ts";
import cn from "classnames";
import { useHotkeys } from "react-hotkeys-hook";
import IconFolder from "@/components/IconFolder";
import useEventsStore from "@/store/useEventsStore";
import styles from "./IconSelection.module.sass";

type IconSelectionProps = {
    selectedIcon: string;
    setSelectedIcon: (icon: string) => void;
    selectedColor: string;
    setSelectedColor: (color: string) => void;
    down?: boolean;
    activeFolderIcons: string;
    setActiveFolderIcons: (id: string) => void;
    folderId: string;
    onClick?: () => void;
};

const IconSelection = ({
    selectedIcon,
    setSelectedIcon,
    selectedColor,
    setSelectedColor,
    down,
    activeFolderIcons,
    setActiveFolderIcons,
    folderId,
    onClick,
}: IconSelectionProps) => {
    const { isOpenIcons, toggleIcons, closeIcons } = useEventsStore(
        (state) => state
    );

    useHotkeys("esc", closeIcons);

    const ref = useRef(null);
    useOnClickOutside(
        ref,
        () => activeFolderIcons === folderId && closeIcons()
    );

    const iconsList = [
        "emoji",
        "folder",
        "stars",
        "fire",
        "tools",
        "card",
        "home",
        "earth",
        "heart",
        "mobile",
        "star",
        "edit",
    ];

    const colors = [
        "#A5A5A4",
        "#FF7474",
        "#FFA502",
        "#FFFA65",
        "#2ECC71",
        "#DEB4F6",
        "#B4AAFF",
    ];

    return (
        <div
            className={cn(styles.iconSelection, {
                [styles.visible]: activeFolderIcons === folderId && isOpenIcons,
            })}
            ref={ref}
        >
            <button
                className={styles.head}
                onClick={() => {
                    setActiveFolderIcons(folderId);
                    toggleIcons();
                    onClick && onClick();
                }}
            >
                <IconFolder name={selectedIcon} fill={selectedColor} />
            </button>
            <div className={cn(styles.body, { [styles.bodyDown]: down })}>
                <div className={styles.inner}>
                    <div className={styles.group}>
                        <div className={styles.category}>Icon</div>
                        <div className={styles.icons}>
                            {iconsList.map((icon, index) => (
                                <button
                                    className={cn(styles.icon, {
                                        [styles.selected]:
                                            icon === selectedIcon,
                                    })}
                                    key={index}
                                    onClick={() => setSelectedIcon(icon)}
                                >
                                    <IconFolder name={icon} />
                                </button>
                            ))}
                        </div>
                    </div>
                    <div className={styles.group}>
                        <div className={styles.category}>Color</div>
                        <div className={styles.colors}>
                            {colors.map((color, index) => (
                                <button
                                    className={cn(styles.color, {
                                        [styles.selected]:
                                            color === selectedColor,
                                    })}
                                    key={index}
                                    onClick={() => setSelectedColor(color)}
                                >
                                    <div
                                        className={styles.circle}
                                        style={{
                                            backgroundColor: color,
                                        }}
                                    ></div>
                                </button>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default IconSelection;
