import { useState } from "react";
import { useMediaQuery } from "usehooks-ts";
import cn from "classnames";
import Tabs from "components/Tabs";
import Follower from "components/Follower";
import Post from "components/Post";
import Image from "@/components/Image";
import ScrollMask from "@/components/ScrollMask";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import NoResultSearch from "@/components/NoResultSearch";
import styles from "./ResultSearch.module.sass";

import { myFollowers } from "mocks/followers";
import { posts } from "mocks/posts";
import { media } from "mocks/media";

type ResultSearchProps = {
    search: string;
    handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
    handleSearchSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
    visibleSearch: boolean;
    onClose?: () => void;
};

const tabs = [
    { title: "People to follow", value: "people-to-follow" },
    { title: "Trending posts", value: "trending-posts" },
    { title: "Media", value: "media" },
];

const ResultSearch = ({
    search,
    handleSearchChange,
    handleSearchSubmit,
    visibleSearch,
    onClose,
}: ResultSearchProps) => {
    const [tab, setTab] = useState<string>("people-to-follow");
    const mobile = useMediaQuery("(max-width: 767px)");

    return (
        <div className={styles.result}>
            <div className={styles.head}>
                {mobile && (
                    <div className={styles.line}>
                        <Search
                            className={styles.search}
                            value={search}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                        />
                        <button
                            className={cn("button-circle", styles.close)}
                            onClick={onClose}
                        >
                            <Icon name="close-large" />
                        </button>
                    </div>
                )}
                {search === "" && (
                    <Tabs
                        className={styles.tabs}
                        items={
                            visibleSearch && mobile ? tabs.slice(0, 2) : tabs
                        }
                        value={tab}
                        setValue={setTab}
                    />
                )}
            </div>
            {search !== "" ? (
                <NoResultSearch search={search} />
            ) : (
                <ScrollMask className={styles.body}>
                    {tab === "people-to-follow" && (
                        <div className={styles.list}>
                            {myFollowers.map((follower) => (
                                <Follower key={follower.id} item={follower} />
                            ))}
                        </div>
                    )}
                    {tab === "trending-posts" && (
                        <div className={styles.list}>
                            {posts.map((post, index) => (
                                <Post
                                    key={post.id}
                                    item={post}
                                    actionsBodyUp={index === posts.length - 1}
                                />
                            ))}
                        </div>
                    )}
                    {tab === "media" && (
                        <div className={styles.images}>
                            {media.map((item) => (
                                <div key={item.id} className={styles.image}>
                                    <Image
                                        src={item.image}
                                        width={240}
                                        height={192}
                                        alt={item.id}
                                    />
                                </div>
                            ))}
                        </div>
                    )}
                </ScrollMask>
            )}
        </div>
    );
};

export default ResultSearch;
