import Image from "@/components/Image";
import styles from "./NoFollowers.module.sass";

type NoFollowersProps = {};

const NoFollowers = ({}: NoFollowersProps) => (
    <div className={styles.noFollowers}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-6.png"
                width={524}
                height={508}
                alt=""
            />
        </div>
        <div className={styles.details}>
            <div className={styles.title}>Not following anyone</div>
            <div className={styles.text}>
                When Moyo Shiro follows people, they&apos;ll show up here.
            </div>
        </div>
    </div>
);

export default NoFollowers;
