"use client";

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";

import { users } from "@/mocks/users";
import { posts } from "@/mocks/posts";
import { media } from "@/mocks/media";

const PostScreen = ({ userId }: { userId: string }) => {
    const user = users.find((user) => user.id === userId);

    return user ? (
        <Layout rightSidebar>
            <Profile
                background="/images/background.jpg"
                avatar={user.avatar}
                name={user.name}
                login={user.login}
                link={user.link}
                followers={user.followers}
                posts={posts}
                postFeatured={[posts[5], posts[3], posts[2]]}
                media={media}
                isFollowing={user.following}
            />
        </Layout>
    ) : null;
};

export default PostScreen;
