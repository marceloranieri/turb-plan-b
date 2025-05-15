import { ChangeEvent, FormEvent, useState } from "react";
import cn from "classnames";
import Tabs from "@/components/Tabs";
import Search from "@/components/Search";
import Actions from "@/components/Actions";
import ScrollMask from "@/components/ScrollMask";
import Post from "@/components/Post";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import NoResultSearch from "@/components/NoResultSearch";
import NoBookmarks from "./NoBookmarks";
import styles from "./InnerFolder.module.sass";

import { postsBookmarks } from "@/mocks/posts";
import { media } from "mocks/media";

type InnerFolderProps = {
    className?: string;
    onClose: () => void;
};

const InnerFolder = ({ className, onClose }: InnerFolderProps) => {
    const [tab, setTab] = useState<string>("all");
    const [search, setSearch] = useState("");

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const tabs = [
        {
            title: "All",
            value: "all",
        },
        {
            title: "Media",
            value: "media",
        },
    ];

    const actions = [
        {
            title: "Delete folder",
            icon: "trash",
            onClick: () => console.log("Delete folder"),
        },
        {
            title: "Clear all bookmarks",
            icon: "link",
            onClick: () => console.log("Clear all bookmarks"),
        },
    ];

    return (
        <div className={cn("row-container", className)}>
            <div className={styles.head}>
                {postsBookmarks.length > 0 && (
                    <>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={onClose}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <Tabs
                            className={styles.tabs}
                            items={tabs}
                            value={tab}
                            setValue={setTab}
                        />
                        <Search
                            className={styles.search}
                            placeholder="Search bookmarks..."
                            value={search}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                        />
                    </>
                )}
                <Actions
                    className={styles.actions}
                    classBody={styles.actionsBody}
                    items={actions}
                    headButton
                />
            </div>
            {postsBookmarks.length > 0 ? (
                search === "" ? (
                    <ScrollMask className={styles.body} isMobileNavigation>
                        {tab === "all" && (
                            <div className={styles.posts}>
                                {postsBookmarks.map((post, index) => (
                                    <Post key={post.id} item={post} bookmark />
                                ))}
                            </div>
                        )}
                        {tab === "media" && (
                            <div className={styles.images}>
                                {media.map((item) => (
                                    <div key={item.id} className={styles.image}>
                                        <Image
                                            src={item.image}
                                            width={198}
                                            height={158}
                                            alt={item.id}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </ScrollMask>
                ) : (
                    <NoResultSearch search={search} />
                )
            ) : (
                <NoBookmarks />
            )}
        </div>
    );
};

export default InnerFolder;
