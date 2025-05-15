"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import ScrollMask from "@/components/ScrollMask";
import Bookmark from "@/components/Bookmark";
import Icon from "@/components/Icon";
import Post from "@/components/Post";
import Background from "./Background";
import styles from "./TopicScreen.module.sass";

import { topics } from "@/mocks/topics";
import { posts } from "@/mocks/posts";

const TopicScreen = ({ topicId }: { topicId: string }) => {
    const topic = topics.find((topic) => topic.id === topicId);
    const [tab, setTab] = useState<string>("trending");
    const router = useRouter();

    const tabs = [
        {
            title: "Trending",
            value: "Trending",
        },
        {
            title: "Latest",
            value: "latest",
        },
        {
            title: "People",
            value: "people",
        },
    ];

    return topic ? (
        <Layout rightSidebar rightSidebarOnlyFollowers>
            <ScrollMask className={styles.main} isMobileNavigation>
                <Background image={topic.image} />
                <div className={styles.body}>
                    <div className={styles.head}>
                        <div className={styles.details}>
                            <div className={styles.title}>{topic.title}</div>
                            <div className={styles.time}>
                                Trending {topic.time}
                            </div>
                        </div>
                        <div className={styles.control}>
                            <Bookmark buttonCircleStyle />
                            <button className={cn("button", styles.button)}>
                                Share
                            </button>
                        </div>
                    </div>
                    <div className={styles.content}>{topic.content}</div>
                    <div className={styles.stats}>
                        <div className={styles.item}>
                            <Icon name="comment" />
                            <div className={styles.value}>{topic.posts}</div>
                            <div className={styles.text}>posts</div>
                        </div>
                        <div className={styles.item}>
                            <Icon name="profile" />
                            <div className={styles.value}>{topic.people}</div>
                            <div className={styles.text}>people</div>
                        </div>
                    </div>
                    <div className={styles.container}>
                        <Tabs
                            className={styles.tabs}
                            items={tabs}
                            value={tab}
                            setValue={setTab}
                        />
                        <div className={styles.list}>
                            {posts.map((post, index) => (
                                <Post
                                    key={post.id}
                                    item={post}
                                    actionsBodyUp={index === posts.length - 1}
                                />
                            ))}
                        </div>
                    </div>
                </div>
            </ScrollMask>
        </Layout>
    ) : null;
};

export default TopicScreen;
