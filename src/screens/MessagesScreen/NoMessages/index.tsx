import Image from "@/components/Image";
import styles from "./NoMessages.module.sass";

type NoMessagesProps = {};

const NoMessages = ({}: NoMessagesProps) => (
    <div className={styles.noMessages}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-2.png"
                width={400}
                height={574}
                alt=""
            />
        </div>
        <div className={styles.text}>No messages</div>
    </div>
);

export default NoMessages;
