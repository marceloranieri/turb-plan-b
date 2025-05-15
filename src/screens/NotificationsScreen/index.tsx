"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import cn from "classnames";
import Layout from "@/components/Layout";
import Tabs from "@/components/Tabs";
import Icon from "@/components/Icon";
import ScrollMask from "@/components/ScrollMask";
import Notification from "./Notification";
import styles from "./NotificationsScreen.module.sass";

import { notifications } from "@/mocks/notifications";

const NotificationsScreen = ({}) => {
    const router = useRouter();
    const [tab, setTab] = useState<string>("all");

    const tabs = [
        {
            title: "All",
            value: "all",
        },
        {
            title: "Likes",
            value: "likes",
        },
        {
            title: "Replies",
            value: "replies",
        },
        {
            title: "Follows",
            value: "follows",
        },
    ];

    const filteredNotifications = notifications.filter((notification) => {
        if (tab === "all") {
            return notification;
        } else if (tab === "likes") {
            return notification.type === "like";
        } else if (tab === "replies") {
            return notification.type === "repost";
        } else if (tab === "follows") {
            return notification.type === "follow";
        }
        return true;
    });

    return (
        <Layout rightSidebar rightSidebarActiveTrending>
            <div className={styles.head}>
                <div className={styles.line}>
                    <button
                        className={cn("button-circle", styles.back)}
                        onClick={() => router.back()}
                    >
                        <Icon name="arrow-left" />
                    </button>
                    <div className={styles.title}>Notifications</div>
                    <Link
                        className={cn("button-circle", styles.button)}
                        href="/settings?section=notifications"
                    >
                        <Icon name="settings" />
                    </Link>
                </div>
                <Tabs
                    className={styles.tabs}
                    items={tabs}
                    value={tab}
                    setValue={setTab}
                />
            </div>
            <ScrollMask className={styles.body} isMobileNavigation>
                <div className={styles.list}>
                    {filteredNotifications.map((notification) => (
                        <Notification
                            item={{
                                ...notification,
                                type: notification.type as
                                    | "follow"
                                    | "like"
                                    | "repost"
                                    | "comment",
                            }}
                            key={notification.id}
                        />
                    ))}
                </div>
            </ScrollMask>
        </Layout>
    );
};

export default NotificationsScreen;
