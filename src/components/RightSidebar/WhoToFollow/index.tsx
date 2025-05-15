import Follower from "@/components/Follower";
import Counter from "@/components/Counter";
import styles from "./WhoToFollow.module.sass";

import { followers } from "@/mocks/followers";

type WhoToFollowProps = {};

const WhoToFollow = ({}: WhoToFollowProps) => (
    <>
        <div className={styles.followers}>
            {followers.map((follower) => (
                <Follower key={follower.id} item={follower} />
            ))}
        </div>
        <Counter
            href="/who-to-follow"
            images={[
                "/images/avatar-6.png",
                "/images/avatar-7.png",
                "/images/avatar-8.png",
                "/images/avatar-2.png",
                "/images/avatar-5.png",
            ]}
            value="1,234+"
        />
    </>
);

export default WhoToFollow;
