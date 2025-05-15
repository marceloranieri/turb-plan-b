import Link from "next/link";
import cn from "classnames";
import Icon from "@/components/Icon";
import FollowButton from "@/components/FollowButton";
import styles from "./Bio.module.sass";

type BioProps = {
    own?: boolean;
    name: string;
    login: string;
    link: string;
    postsCounter: number;
    followers: number;
    isFollowing: boolean;
};

const Bio = ({
    own,
    name,
    login,
    link,
    postsCounter,
    followers,
    isFollowing,
}: BioProps) => (
    <div className={styles.bio}>
        <div className={styles.head}>
            <div className={styles.details}>
                <div className={styles.name}>{name}</div>
                <div className={styles.login}>@{login}</div>
            </div>
            <div className={styles.controls}>
                {own ? (
                    <>
                        <button className={cn("button-circle", styles.button)}>
                            <Icon name="reply" />
                        </button>
                        <Link
                            className={cn("button", styles.edit)}
                            href="/profile/edit"
                        >
                            <span>Edit profile</span>
                            <Icon name="pencil" />
                        </Link>
                    </>
                ) : (
                    <>
                        <Link
                            className={cn("button-circle", styles.button)}
                            href="/messages"
                        >
                            <Icon name="comment" />
                        </Link>
                        <FollowButton value={isFollowing} onlyText />
                    </>
                )}
            </div>
        </div>
        <div className={styles.description}>
            <p>🎨 UI/UX Designer | 💡 Crafting seamless digital experiences</p>
            <p>🚀 Designing user-centric interfaces</p>
            <p>
                📍 NYC | Post on <span>#Design #UX #UI</span>
            </p>
        </div>
        <div className={styles.stats}>
            <div className={styles.item}>
                <Icon name="comment" />
                {postsCounter}
                <span>posts</span>
            </div>
            <Link className={styles.item} href="/followers">
                <Icon name="profile" />
                {followers} <span>followers</span>
            </Link>
            <a
                className={styles.link}
                href="https://ui8.net/ui8/products/bento-cards-simplesocial?status=7"
                target="_blank"
                rel="noopener noreferrer"
            >
                <Icon name="link" />
                {link}
            </a>
        </div>
    </div>
);

export default Bio;
