import IconFolder from "@/components/IconFolder";
import styles from "./Folder.module.sass";

type FolderProps = {
    item: {
        id: string;
        name: string;
        counter: number;
        icon: string;
        iconColor: string;
    };
    onClick: () => void;
};

const Folder = ({ item, onClick }: FolderProps) => (
    <div className={styles.folder} onClick={onClick}>
        <div className={styles.image}>
            <IconFolder name={item.icon} fill={item.iconColor} />
        </div>
        <div className={styles.name}>{item.name}</div>
        <div className={styles.counter}>{item.counter}</div>
    </div>
);

export default Folder;
