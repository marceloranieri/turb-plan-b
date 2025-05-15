"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Search from "@/components/Search";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Follower from "./Follower";
import styles from "./WhoToFollowScreen.module.sass";

import { whoToFollow } from "@/mocks/followers";

const WhoToFollowScreen = () => {
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    return (
        <Layout rightSidebar rightSidebarOnlyTopics>
            <div className={styles.head}>
                <button
                    className={cn("button-circle", styles.back)}
                    onClick={() => router.back()}
                >
                    <Icon name="arrow-left" />
                </button>
                <Search
                    className={styles.search}
                    placeholder="Search people..."
                    value={search}
                    onChange={handleSearchChange}
                    onSubmit={handleSearchSubmit}
                />
            </div>
            <ScrollMask className={styles.body} isMobileNavigation>
                <div className={styles.list}>
                    {whoToFollow.map((follower) => (
                        <Follower item={follower} key={follower.id} />
                    ))}
                </div>
            </ScrollMask>
        </Layout>
    );
};

export default WhoToFollowScreen;
