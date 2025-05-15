import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./Notification.module.sass";

type NotificationProps = {
    onClose: () => void;
};

const Notification = ({ onClose }: NotificationProps) => (
    <div className={styles.notification}>
        <div className={styles.image}>
            <Image
                src="/images/notification-pic.png"
                width={116}
                height={106}
                alt=""
            />
        </div>
        <div className={styles.details}>
            <div className={styles.title}>Browser notifications are off.</div>
            <div className={styles.description}>
                Turn on notifications to get notified of new responses on your
                device.
            </div>
            <button className={styles.button}>Turn on now</button>
        </div>
        <button className={styles.close} onClick={onClose}>
            <Icon name="close" />
        </button>
    </div>
);

export default Notification;
