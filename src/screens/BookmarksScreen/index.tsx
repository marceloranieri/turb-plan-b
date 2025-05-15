"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import NewFolder from "@/components/NewFolder";
import Folder from "@/components/Folder";
import NoResultSearch from "@/components/NoResultSearch";
import useEventsStore from "@/store/useEventsStore";
import InnerFolder from "./InnerFolder";
import NoFolders from "./NoFolders";
import styles from "./BookmarksScreen.module.sass";

import { folders } from "@/mocks/folders";

const BookmarksScreen = ({}) => {
    const [isNewFolder, setIsNewFolder] = useState(false);
    const [search, setSearch] = useState("");
    const mobile = useMediaQuery("(max-width: 767px)");
    const [activeFolderId, setActiveFolderId] = useState(mobile ? "" : "0");
    const [activeFolderIcons, setActiveFolderIcons] = useState("");
    const [visibleMobile, setVisibleMobile] = useState(false);
    const [isMounted, setIsMounted] = useState(false);
    const { isShowMobileNavigation, toggleMobileNavigation } = useEventsStore();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) return null;

    return (
        <>
            <Layout classSidebar={styles.sidebarLeft}>
                <div
                    className={cn("row", styles.row, {
                        [styles.visibleMobile]: visibleMobile,
                    })}
                >
                    <div className={cn("row-sidebar", styles.sidebar)}>
                        <div className={styles.head}>
                            {folders.length > 0 && (
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
                            )}
                            <button
                                className={cn("button-circle", styles.add, {
                                    [styles.active]: isNewFolder,
                                })}
                                onClick={() => {
                                    setIsNewFolder(!isNewFolder);
                                    toggleMobileNavigation();
                                }}
                            >
                                <Icon name="plus" />
                            </button>
                        </div>
                        {folders.length > 0 ? (
                            search === "" ? (
                                <ScrollMask
                                    className={cn(styles.body, {
                                        [styles.bodyNewFolder]: isNewFolder,
                                    })}
                                    isMobileNavigation={isShowMobileNavigation}
                                    scrollEnd={isNewFolder}
                                >
                                    <div className={styles.folders}>
                                        {folders.map((folder, index) => (
                                            <Folder
                                                onClick={() => {
                                                    setActiveFolderId(
                                                        folder.id
                                                    );
                                                    setVisibleMobile(true);
                                                }}
                                                active={
                                                    activeFolderId === folder.id
                                                }
                                                item={folder}
                                                key={folder.id}
                                                activeFolderIcons={
                                                    activeFolderIcons
                                                }
                                                setActiveFolderIcons={
                                                    setActiveFolderIcons
                                                }
                                                isNewFolder={isNewFolder}
                                                iconSelectionDown={index < 3}
                                            />
                                        ))}
                                    </div>
                                    {isNewFolder && (
                                        <NewFolder
                                            className={styles.newFolder}
                                            setActiveFolderIcons={
                                                setActiveFolderIcons
                                            }
                                            setIsNewFolder={setIsNewFolder}
                                        />
                                    )}
                                </ScrollMask>
                            ) : (
                                <NoResultSearch search={search} />
                            )
                        ) : (
                            <NoFolders />
                        )}
                    </div>
                    <InnerFolder
                        className={styles.container}
                        onClose={() => setVisibleMobile(false)}
                    />
                </div>
            </Layout>
        </>
    );
};

export default BookmarksScreen;
