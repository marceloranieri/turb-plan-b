import { useState } from "react";
import cn from "classnames";
import Icon from "@/components/Icon";
import styles from "./Like.module.sass";

type LikeProps = {
    className?: string;
    count?: number;
    initialLiked?: boolean;
};

const Like = ({ className, count, initialLiked }: LikeProps) => {
    const [likeCount, setLikeCount] = useState(count || 0);
    const [liked, setLiked] = useState(initialLiked || false);

    const handleLike = () => {
        setLiked((prevLiked) => !prevLiked);
        setLikeCount((prevCount) => (!liked ? prevCount + 1 : prevCount - 1));
    };

    return (
        <button
            className={cn("social", className, styles.like, {
                [styles.liked]: liked,
            })}
            onClick={handleLike}
        >
            <div className={styles.icon}>
                <Icon name="heart" />
                <Icon name="heart-fill" />
            </div>
            {likeCount > 0 && <div className={styles.count}>{likeCount}</div>}
        </button>
    );
};

export default Like;
