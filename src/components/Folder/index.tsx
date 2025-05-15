import { useState, useRef } from "react";
import cn from "classnames";
import { useOnClickOutside } from "usehooks-ts";
import IconSelection from "@/components/IconSelection";
import Icon from "@/components/Icon";
import useEventsStore from "@/store/useEventsStore";
import styles from "./Folder.module.sass";

type FolderProps = {
    item: {
        id: string;
        name: string;
        counter: number;
        icon: string;
        iconColor: string;
    };
    activeFolderIcons: string;
    setActiveFolderIcons: (id: string) => void;
    isNewFolder?: boolean;
    onClick: () => void;
    iconSelectionDown: boolean;
    active: boolean;
};

const Folder = ({
    item,
    activeFolderIcons,
    setActiveFolderIcons,
    isNewFolder,
    onClick,
    iconSelectionDown,
    active,
}: FolderProps) => {
    const { isOpenIcons } = useEventsStore((state) => state);
    const [icon, setIcon] = useState(item.icon);
    const [color, setColor] = useState(item.iconColor);
    const [actionsVisible, setActionsVisible] = useState(false);
    const ref = useRef(null);
    useOnClickOutside(ref, () => setActionsVisible(false));

    return (
        <div
            className={cn(styles.folder, {
                [styles.hide]: isOpenIcons || isNewFolder,
                [styles.activeIcons]:
                    activeFolderIcons === item.id && !isNewFolder,
                [styles.active]: active,
                [styles.showActions]: actionsVisible,
            })}
        >
            <div className={styles.main} onClick={onClick}></div>
            <IconSelection
                selectedIcon={icon}
                setSelectedIcon={setIcon}
                selectedColor={color}
                setSelectedColor={setColor}
                activeFolderIcons={activeFolderIcons}
                setActiveFolderIcons={setActiveFolderIcons}
                down={iconSelectionDown}
                folderId={item.id}
            />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.counter}>{item.counter}</div>
            <div className={styles.actions} ref={ref}>
                <button
                    className={styles.head}
                    onClick={() => setActionsVisible(!actionsVisible)}
                >
                    <Icon name="dots-vertical" />
                </button>
                <div className={styles.body}>
                    <button
                        className={styles.action}
                        onClick={() => setActionsVisible(false)}
                    >
                        <Icon name="copy" />
                    </button>
                    <button
                        className={styles.action}
                        onClick={() => setActionsVisible(false)}
                    >
                        <Icon name="trash" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Folder;
