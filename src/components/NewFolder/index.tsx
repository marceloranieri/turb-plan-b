import { useState } from "react";
import TextareaAutosize from "react-textarea-autosize";
import cn from "classnames";
import IconSelection from "@/components/IconSelection";
import Icon from "@/components/Icon";
import styles from "./NewFolder.module.sass";

type NewFolderProps = {
    className?: string;
    setActiveFolderIcons: (id: string) => void;
    iconSelectionDown?: boolean;
    setIsNewFolder: (isNewFolder: boolean) => void;
};

const NewFolder = ({
    className,
    setActiveFolderIcons,
    iconSelectionDown,
    setIsNewFolder,
}: NewFolderProps) => {
    const [title, setTitle] = useState("");
    const [icon, setIcon] = useState("emoji");
    const [color, setColor] = useState("#A5A5A4");

    const handleChange = (e: any) => {
        const newTitle = e.target.value;
        if (newTitle.length <= 24) {
            setTitle(newTitle);
        }
    };

    const handleKeyDown = (event: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (event.key === "Enter") {
            event.preventDefault();
        }
    };

    const handleAdd = () => {
        if (title.trim() !== "") {
            setTitle("");
            setIcon("emoji");
            setColor("#A5A5A4");
            setIsNewFolder(false);
        }
    };

    return (
        <div className={cn(styles.newFolder, className)}>
            <IconSelection
                selectedIcon={icon}
                setSelectedIcon={setIcon}
                selectedColor={color}
                setSelectedColor={setColor}
                activeFolderIcons="new-folder"
                setActiveFolderIcons={setActiveFolderIcons}
                folderId="new-folder"
                down={iconSelectionDown}
            />
            <div className={styles.field}>
                <TextareaAutosize
                    className={styles.input}
                    placeholder="Folder name..."
                    maxRows={1}
                    value={title}
                    onChange={handleChange}
                    onKeyDown={handleKeyDown}
                    autoFocus
                />
            </div>
            <button
                className={cn(styles.add, {
                    [styles.visible]: title !== "",
                })}
                onClick={handleAdd}
            >
                <Icon name="check-circle-fill" />
            </button>
        </div>
    );
};

export default NewFolder;
