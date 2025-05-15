import Image from "@/components/Image";
import styles from "./NoBlockedUsers.module.sass";

type NoBlockedUsersProps = {};

const NoBlockedUsers = ({}: NoBlockedUsersProps) => (
    <div className={styles.noBlockedUsers}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-7.png"
                width={486}
                height={455}
                alt=""
            />
        </div>
        <div className={styles.details}>
            <div className={styles.title}>No blocked users</div>
            <div className={styles.text}>You haven&apos;t blocked anyone.</div>
        </div>
    </div>
);

export default NoBlockedUsers;
