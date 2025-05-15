import { useState } from "react";
import Tabs from "@/components/Tabs";
import ScrollMask from "@/components/ScrollMask";
import WhoToFollow from "./WhoToFollow";
import TrendingTopics from "./TrendingTopics";
import styles from "./RightSidebar.module.sass";

const tabs = [
    { title: "Who to follow", value: "who-to-follow" },
    { title: "Trending topics", value: "trending-topics" },
];

type RightSidebarProps = {
    activeTrending?: boolean;
    onlyFollowers?: boolean;
    onlyTopics?: boolean;
};

const RightSidebar = ({
    activeTrending,
    onlyFollowers,
    onlyTopics,
}: RightSidebarProps) => {
    const [tab, setTab] = useState<string>(
        activeTrending ? "trending-topics" : "who-to-follow"
    );

    return (
        <div className={styles.sidebar}>
            <div className={styles.head}>
                {onlyFollowers ? (
                    <div className={styles.title}>You might like</div>
                ) : onlyTopics ? (
                    <div className={styles.title}>Trending topics</div>
                ) : (
                    <Tabs items={tabs} value={tab} setValue={setTab} />
                )}
            </div>
            <ScrollMask className={styles.body}>
                {onlyFollowers && <WhoToFollow />}
                {onlyTopics && <TrendingTopics />}
                {!onlyFollowers &&
                    !onlyTopics &&
                    (tab === "who-to-follow" ? (
                        <WhoToFollow />
                    ) : (
                        <TrendingTopics />
                    ))}
            </ScrollMask>
        </div>
    );
};

export default RightSidebar;
