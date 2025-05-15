import Image from "@/components/Image";
import styles from "./NoMessages.module.sass";

type NoMessagesProps = {};

const NoMessages = ({}: NoMessagesProps) => (
    <div className={styles.noMessages}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-4.png"
                width={488}
                height={944}
                alt=""
            />
        </div>
        <div className={styles.text}>Start new message</div>
    </div>
);

export default NoMessages;
