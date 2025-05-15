import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Repost.module.sass";

type RepostProps = {
    className?: string;
    count?: number;
    initialReposted?: boolean;
};

const Repost = ({ className, count, initialReposted }: RepostProps) => {
    const [repostCount, setRepostCount] = useState(count || 0);
    const [reposted, setReposted] = useState(initialReposted || false);

    const handleLike = () => {
        setReposted((prevReposted) => !prevReposted);
        setRepostCount((prevCount) =>
            !reposted ? prevCount + 1 : prevCount - 1
        );
    };

    return (
        <button
            className={cn("social", className, styles.repost, {
                [styles.reposted]: reposted,
            })}
            onClick={handleLike}
        >
            <div className={styles.icon}>
                <Icon name="repost" />
            </div>
            {repostCount > 0 && (
                <div className={styles.count}>{repostCount}</div>
            )}
        </button>
    );
};

export default Repost;
