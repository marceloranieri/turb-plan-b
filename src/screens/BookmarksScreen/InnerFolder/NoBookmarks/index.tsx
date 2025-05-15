import Image from "@/components/Image";
import styles from "./NoBookmarks.module.sass";

type NoBookmarksProps = {};

const NoBookmarks = ({}: NoBookmarksProps) => (
    <div className={styles.noBookmarks}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-6.png"
                width={524}
                height={508}
                alt=""
            />
        </div>
        <div className={styles.details}>
            <div className={styles.title}>No bookmark items</div>
            <div className={styles.text}>
                Bookmark post and media to your folder
            </div>
        </div>
    </div>
);

export default NoBookmarks;
