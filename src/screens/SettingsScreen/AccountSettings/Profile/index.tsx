import Image from "@/components/Image";
import styles from "./Profile.module.sass";

type ProfileProps = {};

const Profile = ({}: ProfileProps) => (
    <div className={styles.profile}>
        <div className={styles.photo}>
            <div className={styles.avatar}>
                <Image
                    src="/images/avatar.png"
                    width={64}
                    height={64}
                    alt="Avatar"
                />
            </div>
            <div className={styles.circles}>
                <span></span>
                <span></span>
                <span></span>
            </div>
            <div>
                <div className={styles.dots}>
                    <Image
                        src="/images/dots.svg"
                        width={144}
                        height={79}
                        alt="dots"
                    />
                </div>
                <div className={styles.dots}>
                    <Image
                        src="/images/dots-1.svg"
                        width={93}
                        height={79}
                        alt="dots"
                    />
                </div>
            </div>
        </div>
        <div className={styles.name}>Konaku Tora</div>
        <div className={styles.email}>moyoshiro@email.com</div>
    </div>
);

export default Profile;
