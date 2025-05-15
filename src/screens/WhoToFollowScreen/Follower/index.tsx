import Link from "next/link";
import Avatar from "@/components/Avatar";
import FollowButton from "@/components/FollowButton";
import styles from "./Follower.module.sass";

type FollowerProps = {
    item: {
        id: string;
        name: string;
        login: string;
        avatar: string;
        online: boolean;
        following: boolean;
    };
};

const Follower = ({ item }: FollowerProps) => (
    <div className={styles.follower}>
        <Link className={styles.link} href={`/profiles/${item.id}`}>
            <Avatar
                className={styles.avatar}
                photo={item.avatar}
                online={item.online}
            />
            <div className={styles.name}>{item.name}</div>
            <div className={styles.login}>@{item.login}</div>
        </Link>
        <FollowButton className={styles.followButton} value={item.following} />
    </div>
);

export default Follower;
