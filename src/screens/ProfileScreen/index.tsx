"use client";

import Layout from "@/components/Layout";
import Profile from "@/components/Profile";

import { posts } from "@/mocks/posts";
import { media } from "@/mocks/media";

const ProfileScreen = () => {
    return (
        <Layout rightSidebar rightSidebarActiveTrending>
            <Profile
                background="/images/background-1.jpg"
                avatar="/images/avatar-9.png"
                name="Kohaku Tora"
                login="kohaku_tora"
                link="https://linktr.ee/kohaku"
                followers={16}
                posts={posts}
                postFeatured={[posts[5], posts[3], posts[2]]}
                media={media}
                isFollowing={false}
                own
            />
        </Layout>
    );
};

export default ProfileScreen;
