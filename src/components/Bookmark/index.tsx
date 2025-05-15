import { ChangeEvent, FormEvent, useState, useId } from "react";
import Link from "next/link";
import { Tooltip } from "react-tooltip";
import { toast } from "react-hot-toast";
import cn from "classnames";
import Icon from "@/components/Icon";
import Modal from "@/components/Modal";
import Search from "@/components/Search";
import ScrollMask from "@/components/ScrollMask";
import Notify from "@/components/Notify";
import NewFolder from "@/components/NewFolder";
import Folder from "./Folder";
import styles from "./Bookmark.module.sass";

import { folders } from "@/mocks/folders";

type BookmarkProps = {
    className?: string;
    buttonCircleStyle?: boolean;
    initialBookmark?: boolean;
};

const Bookmark = ({
    className,
    buttonCircleStyle,
    initialBookmark,
}: BookmarkProps) => {
    const [isNewFolder, setIsNewFolder] = useState(false);
    const [bookmark, setBookmark] = useState(initialBookmark || false);
    const [visibleModal, setVisibleModal] = useState(false);
    const [search, setSearch] = useState("");
    const [activeFolderIcons, setActiveFolderIcons] = useState("");
    const idTooltip = useId();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleBookmark = () => {
        setVisibleModal(true);
        setIsNewFolder(false);
    };

    const handleFolderClick = (name: string) => {
        setBookmark(true);
        setVisibleModal(false);
        setIsNewFolder(false);
        toast((t) => (
            <Notify onClose={() => toast.dismiss(t.id)}>
                <div className={styles.subtitle}>
                    Added to <span>{name}</span>{" "}
                    <Link href="/bookmarks">Visit</Link>
                </div>
            </Notify>
        ));
    };

    return (
        <>
            <button
                className={cn(
                    buttonCircleStyle ? "button-circle" : "social-circle",
                    className,
                    styles.bookmark,
                    {
                        [styles.active]: bookmark,
                    }
                )}
                onClick={handleBookmark}
                data-tooltip-id={idTooltip}
                data-tooltip-content="Bookmark"
                data-tooltip-place="top"
            >
                <div className={styles.icon}>
                    <Icon name="bookmark" />
                    <Icon name="bookmark-fill" />
                </div>
            </button>
            <Tooltip id={idTooltip} />
            <Modal
                containerClassName={styles.containerModal}
                innerClassName={styles.innerModal}
                closeClassName={styles.closeModal}
                visible={visibleModal}
                onClose={() => setVisibleModal(false)}
                hideCloseButton={true}
            >
                <div className={styles.head}>
                    <Search
                        className={cn(styles.search, {
                            [styles.hide]: isNewFolder,
                        })}
                        classInput={styles.inputSearch}
                        placeholder="Search folder..."
                        value={search}
                        onChange={handleSearchChange}
                        onSubmit={handleSearchSubmit}
                    />
                    <button
                        className={cn("button-circle", styles.add, {
                            [styles.active]: isNewFolder,
                        })}
                        onClick={() => setIsNewFolder(!isNewFolder)}
                    >
                        <Icon name="plus" />
                    </button>
                </div>
                <ScrollMask
                    className={cn(styles.body, {
                        [styles.bodyNewFolder]: isNewFolder,
                    })}
                >
                    {isNewFolder && (
                        <NewFolder
                            className={styles.newFolder}
                            setActiveFolderIcons={setActiveFolderIcons}
                            setIsNewFolder={setIsNewFolder}
                            iconSelectionDown
                        />
                    )}
                    <div className={styles.folders}>
                        {folders.map((folder) => (
                            <Folder
                                item={folder}
                                key={folder.id}
                                onClick={() => handleFolderClick(folder.name)}
                            />
                        ))}
                    </div>
                </ScrollMask>
            </Modal>
        </>
    );
};

export default Bookmark;
