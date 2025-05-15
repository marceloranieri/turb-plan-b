import cn from "classnames";
import Image from "@/components/Image";
import styles from "./BlockUser.module.sass";

type BlockUserProps = {};

const BlockUser = ({}: BlockUserProps) => (
    <div className={styles.blockUser}>
        <div className={styles.image}>
            <div className={styles.preview}>
                <Image
                    src="/images/block-user.png"
                    width={400}
                    height={266}
                    alt=""
                />
            </div>
        </div>
        <div className={styles.body}>
            <div className={styles.content}>
                Moyo Shiro will no longer be able to follow or message you. You
                also won&apos;t receive notifications from Moyo Shiro anymore.
            </div>
            <button className={cn("button-medium", styles.button)}>
                Block Moyo Shiro
            </button>
        </div>
    </div>
);

export default BlockUser;
