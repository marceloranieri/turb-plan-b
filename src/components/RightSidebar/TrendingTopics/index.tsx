import { useId } from "react";
import { Tooltip } from "react-tooltip";
import Link from "next/link";
import Image from "@/components/Image";
import Counter from "@/components/Counter";
import Icon from "@/components/Icon";
import styles from "./TrendingTopics.module.sass";

import { trendingTopics } from "@/mocks/topics";

type TrendingTopicsProps = {};

const TrendingTopics = ({}: TrendingTopicsProps) => {
    const idTooltip = useId();

    return (
        <>
            <div className={styles.topics}>
                {trendingTopics.map((topic) => (
                    <div className={styles.topic} key={topic.id}>
                        <Link
                            className={styles.link}
                            href={`/explore/${topic.id}`}
                        >
                            <div className={styles.image}>
                                <Image
                                    src={topic.image}
                                    width={112}
                                    height={96}
                                    alt=""
                                />
                            </div>
                            <div className={styles.details}>
                                <div className={styles.title}>
                                    {topic.title}
                                </div>
                                <div className={styles.line}>
                                    <div className={styles.avatars}>
                                        {topic.avatars.map((avatar, index) => (
                                            <div
                                                className={styles.avatar}
                                                key={index}
                                            >
                                                <Image
                                                    src={avatar}
                                                    width={20}
                                                    height={20}
                                                    alt=""
                                                />
                                            </div>
                                        ))}
                                    </div>
                                    <div className={styles.time}>
                                        {topic.time}
                                    </div>
                                </div>
                            </div>
                            {topic.status && (
                                <div className={styles.status}></div>
                            )}
                        </Link>
                        <button
                            className={styles.close}
                            data-tooltip-id={idTooltip}
                            data-tooltip-content="Not interested"
                            data-tooltip-place="top-end"
                        >
                            <Icon name="close" />
                        </button>
                        <Tooltip id={idTooltip} />
                    </div>
                ))}
            </div>
            <Counter
                href="/explore"
                images={[
                    "/images/trending-pic-1.jpg",
                    "/images/trending-pic-4.jpg",
                    "/images/trending-pic-3.jpg",
                    "/images/trending-pic-2.jpg",
                    "/images/trending-pic-5.jpg",
                ]}
                value="563+"
            />
        </>
    );
};

export default TrendingTopics;
