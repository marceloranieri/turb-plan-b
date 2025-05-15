import Image from "@/components/Image";
import styles from "./NoFolders.module.sass";

type NoFoldersProps = {};

const NoFolders = ({}: NoFoldersProps) => (
    <div className={styles.noFolders}>
        <div className={styles.preview}>
            <Image
                src="/images/empty-pic-5.png"
                width={336}
                height={672}
                alt=""
            />
        </div>
        <div className={styles.text}>No folder yet. Create one to start.</div>
    </div>
);

export default NoFolders;
