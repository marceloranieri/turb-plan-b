import { useState } from "react";
import ScrollMask from "@/components/ScrollMask";
import Tabs from "@/components/Tabs";
import Post from "@/components/Post";
import Image from "@/components/Image";
import Background from "./Background";
import Bio from "./Bio";
import styles from "./Profile.module.sass";

type ProfileProps = {
    own?: boolean;
    background: string;
    avatar: string;
    name: string;
    login: string;
    link: string;
    posts: any;
    postFeatured: any;
    followers: number;
    media: any;
    isFollowing: boolean;
};

const Profile = ({
    own,
    background,
    avatar,
    name,
    login,
    link,
    posts,
    postFeatured,
    followers,
    media,
    isFollowing,
}: ProfileProps) => {
    const [tab, setTab] = useState<string>("posts");

    const tabs = [
        {
            title: "Posts",
            value: "posts",
        },
        {
            title: "Featured",
            value: "featured",
        },
        {
            title: "Media",
            value: "media",
        },
    ];

    return (
        <ScrollMask className={styles.profile} isMobileNavigation>
            <Background own={own} background={background} avatar={avatar} />
            <div className={styles.body}>
                <Bio
                    name={name}
                    login={login}
                    own={own}
                    postsCounter={posts.length}
                    link={link}
                    followers={followers}
                    isFollowing={isFollowing}
                />
                <div className={styles.container}>
                    <Tabs
                        className={styles.tabs}
                        items={tabs}
                        value={tab}
                        setValue={setTab}
                    />
                    <div className={styles.list}>
                        {tab === "posts" &&
                            posts.map((post: any, index: number) => (
                                <Post
                                    key={post.id}
                                    item={post}
                                    actionsBodyUp={index === posts.length - 1}
                                />
                            ))}
                        {tab === "featured" &&
                            postFeatured.map((post: any, index: number) => (
                                <Post
                                    key={post.id}
                                    item={post}
                                    actionsBodyUp={index === posts.length - 1}
                                />
                            ))}
                        {tab === "media" && (
                            <div className={styles.images}>
                                {media.map((image: any) => (
                                    <div
                                        key={image.id}
                                        className={styles.image}
                                    >
                                        <Image
                                            src={image.image}
                                            width={253}
                                            height={202}
                                            alt={image.id}
                                        />
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </ScrollMask>
    );
};

export default Profile;
