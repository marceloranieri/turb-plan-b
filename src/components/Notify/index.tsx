import cn from "classnames";
import Image from "@/components/Image";
import Icon from "@/components/Icon";
import styles from "./Notify.module.sass";

type NotifyProps = {
    className?: string;
    children: React.ReactNode;
    onClose?: () => void;
};

const Notify = ({ className, children, onClose }: NotifyProps) => (
    <div className={cn(styles.notify, className)}>
        <div className={styles.icon}>
            <Image
                src="/images/notify-check.svg"
                width={24}
                height={24}
                alt="notify-check"
            />
        </div>
        {children}
        <button className={styles.close} onClick={onClose}>
            <Icon name="close" />
        </button>
    </div>
);

export default Notify;
