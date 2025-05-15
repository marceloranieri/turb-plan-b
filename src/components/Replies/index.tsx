import Post from "@/components/Post";
import Icon from "@/components/Icon";

import styles from "./Replies.module.sass";

import { posts } from "@/mocks/posts";

type RepliesProps = {};

const Replies = ({}: RepliesProps) => (
    <div className={styles.replies}>
        <div className={styles.list}>
            {[posts[4], posts[0], posts[5]].map((item) => (
                <Post
                    className={styles.post}
                    key={item.id}
                    item={item}
                    isReply
                />
            ))}
        </div>
        <button className={styles.more}>
            Show more
            <Icon name="arrow-down" />
        </button>
    </div>
);

export default Replies;
