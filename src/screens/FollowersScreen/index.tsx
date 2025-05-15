"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Follower from "@/components/Follower";
import NoFollowers from "./NoFollowers";
import styles from "./FollowersScreen.module.sass";

import { myFollowers } from "@/mocks/followers";

const FollowersScreen = () => {
    const [tab, setTab] = useState<string>("followers");
    const router = useRouter();

    const tabs = [
        {
            title: "Followers",
            value: "followers",
        },
        {
            title: "Following",
            value: "following",
        },
    ];

    const filteredFollowers = myFollowers.filter(
        (follower) => follower.isFollowing
    );

    return (
        <Layout rightSidebar rightSidebarActiveTrending hideNavigation>
            <div className={styles.main}>
                <div className={styles.head}>
                    <div className={styles.back}>
                        <button
                            className={cn("button-circle", styles.button)}
                            onClick={() => router.back()}
                        >
                            <Icon name="arrow-left" />
                        </button>
                        <div className={styles.title}>Moyo Shiro</div>
                    </div>
                    <Tabs
                        className={styles.tabs}
                        items={tabs}
                        value={tab}
                        setValue={setTab}
                    />
                </div>
                {tab === "followers" && (
                    <ScrollMask className={styles.body}>
                        <div className={styles.list}>
                            {filteredFollowers.map((follower, index) => (
                                <Follower
                                    key={follower.id}
                                    item={follower}
                                    isActions
                                    actionsBodyUp={
                                        index === filteredFollowers.length - 1
                                    }
                                />
                            ))}
                        </div>
                    </ScrollMask>
                )}
                {tab === "following" && <NoFollowers />}
            </div>
        </Layout>
    );
};

export default FollowersScreen;
