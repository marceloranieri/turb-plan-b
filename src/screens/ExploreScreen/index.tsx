"use client";

import { useState, ChangeEvent, FormEvent } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import Search from "@/components/Search";
import ScrollMask from "@/components/ScrollMask";
import Sorting from "./Sorting";
import Topic from "./Topic";
import styles from "./ExploreScreen.module.sass";

import { tags, topics } from "@/mocks/topics";

const FollowersScreen = () => {
    const [tab, setTab] = useState<string>("for-you");
    const [search, setSearch] = useState("");
    const router = useRouter();

    const handleSearchChange = (event: ChangeEvent<HTMLInputElement>) => {
        setSearch(event.target.value);
    };

    const handleSearchSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
    };

    const tabs = [
        {
            title: "For you",
            value: "for-you",
        },
        {
            title: "Trending",
            value: "trending",
        },
    ];

    return (
        <Layout rightSidebar rightSidebarOnlyFollowers>
            <div className={styles.main}>
                <div className={styles.head}>
                    <div className={styles.top}>
                        <button
                            className={cn("button-circle", styles.back)}
                            onClick={() => router.back()}
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
                            placeholder="Search topics..."
                            value={search}
                            onChange={handleSearchChange}
                            onSubmit={handleSearchSubmit}
                        />
                    </div>
                    <Sorting tags={tags} />
                </div>
                <ScrollMask className={styles.body} isMobileNavigation>
                    <div className={styles.list}>
                        {topics.map((topic) => (
                            <Topic item={topic} key={topic.id} />
                        ))}
                    </div>
                </ScrollMask>
            </div>
        </Layout>
    );
};

export default FollowersScreen;
