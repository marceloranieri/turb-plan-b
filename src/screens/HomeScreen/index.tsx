"use client";

import { useState, ChangeEvent, FormEvent, useEffect } from "react";
import cn from "classnames";
import { useMediaQuery } from "usehooks-ts";
import Tabs from "@/components/Tabs";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import Layout from "@/components/Layout";
import NewPost from "@/components/NewPost";
import Post from "@/components/Post";
import ScrollMask from "@/components/ScrollMask";
import useEventsStore from "@/store/useEventsStore";
import ResultSearch from "./ResultSearch";
import Header from "./Header";
import styles from "./HomeScreen.module.sass";

import { posts } from "@/mocks/posts";

const HomeScreen = () => {
    const [tab, setTab] = useState<string>("for-you");
    const [search, setSearch] = useState<string>("");
    const [newPost, setNewPost] = useState<string>("");
    const [resultSearch, setResultSearch] = useState<boolean>(false);
    const [visibleSearch, setVisibleSearch] = useState<boolean>(false);
    const { isNewPost, closeNewPost, toggleNewPost, openMobileNavigation } =
        useEventsStore();
    const [isMounted, setIsMounted] = useState(false);
    const mobile = useMediaQuery("(max-width: 767px)");

    useEffect(() => {
        setIsMounted(true);
    }, []);

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const handleTabClick = () => {
        setResultSearch(false);
        setSearch("");
    };

    const tabs = [
        {
            title: "For you",
            value: "for-you",
            onClick: handleTabClick,
        },
        {
            title: "Following",
            value: "following",
            onClick: handleTabClick,
        },
    ];

    const filteredPosts = posts.filter(
        (post) => tab === "for-you" || (tab === "following" && post.following)
    );

    if (!isMounted) return null;

    return (
        <Layout rightSidebar>
            <div className={styles.main}>
                {mobile ? (
                    !resultSearch && (
                        <div className={styles.head}>
                            <Header
                                onAddPost={() => {
                                    setNewPost("");
                                    toggleNewPost();
                                    const scrollMask = document.querySelector(
                                        `.${styles.list}`
                                    );
                                    if (scrollMask) {
                                        scrollMask.scrollTop = 0;
                                    }
                                }}
                                onOpenSearch={() => setResultSearch(true)}
                            />
                            <Tabs
                                className={styles.tabs}
                                items={tabs}
                                value={tab}
                                setValue={setTab}
                            />
                        </div>
                    )
                ) : (
                    <div className={styles.head}>
                        <Tabs
                            className={styles.tabs}
                            items={tabs}
                            value={tab}
                            setValue={setTab}
                        />
                        <Search
                            className={styles.search}
                            value={search}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                            onClick={() => setResultSearch(true)}
                        />
                        <button
                            className={cn("button-circle", styles.button, {
                                [styles.active]: resultSearch || isNewPost,
                            })}
                            type="button"
                            onClick={() => {
                                setResultSearch(false);
                                setSearch("");
                                setNewPost("");
                                resultSearch && !mobile
                                    ? closeNewPost()
                                    : toggleNewPost();
                                const scrollMask = document.querySelector(
                                    `.${styles.list}`
                                );
                                if (scrollMask) {
                                    scrollMask.scrollTop = 0;
                                }
                            }}
                        >
                            <Icon name="plus" />
                        </button>
                    </div>
                )}
                <div className={styles.body}>
                    {resultSearch ? (
                        <ResultSearch
                            search={search}
                            handleSearchChange={handleSearchChange}
                            handleSearchSubmit={handleSearchSubmit}
                            visibleSearch={resultSearch}
                            onClose={() => {
                                setResultSearch(false);
                                openMobileNavigation();
                            }}
                        />
                    ) : (
                        <ScrollMask className={styles.list} isMobileNavigation>
                            <NewPost
                                content={newPost}
                                setContent={setNewPost}
                                autoFocus={!mobile}
                                classAddMedia={styles.addMedia}
                                classBodyAddMedia={styles.bodyAddMedia}
                            />
                            {filteredPosts.map((post, index) => (
                                <Post
                                    key={post.id}
                                    item={post}
                                    actionsBodyUp={index === posts.length - 1}
                                />
                            ))}
                        </ScrollMask>
                    )}
                </div>
            </div>
        </Layout>
    );
};

export default HomeScreen;
